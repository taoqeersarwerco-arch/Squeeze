/**
 * Structural Similarity Index Measure (SSIM) algorithm.
 * Used to measure visual degradation between original and compressed image frames.
 */
/**
 * Extracts Rec. 601 grayscale luminance from a 32-bit RGBA pixel buffer.
 */
export function extractLuma(data, w, h) {
    const y = new Float32Array(w * h);
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        // Standard Rec. 601 luma weights
        y[j] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    return y;
}
/**
 * Computes the mean SSIM index between two luminance arrays of identical dimensions.
 *
 * @param a Luminance array of original image (Float32Array)
 * @param b Luminance array of compressed image (Float32Array)
 * @param w Width of image in pixels
 * @param h Height of image in pixels
 * @returns Score between 0.0 (completely dissimilar) and 1.0 (identical)
 */
export function computeSsim(a, b, w, h) {
    const C1 = 6.5025; // (K1 * L)^2 where K1=0.01, L=255
    const C2 = 58.5225; // (K2 * L)^2 where K2=0.03, L=255
    const B = 8;
    const N = 64;
    let total = 0;
    let count = 0;
    for (let by = 0; by + B <= h; by += 4) {
        for (let bx = 0; bx + B <= w; bx += 4) {
            let sa = 0, sb = 0, saa = 0, sbb = 0, sab = 0;
            for (let y = by; y < by + B; y++) {
                const row = y * w;
                for (let x = bx; x < bx + B; x++) {
                    const p = a[row + x];
                    const q = b[row + x];
                    sa += p;
                    sb += q;
                    saa += p * p;
                    sbb += q * q;
                    sab += p * q;
                }
            }
            const ma = sa / N;
            const mb = sb / N;
            const va = saa / N - ma * ma;
            const vb = sbb / N - mb * mb;
            const cov = sab / N - ma * mb;
            total += ((2 * ma * mb + C1) * (2 * cov + C2)) / ((ma * ma + mb * mb + C1) * (va + vb + C2));
            count++;
        }
    }
    return count ? Math.max(0, Math.min(1, total / count)) : 1;
}
/**
 * Returns a human-friendly label and classification for an SSIM score.
 */
export function getSsimLabel(ssim) {
    if (ssim >= 0.98)
        return { label: 'Visually Identical', scoreClass: 'excellent' };
    if (ssim >= 0.94)
        return { label: 'Imperceptible Loss', scoreClass: 'excellent' };
    if (ssim >= 0.88)
        return { label: 'Good Quality', scoreClass: 'good' };
    if (ssim >= 0.80)
        return { label: 'Acceptable', scoreClass: 'fair' };
    return { label: 'Degraded', scoreClass: 'poor' };
}
//# sourceMappingURL=ssim.js.map