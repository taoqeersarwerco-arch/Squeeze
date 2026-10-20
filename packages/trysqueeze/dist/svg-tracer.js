/**
 * Raster-to-SVG Vectorizer and Contour Tracer.
 * Quantizes image colors and creates scalable vector paths using horizontal run vectorization.
 */
/**
 * Traces 32-bit RGBA pixel buffers into scalable SVG vector paths.
 * Compatible with browser ImageData and Node.js pixel buffers.
 *
 * @param image Object containing width, height, and data (Uint8ClampedArray or Uint8Array)
 * @param options Vectorization settings (detail: 'low' | 'medium' | 'high')
 * @returns Complete, valid SVG XML string with quantized path geometry.
 */
export function traceBitmapToSvg(image, options = { detail: 'medium' }) {
    const { width, height, data } = image;
    const detail = options.detail || 'medium';
    // Step factor based on detail
    const step = detail === 'high' ? 1 : detail === 'medium' ? 2 : 4;
    const numColorLevels = detail === 'high' ? 16 : detail === 'medium' ? 8 : 4;
    const quantStep = 256 / numColorLevels;
    function quantize(val) {
        return Math.min(255, Math.floor(val / quantStep) * quantStep + Math.floor(quantStep / 2));
    }
    // Map of color hex -> array of path segments
    const colorPaths = new Map();
    for (let y = 0; y < height; y += step) {
        let startX = -1;
        let currentColor = '';
        for (let x = 0; x < width; x += step) {
            const idx = (y * width + x) * 4;
            const a = data[idx + 3];
            if (a < 32) {
                // Transparent pixel - close run if open
                if (startX !== -1 && currentColor) {
                    const runW = x - startX;
                    const rectPath = `M${startX},${y}h${runW}v${step}h${-runW}Z`;
                    if (!colorPaths.has(currentColor))
                        colorPaths.set(currentColor, []);
                    colorPaths.get(currentColor).push(rectPath);
                    startX = -1;
                    currentColor = '';
                }
                continue;
            }
            const r = quantize(data[idx]);
            const g = quantize(data[idx + 1]);
            const b = quantize(data[idx + 2]);
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            if (hex !== currentColor) {
                if (startX !== -1 && currentColor) {
                    const runW = x - startX;
                    const rectPath = `M${startX},${y}h${runW}v${step}h${-runW}Z`;
                    if (!colorPaths.has(currentColor))
                        colorPaths.set(currentColor, []);
                    colorPaths.get(currentColor).push(rectPath);
                }
                startX = x;
                currentColor = hex;
            }
        }
        // Flush run at end of row
        if (startX !== -1 && currentColor) {
            const runW = width - startX;
            const rectPath = `M${startX},${y}h${runW}v${step}h${-runW}Z`;
            if (!colorPaths.has(currentColor))
                colorPaths.set(currentColor, []);
            colorPaths.get(currentColor).push(rectPath);
        }
    }
    // Generate SVG path elements
    const pathElements = [];
    colorPaths.forEach((runs, color) => {
        pathElements.push(`  <path d="${runs.join(' ')}" fill="${color}" fill-rule="evenodd" shape-rendering="crispEdges"/>`);
    });
    return [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`,
        pathElements.join('\n'),
        '</svg>',
    ].join('\n');
}
//# sourceMappingURL=svg-tracer.js.map