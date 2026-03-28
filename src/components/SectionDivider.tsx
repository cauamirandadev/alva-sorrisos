/** Divisor decorativo entre seções com gradiente */
export default function SectionDivider({
  from = 'navy-900',
  to = 'cream-50',
}: {
  from?: string
  to?: string
}) {
  const gradients: Record<string, string> = {
    'navy-900-to-cream-50': 'from-navy-900 to-cream-50',
    'cream-50-to-navy-900': 'from-cream-50 to-navy-900',
  }
  const key = `${from}-to-${to}`
  return (
    <div
      className={`h-16 bg-gradient-to-b ${gradients[key] ?? 'from-navy-900 to-cream-50'}`}
      aria-hidden="true"
    />
  )
}
