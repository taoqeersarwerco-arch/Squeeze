import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#08090B',
          borderRadius: '7px',
          border: '1px solid rgba(255, 255, 255, 0.20)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Caliper Bracket */}
          <path
            d="M7 4.5H5C4.17 4.5 3.5 5.17 3.5 6V18C3.5 18.83 4.17 19.5 5 19.5H7"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Caliper Bracket */}
          <path
            d="M17 4.5H19C19.83 4.5 20.5 5.17 20.5 6V18C20.5 18.83 19.83 19.5 19 19.5H17"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Monogram 'S' */}
          <path
            d="M14.75 8.25C14.75 6.75 13.55 5.5 11.9 5.5C10.15 5.5 9 6.7 9 8.2C9 11.25 15 10.85 15 15.5C15 17.2 13.6 18.5 11.85 18.5C9.85 18.5 8.85 17.15 8.85 15.5"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Precision Sparkle Core */}
          <circle cx="12" cy="12" r="1" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
