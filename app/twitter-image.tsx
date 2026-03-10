import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Swapnil's Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: 'linear-gradient(135deg, #0b1220 0%, #111827 55%, #1f2937 100%)',
          color: '#f9fafb',
          fontFamily: 'Arial',
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.85, marginBottom: 16 }}>@swapnil_dev</div>
        <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.05, marginBottom: 20 }}>
          Swapnil's Portfolio
        </div>
        <div style={{ fontSize: 34, opacity: 0.9, maxWidth: 1000 }}>
          Building clean, high-performance web experiences.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
