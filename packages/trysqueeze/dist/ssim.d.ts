/**
 * Structural Similarity Index Measure (SSIM) algorithm.
 * Used to measure visual degradation between original and compressed image frames.
 */
/**
 * Extracts Rec. 601 grayscale luminance from a 32-bit RGBA pixel buffer.
 */
export declare function extractLuma(data: Uint8ClampedArray | Uint8Array, w: number, h: number): Float32Array;
/**
 * Computes the mean SSIM index between two luminance arrays of identical dimensions.
 *
 * @param a Luminance array of original image (Float32Array)
 * @param b Luminance array of compressed image (Float32Array)
 * @param w Width of image in pixels
 * @param h Height of image in pixels
 * @returns Score between 0.0 (completely dissimilar) and 1.0 (identical)
 */
export declare function computeSsim(a: Float32Array, b: Float32Array, w: number, h: number): number;
export type SsimScoreClass = 'excellent' | 'good' | 'fair' | 'poor';
/**
 * Returns a human-friendly label and classification for an SSIM score.
 */
export declare function getSsimLabel(ssim: number): {
    label: string;
    scoreClass: SsimScoreClass;
};
//# sourceMappingURL=ssim.d.ts.map