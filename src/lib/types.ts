export type SupportedFormat = 'jpg' | 'png' | 'webp' | 'ico' | 'svg';

export interface FormatMeta {
  id: SupportedFormat;
  name: string;
  ext: string;
  mime: string;
  desc: string;
  supportsTransparency: boolean;
  isVector: boolean;
  color: string;
}

export type CompressionGoal = 'size' | 'quality' | 'lossless';

export interface ConversionSettings {
  targetFormat: SupportedFormat;
  goal: CompressionGoal;
  targetRatio: number; // e.g. 5, 10, 15 (times smaller)
  targetQuality: number; // 0.2 to 1.0
  targetSsim: number; // e.g. 0.98, 0.95, 0.90
  maxEdge: number; // 0 = original, 2560, 1920, 1280, 800, etc.
  matteColor: string; // for transparency -> jpg/matte (e.g. '#FFFFFF')
  icoSizes: number[]; // e.g. [16, 32, 48, 64, 128, 256]
  svgTraceDetail: 'low' | 'medium' | 'high'; // for raster -> svg tracing
  slugifyNames: boolean;
}

export interface ImageItem {
  id: string;
  file: File;
  sourceFormat: SupportedFormat;
  targetFormat: SupportedFormat;
  status: 'pending' | 'processing' | 'done' | 'error';
  progress: number;
  origUrl: string;
  origWidth: number;
  origHeight: number;
  outBlob: Blob | null;
  outUrl: string | null;
  outSize: number;
  outWidth: number;
  outHeight: number;
  ssim: number | null;
  qualityUsed: number | null;
  error?: string;
  customSettings?: Partial<ConversionSettings>;
}

export interface EngineJobRequest {
  id: string;
  fileData: ArrayBuffer;
  fileName: string;
  fileType: string;
  fileSize: number;
  sourceFormat: SupportedFormat;
  settings: ConversionSettings;
}

export interface EngineJobResponse {
  id: string;
  success: boolean;
  outBlobData?: ArrayBuffer;
  outMime?: string;
  outSize?: number;
  outWidth?: number;
  outHeight?: number;
  srcWidth?: number;
  srcHeight?: number;
  ssim?: number | null;
  qualityUsed?: number | null;
  error?: string;
}
