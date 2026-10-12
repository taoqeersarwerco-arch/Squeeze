# Squeeze ⚡

> **Private, zero-upload in-browser image conversion and perceptual compression engine.**  
> Convert between **JPG, PNG, ICO, SVG, and WebP** with lossless precision for supported formats, SSIM-guided perceptual fidelity, and $0 server hosting bills.  
> Live at: [trysqueeze.online](https://trysqueeze.online)

---

## 🏛️ Architecture & Core Mechanics

Squeeze runs entirely on client-side hardware using HTML5 Canvas, WebAssembly-ready pipelines, and multi-threaded Web Workers. No image bytes ever leave the user's browser.

```
┌─────────────────────────────────────────────────────────────────┐
│                       Squeeze Engine Core                       │
├─────────────────┬───────────────────┬───────────────────────────┤
│ Web Worker Pool │ Perceptual SSIM   │ Binary ICO & SVG Tracing  │
│ 3-worker queue  │ Quality score     │ 16-256px icon packing &   │
│ off-thread exec │ visual difference │ marching-squares vector   │
└─────────────────┴───────────────────┴───────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│              Minimalist Liquid Glass Interface                  │
│       Obsidian Graphite (#08090B) · Milled Glass Borders        │
│          Dynamic Motion Parallax · Specular Highlights          │
└─────────────────────────────────────────────────────────────────┘
```

### Key Technical Capabilities:
- **Off-Thread Worker Pool** ([`public/workers/conversion.worker.js`](./public/workers/conversion.worker.js)): Multi-threaded batch processing prevents main-thread UI freezing.
- **Perceptual SSIM Quality Guard** ([`src/lib/ssim.ts`](./src/lib/ssim.ts)): Mathematical Structural Similarity Index Measure computes exact visual degradation to find optimal compression sweet spots.
- **Binary Windows ICO Packer** ([`src/lib/ico.ts`](./src/lib/ico.ts)): Encodes genuine 32-bit RGBA multi-resolution Windows `.ico` container files (16×16, 32×32, 48×48, 64×64, 128×128, 256×256).
- **Raster-to-SVG Vector Tracer** ([`src/lib/svg-tracer.ts`](./src/lib/svg-tracer.ts)): Marching-squares contour tracer converts raster silhouettes into scalable vector SVG paths.
- **Developer API & CLI Sandbox** ([`/developers`](https://trysqueeze.online/developers)): Free instant API key issuance and cURL snippets for programmatic integrations.
- **Programmatic SEO (38 Routes)**: 15 dedicated conversion pairs, 3 smart compression routes, and educational guides with structured JSON-LD schema.

---

## 📂 Project Structure

```
Squeeze/
├── public/
│   └── workers/
│       └── conversion.worker.js      # Multi-threaded conversion & SSIM worker
├── src/
│   ├── app/                          # Next.js App Router (38 routes)
│   │   ├── (marketing)/              # About, Learn, Terms, Privacy
│   │   ├── convert/[pair]/           # Programmatic SEO conversion pairs
│   │   ├── compress/[format]/        # Programmatic SEO compression tools
│   │   ├── developers/               # Developer API sandbox
│   │   ├── api/developers/request/   # Instant API key provisioning
│   │   ├── sitemap.ts                # Dynamic XML sitemap generator
│   │   ├── robots.ts                 # Search crawler robots.txt
│   │   └── layout.tsx                # MetadataBase (trysqueeze.online)
│   ├── components/                   # UI Components & Modules
│   │   ├── Navbar.tsx                # Hover/click submenus & mobile navigation
│   │   ├── Footer.tsx                # Categorized footer links & trust badges
│   │   ├── LiquidBackground.tsx      # Parallax drifting plasma atmosphere
│   │   ├── DropZone.tsx              # Drag-and-drop & clipboard paste capture
│   │   ├── ConversionQueue.tsx       # Live status, SSIM badge & format controls
│   │   ├── BatchDock.tsx             # Floating batch action & ZIP packaging dock
│   │   ├── GlobalSettingsModal.tsx   # Perceptual SSIM & target ratio tuning
│   │   ├── ConversionHubGrid.tsx     # Directory grid of all 18 tools
│   │   ├── DeveloperRequestForm.tsx  # Developer API key generator form
│   │   ├── FaqSection.tsx            # Expandable FAQ accordions
│   │   ├── AdBanner.tsx              # CLS-safe monetization slot
│   │   └── index.ts                  # Clean barrel component exports
│   └── lib/                          # Core Utilities & Engine
│       ├── engine.ts                 # Worker pool manager & queue dispatcher
│       ├── ssim.ts                   # SSIM image quality algorithm
│       ├── svg-tracer.ts             # Raster-to-SVG contour vectorizer
│       ├── ico.ts                    # Binary multi-res ICO container packer
│       ├── constants.ts              # Format specs, conversion pairs, SEO data
│       ├── types.ts                  # Core TypeScript types & data contracts
│       └── index.ts                  # Clean barrel utility exports
├── AGENTS.md                         # Project development rules
├── package.json                      # Project scripts and dependencies
└── tsconfig.json                     # Strict TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 20 & 24)
- npm, pnpm, or bun

### Installation
```bash
git clone https://github.com/taoqeersarwerco-arch/Squeeze.git
cd Squeeze
npm install
```

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Production Build & Verification
```bash
# Type check and build all 38 prerendered routes
npm run build

# Verify code style and zero-lint errors
npm run lint

# Start production server
npm run start
```

---

## 🌐 Custom Domain & Deployment

Squeeze is configured for production on **`trysqueeze.online`**.

### Connecting to Vercel:
1. In the Vercel Dashboard, go to **Settings > Domains**.
2. Add `trysqueeze.online` and `www.trysqueeze.online`.
3. Point your registrar DNS:
   - **A Record**: `@` &rarr; `76.76.21.21`
   - **CNAME Record**: `www` &rarr; `cname.vercel-dns.com` *(or the canonical alias provided in your Vercel Dashboard)*

---

## ⚖️ License & Privacy
MIT License. 100% private: All image conversions and compressions run locally on the client's machine. No image data is ever collected, stored, or transmitted.
