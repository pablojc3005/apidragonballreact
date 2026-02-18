import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Layout() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dragonball', label: 'Personajes' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#030712' }}>

      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled
          ? 'rgba(3,7,18,0.92)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(249,115,22,0.15)' : '1px solid transparent',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '28px', lineHeight: 1 }}>🐉</span>
            <span style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              fontFamily: 'system-ui, sans-serif',
            }}>
              Dragon<span style={{ color: '#f97316' }}>Ball</span>
            </span>
          </Link>

          <ul style={{
            display: 'flex',
            gap: '4px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
            className="nav-desktop"
          >
            {navLinks.map(({ to, label }) => {
              const active = isActive(to)
              return (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: active ? '700' : '500',
                      color: active ? '#ffffff' : '#d1d5db',
                      background: active
                        ? 'linear-gradient(135deg, #ea580c, #c2410c)'
                        : 'transparent',
                      boxShadow: active ? '0 2px 12px rgba(234,88,12,0.4)' : 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.color = '#ffffff'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.color = '#d1d5db'
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <button
            onClick={() => setMenuOpen(o => !o)}
            className="nav-mobile-btn"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#ffffff',
                borderRadius: '2px',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                      : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        <div
          className="nav-mobile-menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            padding: menuOpen ? '12px 24px 20px' : '0 24px',
            maxHeight: menuOpen ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease, padding 0.3s ease',
            borderTop: menuOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}
        >
          {navLinks.map(({ to, label }) => {
            const active = isActive(to)
            return (
              <Link
                key={to}
                to={to}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: active ? '700' : '500',
                  color: active ? '#f97316' : '#d1d5db',
                  background: active ? 'rgba(249,115,22,0.1)' : 'transparent',
                  borderLeft: active ? '3px solid #f97316' : '3px solid transparent',
                  transition: 'all 0.2s',
                  marginBottom: '4px',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
        }
      `}</style>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}