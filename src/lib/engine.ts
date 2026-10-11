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

class EngineManager {
  private workers: Worker[] = [];
  private poolSize = 3;
  private workerQueue: {
    job: EngineJobRequest;
    resolve: (res: EngineJobResponse) => void;
    reject: (err: any) => void;
  }[] = [];
  private activeJobs = new Map<Worker, string>();

  constructor() {
    if (typeof window !== 'undefined') {
      const concurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
      this.poolSize = Math.max(1, Math.min(4, concurrency - 1));
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

  private handleWorkerError(worker: Worker, error: any) {
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
      } catch (e) {
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
    const fileData = await file.arrayBuffer();

    const job: EngineJobRequest = {
      id,
      fileData,
      fileName: file.name,
      fileType: file.type || 'application/octet-stream',
      fileSize: file.size,
      sourceFormat,
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
