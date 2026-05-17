export default function SubmitButton({ href, children }) {
  return (
    <a
      className="pixel-btn"
      href={href || '#'}
      target={href?.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
    >
      {children ?? 'FOUND A FREEBIE? ♥ SUBMIT IT'}
    </a>
  )
}
