import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ogTokens = {
  canopyActive: '#123a31',
  creamPaper: '#f3f1ec',
  sheetWhite: '#fcfdf9',
  sageMist: 'rgba(190, 204, 198, 0.22)',
  mutedSlate: '#667570',
  statusDanger: '#c43b36',
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: ogTokens.canopyActive,
          color: ogTokens.creamPaper,
          fontFamily: 'Arial, sans-serif',
          padding: '60px',
        }}
      >
        {/* Grid pattern */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={ogTokens.sageMist} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Accent line */}
        <div style={{ width: 60, height: 4, background: ogTokens.statusDanger, marginBottom: 20 }} />

        {/* Title */}
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>Tramo</div>

        {/* Subtitle */}
        <div style={{ fontSize: 22, color: ogTokens.sheetWhite, marginTop: 12 }}> 
          Control energético para tu cartera de apartamentos
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40, fontSize: 16, color: ogTokens.creamPaper }}> 
          <div>→ Atribución por reserva</div>
          <div style={{ marginTop: 12 }}>→ Detección fuera estancia</div>
          <div style={{ marginTop: 12 }}>→ Informes propietarios</div>
        </div>

        {/* Bottom accent bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: ogTokens.statusDanger }} />
      </div>
    ),
    { ...size }
  )
}
