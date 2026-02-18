import { Link } from 'react-router-dom'

const affiliationStyles = {
    'Z Fighter': '#3b82f6',
    'Army of Frieza': '#7c3aed',
    'Freelancer': '#6b7280',
    'Pride Troopers': '#ca8a04',
    'Assistant of Beerus': '#db2777',
    'Villain': '#dc2626',
}

const DragonBallCard = ({ character }) => {
    const { id, name, ki, race, image, affiliation } = character
    const badgeColor = affiliationStyles[affiliation] || '#4b5563'

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'rgba(249,115,22,0.6)'
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(249,115,22,0.2)'
    }
    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = '#374151'
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)'
    }

    return (
        <Link
            to={`/dragonball/${id}`}
            style={{
                background: 'linear-gradient(160deg, #1f2937 0%, #111827 100%)',
                border: '1px solid #374151',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                position: 'relative',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{
                position: 'relative',
                height: '220px',
                background: 'linear-gradient(180deg, #1f2937 0%, #0f172a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                        padding: '12px',
                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
                        transition: 'transform 0.4s ease',
                    }}
                />

                <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: badgeColor,
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}>
                    {affiliation}
                </span>
            </div>

            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h2 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#f9fafb',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {name}
                </h2>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>{race}</p>
                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ki</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#fb923c' }}>{ki || '0'}</span>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #f97316, transparent)',
            }} />
        </Link>
    )
}

export default DragonBallCard
