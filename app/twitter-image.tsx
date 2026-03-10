import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AskScotty';
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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020407',
          position: 'relative',
          fontFamily: 'Arial',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(48% 28% at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, rgba(0,0,0,0) 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 26px 14px 14px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.35)',
            background: 'linear-gradient(180deg, rgba(38,40,44,0.98) 0%, rgba(21,23,27,0.98) 100%)',
            boxShadow:
              '0 0 38px rgba(255,255,255,0.26), 0 0 2px rgba(255,255,255,0.85), inset 0 1px 0 rgba(255,255,255,0.18)',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: '#f8fafc',
              background: 'linear-gradient(135deg, #e8a66c 0%, #8b5a2b 65%, #2d2d2d 100%)',
              border: '1px solid rgba(255,255,255,0.45)',
            }}
          >
            S
          </div>
          <div
            style={{
              display: 'flex',
              color: '#f3f4f6',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: -0.2,
            }}
          >
            AskScotty
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
