/**
 * Structural Similarity Index Measure (SSIM) algorithm
 * Used to measure visual degradation between original and compressed image frames.
 */

export function extractLuma(data: Uint8ClampedArray, w: number, h: number): Float32Array {
  const y = new Float32Array(w * h);
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    // Standard Rec. 601 luma weights
    y[j] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return y;
}

export function computeSsim(
  a: Float32Array,
  b: Float32Array,
  w: number,
  h: number
): number {
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

export function getSsimLabel(ssim: number): { label: string; scoreClass: 'excellent' | 'good' | 'fair' | 'poor' } {
  if (ssim >= 0.98) return { label: 'Visually Identical', scoreClass: 'excellent' };
  if (ssim >= 0.94) return { label: 'Near Perfect', scoreClass: 'good' };
  if (ssim >= 0.88) return { label: 'Minor Artifacts', scoreClass: 'fair' };
  return { label: 'Noticeable Loss', scoreClass: 'poor' };
}
