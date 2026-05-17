import { useState, useMemo, useRef, useCallback } from 'react'
import resources from './data/resources.json'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import ResourceCard from './components/ResourceCard.jsx'
import SubmitButton from './components/SubmitButton.jsx'
import KittyDecorations from './components/KittyDecorations.jsx'
import KittyGame from './components/KittyGame.jsx'
import SavedFreebsPanel from './components/SavedFreebsPanel.jsx'

const MAILTO =
  'mailto:ayumyueow0614@gmail.com' +
  '?subject=Free%20Kit%20Submission' +
  '&body=Resource%20Name%3A%0AResource%20URL%3A%0ACategory%3A%0AWhy%20it%27s%20great%3A'

const CATEGORY_ICONS = {
  'Images':                            '🖼️',
  'Vector':                            '🎨',
  'Audio':                             '🎵',
  'Video':                             '🎬',
  'Fonts':                             '🔤',
  'Templates':                         '📄',
  'Visual Reference & Inspiration':    '🔍',
  'Design Tools & References':         '🛠️',
  'Color & Photography References':    '🎨',
  'Creative Professional Tools':       '🛠️',
  'Collections':                       '📦',
}

export default function App() {
  const [gameOpen,   setGameOpen]   = useState(false)
  const [freebsOpen, setFreebsOpen] = useState(false)

  const kittyRef     = useRef(null)
  const glassesTimer = useRef(null)

  const handleSearchFocus = useCallback(() => {
    clearTimeout(glassesTimer.current)
    kittyRef.current?.slideIn()
    glassesTimer.current = setTimeout(() => {
      kittyRef.current?.slideOut()
    }, 3000)
  }, [])

  const [query, setQuery]                   = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const newResources = useMemo(() => resources.filter((r) => r.isNew), [])

  const categories = useMemo(() => {
    const seen = new Set()
    const ordered = []
    for (const r of resources) {
      if (r.category && !seen.has(r.category)) { seen.add(r.category); ordered.push(r.category) }
    }
    return ordered.sort()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter((r) => {
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory
      const matchesQuery    = !q || r.name?.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <div className="app-container">

      {/* ── Header ── */}
      <Header
        resources={resources}
        onPlay={() => setGameOpen(true)}
        onFreebs={() => setFreebsOpen(true)}
      />

      <main className="main-content">

        {/* ── Toolbar row ── */}
        <div className="toolbar-row">
          <div className="toolbar-search">
            <SearchBar value={query} onChange={setQuery} onFocus={handleSearchFocus} />
          </div>
          <span style={{ fontSize: '0.6rem', color: 'var(--lavender)', fontFamily: 'var(--font-pixel)', whiteSpace: 'nowrap' }}>
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Category filter ── */}
        <CategoryFilter categories={categories} active={activeCategory} onSelect={setActiveCategory} />

        {/* ── NEW THIS WEEK strip ── */}
        {newResources.length > 0 && (
          <div className="new-strip">
            <div className="new-strip__header">
              <span className="blink">✨</span>NEW THIS WEEK<span className="blink">✨</span>
            </div>
            <div className="new-strip__scroll">
              {newResources.map((r, i) => (
                <a key={r.url ?? i} className="new-strip__card" href={r.url} target="_blank" rel="noopener noreferrer">
                  <div className="new-strip__card-bar"><div className="new-strip__card-name">{r.name}</div></div>
                  <div className="new-strip__card-body">
                    {r.category && (
                      <span className="category-badge" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                        {CATEGORY_ICONS[r.category] ?? '🔗'} {r.category}
                      </span>
                    )}
                    {r.isCommunityPick && <span className="badge-community">⭐</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Resource masonry grid ── */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">{query ? `No results for "${query}"` : 'Nothing here yet.'}</p>
            <p className="empty-state__sub">
              {query ? 'Try a different search term or clear the filter.' : 'Add entries to src/data/resources.json to get started.'}
            </p>
          </div>
        ) : (
          <div className="masonry-grid">
            {filtered.map((resource, i) => <ResourceCard key={resource.url ?? i} {...resource} />)}
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        ♥ FREE KIT — {resources.length} resources curated for creative professionals — free forever
      </footer>

      {/* ── Sticky submit CTA ── */}
      <div className="sticky-submit"><SubmitButton href={MAILTO} /></div>

      {/* ── Kitty decorations ── */}
      <KittyDecorations ref={kittyRef} />

      {/* ── Game overlay ── */}
      {gameOpen && <KittyGame resources={resources} onClose={() => setGameOpen(false)} />}

      {/* ── Saved Freebs panel ── */}
      <SavedFreebsPanel open={freebsOpen} onClose={() => setFreebsOpen(false)} />

    </div>
  )
}
