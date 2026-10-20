/**
 * Raster-to-SVG Vectorizer and Contour Tracer.
 * Quantizes image colors and creates scalable vector paths using horizontal run vectorization.
 */
export interface TraceOptions {
    detail?: 'low' | 'medium' | 'high';
    preserveColors?: boolean;
}
export interface PixelBuffer {
    width: number;
    height: number;
    data: Uint8ClampedArray | Uint8Array;
}
/**
 * Traces 32-bit RGBA pixel buffers into scalable SVG vector paths.
 * Compatible with browser ImageData and Node.js pixel buffers.
 *
 * @param image Object containing width, height, and data (Uint8ClampedArray or Uint8Array)
 * @param options Vectorization settings (detail: 'low' | 'medium' | 'high')
 * @returns Complete, valid SVG XML string with quantized path geometry.
 */
export declare function traceBitmapToSvg(image: PixelBuffer, options?: TraceOptions): string;
//# sourceMappingURL=svg-tracer.d.ts.map