import { ImageResponse } from 'next/og';

export const alt = 'Squeeze - Free In-Browser Image Converter & Compressor';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#08090B',
          backgroundImage:
            'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.15), transparent 60%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.10), transparent 50%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          padding: '60px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '24px',
            display: 'flex',
          }}
        />

        {/* Brand Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 20px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
            }}
          />
          <span style={{ fontSize: '18px', fontWeight: 600, color: '#E4E4E7' }}>
            100% In-Browser • Zero-Upload Privacy
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '20px',
            color: '#FFFFFF',
          }}
        >
          Squeeze ⚡
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#A1A1AA',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
            marginBottom: '40px',
          }}
        >
          Convert & Compress JPG, PNG, WebP, SVG, and ICO instantly on your device.
        </div>

        {/* Supported Format Pills */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
          }}
        >
          {['PNG', 'JPG', 'WEBP', 'SVG', 'ICO'].map((fmt) => (
            <div
              key={fmt}
              style={{
                padding: '8px 20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '18px',
                fontWeight: 700,
                color: '#E4E4E7',
              }}
            >
              {fmt}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
