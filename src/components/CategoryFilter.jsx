const CATEGORY_ICONS = {
  'All':                               '★',
  'Collections':                       '♣',
  'Images':                            '♥',
  'Vector':                            '◆',
  'Audio':                             '♪',
  'Video':                             '►',
  'Fonts':                             'Aa',
  'Templates':                         '✦',
  'Visual Reference & Inspiration':    '◎',
  'Design Tools & References':         '✏',
  'Color & Photography References':    '◈',
  'Creative Professional Tools':       '⚙',
}

export default function CategoryFilter({ categories, active, onSelect }) {
  const all = ['All', ...categories]

  return (
    <div className="filter-row">
      {all.map((cat) => (
        <button
          key={cat}
          className={`filter-btn${active === cat ? ' active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          <i className="filter-btn__icon">{CATEGORY_ICONS[cat] ?? '♦'}</i>
          {cat}
        </button>
      ))}
    </div>
  )
}
