
import { useState, useEffect, useMemo } from 'react'
import DragonBallCard from '../components/DragonBallCard'

const PAGE_SIZE = 14

const DragonBall = () => {
    const [allCharacters, setAllCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true)
            setError(null)
            try {
                const firstRes = await fetch('https://dragonball-api.com/api/characters?limit=100&page=1')
                if (!firstRes.ok) throw new Error('Error al cargar los personajes')
                const firstData = await firstRes.json()
                const totalPages = firstData.meta.totalPages


                if (totalPages > 1) {
                    const requests = []
                    for (let p = 2; p <= totalPages; p++) {
                        requests.push(fetch(`https://dragonball-api.com/api/characters?limit=100&page=${p}`))
                    }
                    const responses = await Promise.all(requests)
                    const pages = await Promise.all(responses.map(r => r.json()))
                    const rest = pages.flatMap(d => d.items)
                    setAllCharacters([...firstData.items, ...rest])
                } else {
                    setAllCharacters(firstData.items)
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [])


    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        if (!term) return allCharacters
        return allCharacters.filter(c =>
            c.name.toLowerCase().includes(term)
        )
    }, [search, allCharacters])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const handleClear = () => {
        setSearch('')
        setPage(1)
    }

    return (
        <div style={{ minHeight: '100vh', background: '#030712', padding: '40px 16px' }}>

            <div style={{ maxWidth: '1280px', margin: '0 auto 32px', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: '800',
                    color: '#f9fafb',
                    marginBottom: '8px',
                }}>
                    🐉 <span style={{ color: '#f97316' }}>Personajes</span>
                </h1>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    maxWidth: '520px',
                    margin: '0 auto',
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#6b7280',
                            fontSize: '16px',
                            pointerEvents: 'none',
                        }}>
                            🔍
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Buscar personaje..."
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px 40px 12px 42px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid #374151',
                                borderRadius: '12px',
                                color: '#f9fafb',
                                fontSize: '15px',
                                outline: 'none',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                fontFamily: 'inherit',
                                boxSizing: 'border-box',
                                opacity: loading ? 0.5 : 1,
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = '#f97316'
                                e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = '#374151'
                                e.target.style.boxShadow = 'none'
                            }}
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={handleClear}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#6b7280',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    lineHeight: 1,
                                    padding: '2px',
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>


                {!loading && (
                    <div style={{ marginTop: '12px', color: '#6b7280', fontSize: '13px' }}>
                        {search ? (
                            <>
                                <span style={{ color: '#f97316', fontWeight: '600' }}>{filtered.length}</span>
                                {' '}resultado{filtered.length !== 1 ? 's' : ''} para{' '}
                                <strong style={{ color: '#f9fafb' }}>"{search}"</strong>
                                {' · '}
                                <button
                                    onClick={handleClear}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#f97316',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        padding: 0,
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Ver todos
                                </button>
                            </>
                        ) : (
                            <span>{allCharacters.length} personajes en total</span>
                        )}
                    </div>
                )}
            </div>


            {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px', gap: '16px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        border: '4px solid #f97316',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>Cargando personajes...</p>
                </div>
            )}


            {error && (
                <div style={{
                    maxWidth: '400px',
                    margin: '0 auto',
                    textAlign: 'center',
                    background: 'rgba(127,29,29,0.3)',
                    border: '1px solid #ef4444',
                    borderRadius: '12px',
                    padding: '24px',
                }}>
                    <p style={{ color: '#f87171', fontWeight: '600' }}>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '16px',
                            background: '#ea580c',
                            color: '#fff',
                            fontWeight: '700',
                            padding: '8px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Reintentar
                    </button>
                </div>
            )}


            {!loading && !error && filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 16px' }}>
                    <p style={{ fontSize: '3rem', marginBottom: '12px' }}>🤔</p>
                    <p style={{ color: '#9ca3af', fontSize: '1.1rem', marginBottom: '16px' }}>
                        No se encontró ningún personaje con ese nombre
                    </p>
                    <button
                        onClick={handleClear}
                        style={{
                            background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                            color: '#fff',
                            fontWeight: '700',
                            padding: '10px 28px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Ver todos los personajes
                    </button>
                </div>
            )}


            {!loading && !error && filtered.length > 0 && (
                <>
                    <div style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '16px',
                    }}>
                        {pageItems.map((character) => (
                            <DragonBallCard key={character.id} character={character} />
                        ))}
                    </div>


                    {totalPages > 1 && (
                        <div style={{
                            maxWidth: '1280px',
                            margin: '40px auto 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '16px',
                        }}>
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: currentPage === 1 ? '#1f2937' : '#374151',
                                    color: currentPage === 1 ? '#6b7280' : '#f9fafb',
                                    fontWeight: '600',
                                    padding: '10px 24px',
                                    borderRadius: '12px',
                                    border: '1px solid #374151',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    opacity: currentPage === 1 ? 0.5 : 1,
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => { if (currentPage !== 1) e.currentTarget.style.background = '#ea580c' }}
                                onMouseLeave={e => { if (currentPage !== 1) e.currentTarget.style.background = '#374151' }}
                            >
                                ← Anterior
                            </button>

                            <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                                Página <strong style={{ color: '#f9fafb' }}>{currentPage}</strong> de{' '}
                                <strong style={{ color: '#f9fafb' }}>{totalPages}</strong>
                            </span>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: currentPage === totalPages ? '#1f2937' : '#374151',
                                    color: currentPage === totalPages ? '#6b7280' : '#f9fafb',
                                    fontWeight: '600',
                                    padding: '10px 24px',
                                    borderRadius: '12px',
                                    border: '1px solid #374151',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    opacity: currentPage === totalPages ? 0.5 : 1,
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => { if (currentPage !== totalPages) e.currentTarget.style.background = '#ea580c' }}
                                onMouseLeave={e => { if (currentPage !== totalPages) e.currentTarget.style.background = '#374151' }}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DragonBall
