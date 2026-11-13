export const getTrafficColor = (level: 'low' | 'medium' | 'high') => {
  if (level === 'low') return '#22C55E'
  if (level === 'medium') return '#F97316'
  return '#EF4444'
}
export const getTrafficLabel = (level: 'low' | 'medium' | 'high') => {
  if (level === 'low') return 'Clear'
  if (level === 'medium') return 'Moderate'
  return 'Heavy'
}
export const formatTime = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}
export const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    available: 'bg-green-100 text-green-800',
    full: 'bg-red-100 text-red-800',
    unavailable: 'bg-gray-100 text-gray-800',
    breakdown: 'bg-red-100 text-red-800',
    scheduled: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-green-100 text-green-800',
    delayed: 'bg-orange-100 text-orange-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return map[status] || 'bg-gray-100 text-gray-800'
}
export const calcArrivalTime = (departure: string, durationMinutes: number) => {
  const [h, m] = departure.split(':').map(Number)
  const total = h * 60 + m + durationMinutes
  const arrH = Math.floor(total / 60) % 24
  const arrM = total % 60
  return `${arrH.toString().padStart(2, '0')}:${arrM.toString().padStart(2, '0')}`
}

