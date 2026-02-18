import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DragonBallDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`https://dragonball-api.com/api/characters/${id}`)
                if (!res.ok) throw new Error('Personaje no encontrado')
                const data = await res.json()
                setCharacter(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCharacter()
    }, [id])

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    width: '56px', height: '56px',
                    border: '4px solid #f97316', borderTopColor: 'transparent',
                    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <p style={{ color: '#f87171', fontSize: '18px', fontWeight: '600' }}>{error}</p>
                <button onClick={() => navigate('/dragonball')} style={{
                    background: '#ea580c',
                    color: '#fff',
                    fontWeight: '700',
                    padding: '10px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}>← Volver</button>
            </div>
        )
    }

    const { name, ki, maxKi, race, gender, affiliation, description, image, originPlanet, transformations } = character

    return (
        <div style={{ minHeight: '100vh', background: '#030712', padding: '40px 16px' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>

                <button
                    onClick={() => navigate('/dragonball')}
                    style={{
                        background: 'transparent',
                        color: '#9ca3af',
                        fontWeight: '600',
                        padding: '8px 0',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'color 0.2s',
                        marginBottom: '32px'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                >
                    ← Volver a personajes
                </button>


                <div style={{
                    background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                    borderRadius: '24px',
                    border: '1px solid #374151',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>

                    <div style={{
                        flex: '0 0 320px',
                        minWidth: '260px',
                        background: 'linear-gradient(135deg, #1f2937, #0f172a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '32px',
                        minHeight: '320px',
                    }}>
                        <img
                            src={image}
                            alt={name}
                            style={{
                                maxHeight: '320px',
                                width: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 40px rgba(249,115,22,0.25))',
                            }}
                        />
                    </div>


                    <div style={{ flex: '1 1 300px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800', color: '#f9fafb', marginBottom: '4px' }}>
                                {name}
                            </h1>
                            <p style={{ color: '#f97316', fontWeight: '600', fontSize: '16px' }}>{affiliation}</p>
                        </div>


                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            {[
                                { label: 'Raza', value: race, color: '#60a5fa' },
                                { label: 'Género', value: gender, color: '#f472b6' },
                                { label: 'Ki base', value: ki, color: '#fb923c' },
                                { label: 'Ki máximo', value: maxKi, color: '#facc15' },
                            ].map(({ label, value, color }) => (
                                <div key={label} style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid #374151',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                }}>
                                    <span style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
                                    <span style={{ fontSize: '13px', fontWeight: '700', color }}>{value || '—'}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Descripción</p>
                            <p style={{
                                color: '#d1d5db',
                                fontSize: '13px',
                                lineHeight: '1.7',
                                display: '-webkit-box',
                                WebkitLineClamp: 6,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>

                {originPlanet && (
                    <div style={{
                        marginTop: '24px',
                        background: 'linear-gradient(135deg, #1f2937, #111827)',
                        borderRadius: '16px',
                        border: '1px solid #374151',
                        padding: '24px',
                        display: 'flex',
                        gap: '24px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <img
                            src={originPlanet.image}
                            alt={originPlanet.name}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #374151', flexShrink: 0 }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                <h2 style={{ color: '#f9fafb', fontWeight: '700', fontSize: '18px' }}>
                                    🌍 Planeta de origen: {originPlanet.name}
                                </h2>
                                {originPlanet.isDestroyed && (
                                    <span style={{
                                        fontSize: '11px', fontWeight: '700',
                                        background: 'rgba(127,29,29,0.5)', color: '#f87171',
                                        border: '1px solid #dc2626', padding: '2px 10px', borderRadius: '999px',
                                    }}>
                                        Destruido
                                    </span>
                                )}
                            </div>
                            <p style={{
                                color: '#9ca3af', fontSize: '13px', lineHeight: '1.6',
                                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                            }}>
                                {originPlanet.description}
                            </p>
                        </div>
                    </div>
                )}

                {transformations && transformations.length > 0 && (
                    <div style={{ marginTop: '32px' }}>
                        <h2 style={{ color: '#f9fafb', fontWeight: '800', fontSize: '22px', marginBottom: '20px' }}>
                            ⚡ Transformaciones <span style={{ color: '#f97316' }}>({transformations.length})</span>
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                            gap: '12px',
                        }}>
                            {transformations.map((t) => (
                                <div
                                    key={t.id}
                                    style={{
                                        background: 'linear-gradient(160deg, #1f2937, #111827)',
                                        border: '1px solid #374151',
                                        borderRadius: '14px',
                                        padding: '12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'transform 0.2s, border-color 0.2s',
                                        cursor: 'default',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)'
                                        e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        e.currentTarget.style.borderColor = '#374151'
                                    }}
                                >
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        loading="lazy"
                                        style={{ height: '90px', width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                                    />
                                    <p style={{ fontSize: '11px', color: '#e5e7eb', fontWeight: '600', textAlign: 'center', lineHeight: '1.3' }}>{t.name}</p>
                                    <p style={{ fontSize: '11px', color: '#fb923c', fontWeight: '700' }}>{t.ki}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
/*
const btnStyle = {
    background: '#ea580c',
    color: '#fff',
    fontWeight: '700',
    padding: '10px 24px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
}

const btnOutlineStyle = {
    background: 'transparent',
    color: '#9ca3af',
    fontWeight: '600',
    padding: '8px 0',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.2s',
}
*/
export default DragonBallDetail
