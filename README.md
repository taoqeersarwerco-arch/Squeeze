# Squeeze ⚡

> **Private, lightning-fast in-browser image conversion and perceptual compression engine.**  
> Convert between **JPG, PNG, ICO, SVG, and WebP** with zero quality loss and $0 server hosting bills.

---

## ✨ Features

- **Any-to-Any Format Matrix**:
  - **JPG / JPEG** ⇄ **PNG** ⇄ **WEBP** ⇄ **ICO** ⇄ **SVG**
  - **Favicon (.ico) Generator**: Packs multi-resolution icons (16×16, 32×32, 48×48, 64×64, 128×128, 256×256) into a genuine 32-bit RGBA Windows ICO container.
  - **SVG Vector Rasterizer**: Converts vector graphics into crisp high-DPI transparent PNGs, JPEGs, or WebP.
  - **Bitmap-to-SVG Vectorizer**: Color-quantized contour tracing to transform logos and silhouettes into scalable SVG vectors.
  - **Smart Alpha Matte**: Choose customizable background colors when converting transparent assets to JPEG.
- **Perceptual Compression (SSIM)**:
  - Uses the **Structural Similarity Index Measure (SSIM)** to eliminate invisible byte bloat and EXIF metadata without creating visual compression artifacts.
  - Choose between **Target Quality (SSIM)** or **Target Shrink Ratio** (e.g. 5×, 10×, 15× smaller).
- **Interactive Split Comparison**:
  - Side-by-side draggable divider slider with 100% pixel zoom mode to inspect fine edge clarity before saving.
- **Batch Processing & ZIP Archive**:
  - Drag-and-drop or clipboard paste multiple photos simultaneously.
  - Downloads individual files or packages the whole queue into an in-memory ZIP archive using `JSZip`.
- **100% Client-Side Privacy**:
  - All processing runs directly on your device via HTML5 Canvas and multi-threaded Web Workers. No images are ever uploaded or transmitted over the network.
- **Monetization & AdSense Ready**:
  - Pre-built CLS-safe (Cumulative Layout Shift) reserved ad containers that protect your Google Lighthouse Core Web Vitals score.
- **Programmatic SEO (pSEO)**:
  - Pre-rendered static landing pages for top high-volume search queries (`/convert/png-to-ico`, `/convert/svg-to-png`, `/convert/jpg-to-webp`, `/compress/jpg`, etc.) with JSON-LD schema markup (`WebApplication` and `FAQPage`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 20 & 24)
- npm, pnpm, or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/taoqeersarwerco-arch/Squeeze.git
cd Squeeze

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build
```bash
# Build optimized production bundle with static prerendering
npm run build

# Start production server
npm run start
```

---

## 🌐 Custom Domain & Production Deployment

Because Squeeze processes all images client-side, it costs **$0/month to host**, even with millions of visitors.

### Deploying to Vercel
1. Import your GitHub repository to [Vercel](https://vercel.com).
2. Framework preset will automatically detect **Next.js**.
3. Under **Project Settings > Domains**, add your custom domain (e.g. `squeeze.app` or `yourdomain.com`).
4. Add the CNAME / A records provided by Vercel to your DNS registrar (Cloudflare, Namecheap, GoDaddy). Free SSL will be generated automatically.

### Deploying to Cloudflare Pages
1. Connect your repository to **Cloudflare Pages**.
2. Set Build command: `npm run build`.
3. Set Output directory: `.next`.
4. Connect your custom domain directly with Cloudflare Edge caching and DDoS protection.

---

## 💰 Enabling Google AdSense & Ads

1. Once your custom domain is connected, apply for [Google AdSense](https://adsense.google.com).
2. Add your AdSense Publisher ID to your environment variables:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```
3. The `<AdBanner />` component will automatically switch from reserved skeleton mode to serving live responsive banner ads without layout shifts.

---

## ⚖️ License & Privacy
MIT License. All image conversions happen locally in the user's browser.
