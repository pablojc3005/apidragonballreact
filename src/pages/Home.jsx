import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage:
          'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(180,30,0,0.45) 100%), url("https://es.dragon-ball-official.com/dragonball/es/banner/2026/01/0T4Rt0s9yC0B1THD/yoko_RGB_en.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        padding: '60px 5vw',
      }}>
        <div style={{ maxWidth: '600px' }}>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '12px',
            lineHeight: 1.1,
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Dragon Ball
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ color: '#facc15', fontSize: '20px', letterSpacing: '2px' }}>★★★★★</span>
            <span style={{ color: '#d1d5db', fontSize: '14px' }}>4.8 (67.7K)</span>
          </div>

          <p style={{
            color: '#e5e7eb',
            fontSize: 'clamp(14px, 2vw, 17px)',
            lineHeight: 1.7,
            marginBottom: '36px',
            maxWidth: '480px',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
          }}>
            Villanos aterradoramente malvados de los rincones más oscuros del
            espacio y el tiempo se enfrentan con la Tierra, y Goku, el guerrero
            más fuerte del planeta, ¡sólo lo que se interpone entre la humanidad
            y la extinción!
          </p>

          <Link
            to="/dragonball"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #ea580c, #c2410c)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: 'clamp(14px, 2vw, 17px)',
              padding: '14px 36px',
              borderRadius: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(234,88,12,0.5)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(234,88,12,0.7)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(234,88,12,0.5)'
            }}
          >
            ▶ Explorar Dragon Ball
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home