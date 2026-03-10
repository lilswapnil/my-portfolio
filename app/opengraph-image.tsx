import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Swapnil's Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpengraphImage() {
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
          background: 'linear-gradient(135deg, #0f172a 0%, #111827 45%, #1f2937 100%)',
          color: '#f9fafb',
          fontFamily: 'Arial',
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.8, marginBottom: 16 }}>lilswapnil.me</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginBottom: 20 }}>
          Swapnil's Portfolio
        </div>
        <div style={{ fontSize: 34, opacity: 0.9, maxWidth: 1000 }}>
          Full Stack Developer • React • Next.js • TypeScript
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
