# trysqueeze ⚡

> **Zero-dependency browser and Node.js image processing engine.**  
> High-performance binary Windows `.ico` container packing, perceptual SSIM quality metrics, and raster-to-SVG vector contour tracing.  
> 
> Official library powering [**Squeeze (trysqueeze.online)**](https://www.trysqueeze.online) — the 100% private in-browser image converter.

[![npm version](https://img.shields.io/npm/v/trysqueeze.svg?color=emerald)](https://www.npmjs.com/package/trysqueeze)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Web Utility](https://img.shields.io/badge/Live_App-trysqueeze.online-white)](https://www.trysqueeze.online)

---

## 🚀 Features

- **Binary Multi-Res Windows `.ico` Packer**: Encodes valid 32-bit RGBA PNG-in-ICO containers containing 16×16, 32×32, 48×48, 64×64, 128×128, and 256×256 mipmap frames in pure JavaScript/TypeScript.
- **Perceptual SSIM Metric**: Mathematical Structural Similarity Index Measure (Rec. 601 luma) assessing structural information, luminance, and contrast degradation before and after image compression.
- **Raster-to-SVG Vector Tracer**: Color-quantized contour tracer converting pixel buffers into clean, scalable SVG vector paths.
- **Zero Runtime Dependencies**: Completely standalone. Runs smoothly in modern browsers, Web Workers, and Node.js without native C++ compilation bindings.

---

## 📦 Installation

```bash
npm install trysqueeze
```

Or via yarn/pnpm:

```bash
pnpm add trysqueeze
# or
yarn add trysqueeze
```

---

## 💡 Usage Examples

### 1. Encode Multi-Resolution Windows ICO Favicons

Encode an array of PNG byte buffers into a single `.ico` file:

```ts
import { buildIcoFile, type IcoFrame } from 'trysqueeze';

// Assume you have PNG byte buffers for different sizes (16px, 32px, 48px, etc.)
const frames: IcoFrame[] = [
  { width: 16, height: 16, pngData: new Uint8Array(png16Buffer) },
  { width: 32, height: 32, pngData: new Uint8Array(png32Buffer) },
  { width: 48, height: 48, pngData: new Uint8Array(png48Buffer) },
  { width: 256, height: 256, pngData: new Uint8Array(png256Buffer) },
];

// Returns a Uint8Array representing the valid binary .ico file
const icoBytes = buildIcoFile(frames);

// In browser: trigger download
const blob = new Blob([icoBytes], { type: 'image/x-icon' });
const downloadUrl = URL.createObjectURL(blob);
```

---

### 2. Measure Perceptual Image Quality (SSIM)

Ensure your compression algorithms maintain human-indistinguishable quality (SSIM &ge; 0.94):

```ts
import { extractLuma, computeSsim, getSsimLabel } from 'trysqueeze';

// Get 32-bit RGBA pixel arrays from Canvas or Sharp/Jimp
// originalData and compressedData must have the same width and height
const origLuma = extractLuma(originalRgbaData, width, height);
const compLuma = extractLuma(compressedRgbaData, width, height);

// Compute mean structural similarity (0.0 to 1.0)
const ssim = computeSsim(origLuma, compLuma, width, height);

console.log(`SSIM Score: ${ssim.toFixed(4)}`);
const evaluation = getSsimLabel(ssim);
console.log(`Perceptual Quality: ${evaluation.label}`); // e.g. "Visually Identical" or "Imperceptible Loss"
```

---

### 3. Trace Bitmap Images to Scalable SVG Vectors

Convert raster graphics into scalable SVG paths using run-length color quantization:

```ts
import { traceBitmapToSvg } from 'trysqueeze';

const svgXml = traceBitmapToSvg(
  {
    width: 64,
    height: 64,
    data: rgbaPixelBuffer, // Uint8ClampedArray or Uint8Array
  },
  { detail: 'high' } // 'low' | 'medium' | 'high'
);

console.log(svgXml);
// Returns: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" ...><path ... /></svg>
```

---

## 🌐 Ecosystem & Live Web Application

Looking for a ready-to-use GUI or automated batch converter?

- **Web Application**: [https://www.trysqueeze.online](https://www.trysqueeze.online) — 100% private, zero-upload in-browser converter for JPG, PNG, WebP, SVG, and ICO.
- **Developer API Sandbox**: [https://www.trysqueeze.online/developers](https://www.trysqueeze.online/developers) — Interactive in-browser API testing and free sandbox keys.
- **Technical Guides**: [https://www.trysqueeze.online/learn](https://www.trysqueeze.online/learn) — Deep-dives on raster formats, DCT quantization, and client-side compression engineering.

---

## ⚖️ License

[MIT License](https://github.com/taoqeersarwerco-arch/Squeeze/blob/main/LICENSE) &copy; 2026 Taoqeer Sarwer & Squeeze Contributors.
