export default function SearchBar({ value, onChange, onFocus }) {
  return (
    <div className="search-wrap">
      <span className="search-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        className="search-input"
        type="text"
        placeholder="Search resources…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
      />
    </div>
  )
}
