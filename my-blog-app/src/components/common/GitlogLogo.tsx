export default function GitlogLogo({
  size = '48px',
  color = 'white',
  spacing = '2px',
}: {
  size?: string
  color?: string
  spacing?: string
}) {
  const letters = ['G', 'I', 'T', 'L', 'O', 'G']

  return (
    <h1 className={`flex justify-center font-smooch italic`} style={{ fontSize: size, color }}>
      {letters.map((char, i) => (
        <span key={i} style={{ marginInline: spacing }}>
          {char}
        </span>
      ))}
    </h1>
  )
}
