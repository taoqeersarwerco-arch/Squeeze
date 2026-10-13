import { SupportedFormat, ConversionSettings, EngineJobResponse, EngineJobRequest } from './types';
import { FORMATS } from './constants';

export function detectFormat(file: File): SupportedFormat | null {
  const mime = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (mime === 'image/jpeg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'jpg';
  if (mime === 'image/png' || name.endsWith('.png')) return 'png';
  if (mime === 'image/webp' || name.endsWith('.webp')) return 'webp';
  if (mime === 'image/x-icon' || mime === 'image/vnd.microsoft.icon' || name.endsWith('.ico')) return 'ico';
  if (mime === 'image/svg+xml' || name.endsWith('.svg')) return 'svg';

  return null;
}

export function slugify(str: string): string {
  return str
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatFileName(
  originalName: string,
  targetFormat: SupportedFormat,
  shouldSlugify: boolean = true
): string {
  const baseName = originalName.replace(/\.[^.]+$/, '');
  const cleanName = shouldSlugify ? (slugify(baseName) || 'image') : baseName;
  const ext = FORMATS[targetFormat]?.ext || `.${targetFormat}`;
  return `${cleanName}${ext}`;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * In-browser SVG rasterizer using standard Image and Canvas APIs.
 * Solves the browser limitation where Web Workers cannot decode SVG blobs via createImageBitmap().
 */
export async function rasterizeSvgToPng(
  file: File,
  targetFormat: SupportedFormat,
  maxEdge?: number
): Promise<{ pngData: ArrayBuffer; width: number; height: number }> {
  return new Promise(async (resolve, reject) => {
    try {
      const svgText = await file.text();
      let targetWidth = 512;
      let targetHeight = 512;

      // Extract native dimensions or viewBox if available
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');
        if (svgEl) {
          const wAttr = parseFloat(svgEl.getAttribute('width') || '0');
          const hAttr = parseFloat(svgEl.getAttribute('height') || '0');
          const viewBox = svgEl.getAttribute('viewBox');

          if (wAttr > 0 && hAttr > 0) {
            targetWidth = wAttr;
            targetHeight = hAttr;
          } else if (viewBox) {
            const parts = viewBox.trim().split(/[\s,]+/).map(Number);
            if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
              targetWidth = parts[2];
              targetHeight = parts[3];
            }
          }
        }
      } catch {
        // Fallback to default 512x512
      }

      // For ICO targets, ensure high resolution (at least 512px) so 16px-256px mipmaps are razor sharp
      if (targetFormat === 'ico') {
        const largest = Math.max(targetWidth, targetHeight);
        if (largest < 512) {
          const scale = 512 / Math.max(1, largest);
          targetWidth = Math.round(targetWidth * scale);
          targetHeight = Math.round(targetHeight * scale);
        }
      }

      // Respect user's maxEdge setting if specified
      if (maxEdge && maxEdge > 0 && Math.max(targetWidth, targetHeight) > maxEdge) {
        const scale = maxEdge / Math.max(targetWidth, targetHeight);
        targetWidth = Math.max(1, Math.round(targetWidth * scale));
        targetHeight = Math.max(1, Math.round(targetHeight * scale));
      }

      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(url);
            reject(new Error('Canvas 2D context is not supported in this browser.'));
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          URL.revokeObjectURL(url);

          canvas.toBlob(async (pngBlob) => {
            if (!pngBlob) {
              reject(new Error('Failed to rasterize SVG into PNG.'));
              return;
            }
            const pngData = await pngBlob.arrayBuffer();
            resolve({ pngData, width: targetWidth, height: targetHeight });
          }, 'image/png');
        } catch (err) {
          URL.revokeObjectURL(url);
          reject(err);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Unable to render SVG image. Please verify that the SVG syntax is valid.'));
      };

      img.src = url;
    } catch (err) {
      reject(err);
    }
  });
}

class EngineManager {
  private workers: Worker[] = [];
  private poolSize = 3;
  private workerQueue: {
    job: EngineJobRequest;
    resolve: (res: EngineJobResponse) => void;
    reject: (err: unknown) => void;
  }[] = [];
  private activeJobs = new Map<Worker, string>();

  constructor() {
    if (typeof window !== 'undefined') {
      const isMobile =
        typeof navigator !== 'undefined' &&
        /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const concurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
      // On mobile devices, cap to 2 workers to prevent memory pressure from heavy smartphone camera photos
      const maxWorkers = isMobile ? 2 : 4;
      this.poolSize = Math.max(1, Math.min(maxWorkers, concurrency - 1));
      this.initWorkers();
    }
  }

  private initWorkers() {
    for (let i = 0; i < this.poolSize; i++) {
      try {
        const worker = new Worker('/workers/conversion.worker.js');
        worker.onmessage = (e) => this.handleWorkerMessage(worker, e.data);
        worker.onerror = (err) => this.handleWorkerError(worker, err);
        this.workers.push(worker);
      } catch (e) {
        console.warn('Web Worker initialization failed. Falling back to inline execution.', e);
      }
    }
  }

  private handleWorkerMessage(worker: Worker, data: EngineJobResponse) {
    this.activeJobs.delete(worker);
    const pendingIdx = this.workerQueue.findIndex((q) => q.job.id === data.id);
    if (pendingIdx >= 0) {
      const [pending] = this.workerQueue.splice(pendingIdx, 1);
      pending.resolve(data);
    }
    this.processNext();
  }

  private handleWorkerError(worker: Worker, error: unknown) {
    console.error('Worker error:', error);
    this.activeJobs.delete(worker);
    // Restart worker if crashed
    const idx = this.workers.indexOf(worker);
    if (idx >= 0) {
      worker.terminate();
      try {
        const replacement = new Worker('/workers/conversion.worker.js');
        replacement.onmessage = (e) => this.handleWorkerMessage(replacement, e.data);
        replacement.onerror = (err) => this.handleWorkerError(replacement, err);
        this.workers[idx] = replacement;
      } catch {
        // Ignored
      }
    }
    this.processNext();
  }

  private processNext() {
    if (this.workerQueue.length === 0) return;

    for (const worker of this.workers) {
      if (!this.activeJobs.has(worker)) {
        const nextItem = this.workerQueue.find((q) => !Array.from(this.activeJobs.values()).includes(q.job.id));
        if (nextItem) {
          this.activeJobs.set(worker, nextItem.job.id);
          worker.postMessage(nextItem.job, [nextItem.job.fileData]);
        }
        break;
      }
    }
  }

  public async runJob(
    file: File,
    sourceFormat: SupportedFormat,
    settings: ConversionSettings,
    id: string
  ): Promise<EngineJobResponse> {
    let fileData: ArrayBuffer;
    let fileType = file.type || 'application/octet-stream';
    let fileSize = file.size;

    // Handle SVG source format:
    // Web Workers cannot decode SVG via createImageBitmap(). If target is raster (ico, png, jpg, webp),
    // rasterize on the main thread first into high-resolution PNG bytes.
    if (sourceFormat === 'svg' && settings.targetFormat !== 'svg') {
      try {
        const raster = await rasterizeSvgToPng(file, settings.targetFormat, settings.maxEdge);
        fileData = raster.pngData;
        fileType = 'image/png';
        fileSize = fileData.byteLength;
      } catch (err) {
        return {
          id,
          success: false,
          error: err instanceof Error ? err.message : 'Failed to parse SVG image.',
        };
      }
    } else {
      fileData = await file.arrayBuffer();
    }

    const job: EngineJobRequest = {
      id,
      fileData,
      fileName: file.name,
      fileType,
      fileSize,
      sourceFormat: sourceFormat === 'svg' && settings.targetFormat !== 'svg' ? 'png' : sourceFormat,
      settings,
    };

    return new Promise((resolve, reject) => {
      this.workerQueue.push({ job, resolve, reject });
      this.processNext();
    });
  }
}

let engineInstance: EngineManager | null = null;

export function getEngine(): EngineManager {
  if (!engineInstance && typeof window !== 'undefined') {
    engineInstance = new EngineManager();
  }
  return engineInstance!;
}
