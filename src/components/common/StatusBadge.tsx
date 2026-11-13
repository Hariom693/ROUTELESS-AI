interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md'
  showDot?: boolean
}

export default function StatusBadge({ status, size = 'sm', showDot = true }: StatusBadgeProps) {
  const norm = (status || '').toLowerCase()

  let colorClass = 'bg-slate-100 text-slate-700 border-slate-200'
  let dotColor = 'bg-slate-400'
  let label = status

  switch (norm) {
    case 'available':
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200'
      dotColor = 'bg-emerald-500'
      label = 'Available'
      break
    case 'full':
      colorClass = 'bg-rose-50 text-rose-700 border-rose-200'
      dotColor = 'bg-rose-500'
      label = 'Full Capacity'
      break
    case 'breakdown':
    case 'cancelled':
      colorClass = 'bg-red-100 text-red-800 border-red-300 font-bold animate-pulse'
      dotColor = 'bg-red-600'
      label = norm === 'breakdown' ? 'Breakdown' : 'Cancelled'
      break
    case 'delayed':
      colorClass = 'bg-amber-50 text-amber-700 border-amber-200'
      dotColor = 'bg-amber-500'
      label = 'Delayed'
      break
    case 'in_transit':
      colorClass = 'bg-blue-50 text-blue-700 border-blue-200'
      dotColor = 'bg-blue-500 animate-ping'
      label = 'In Transit'
      break
    case 'scheduled':
      colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-200'
      dotColor = 'bg-indigo-500'
      label = 'Scheduled'
      break
    case 'waiting':
      colorClass = 'bg-yellow-50 text-yellow-800 border-yellow-200'
      dotColor = 'bg-yellow-500'
      label = 'Waiting Boarding'
      break
    case 'completed':
      colorClass = 'bg-slate-100 text-slate-600 border-slate-200'
      dotColor = 'bg-slate-400'
      label = 'Completed'
      break
    default:
      label = status.charAt(0).toUpperCase() + status.slice(1)
  }

  const sizeClass = size === 'md' ? 'text-xs px-2.5 py-1' : 'text-[11px] px-2 py-0.5'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${colorClass} ${sizeClass}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {label}
    </span>
  )
}
