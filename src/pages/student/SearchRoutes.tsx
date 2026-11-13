import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  Bus,
  Car,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'
import TransportMap from '../../components/map/TransportMap'
import { VILLAGES, COLLEGES, SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

export default function SearchRoutes() {
  const [searchParams] = useSearchParams()

  const initialFrom = searchParams.get('from') || VILLAGES[0].name
  const initialTo = searchParams.get('to') || COLLEGES[0].name
  const initialDate = searchParams.get('date') || '2026-11-14'

  const [fromVillage, setFromVillage] = useState(initialFrom)
  const [toCollege, setToCollege] = useState(initialTo)
  const [travelDate, setTravelDate] = useState(initialDate)
  const [preferredTime, setPreferredTime] = useState('07:30')
  const [filterType, setFilterType] = useState<'all' | 'public' | 'private'>('all')

  // Selected item for modal / tracking
  const [selectedTransit, setSelectedTransit] = useState<any | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // Combined Results calculation
  const allResults = useMemo(() => {
    const list: any[] = []

    // Public buses
    SAMPLE_BUSES.forEach((b) => {
      list.push({
        id: b.id,
        number: b.number,
        type: 'Public Govt Bus',
        category: 'public',
        route: b.route,
        capacity: b.capacity,
        available: b.available,
        occupied: b.occupied,
        departureTime: b.departureTime,
        travelTime: '55 mins',
        pickupPoint: b.pickupPoint,
        traffic: b.trafficLevel,
        status: b.status,
        cost: 0, // free for rural students with pass
      })
    })

    // Private vehicles
    PRIVATE_VEHICLES.forEach((p) => {
      list.push({
        id: p.id,
        number: p.number,
        type: p.type,
        category: 'private',
        route: `${fromVillage} → ${toCollege} (Rural Express)`,
        capacity: p.capacity,
        available: p.available,
        occupied: p.occupied,
        departureTime: '07:45',
        travelTime: '45 mins',
        pickupPoint: p.pickupPoint,
        traffic: 'low',
        status: p.status,
        cost: p.cost,
      })
    })

    return list
  }, [fromVillage, toCollege])

  const filteredResults = allResults.filter((item) => {
    if (filterType === 'public') return item.category === 'public'
    if (filterType === 'private') return item.category === 'private'
    return true
  })

  const availableCount = filteredResults.filter((r) => r.status === 'available').length

  const handleBook = (item: any) => {
    setSelectedTransit(item)
    setBookingConfirmed(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Smart Route Search &amp; Transit Matching</h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct government buses, private shuttles, and AI alternative routing for village students
        </p>
      </div>

      {/* Prominent Search Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Source Village
            </label>
            <select
              value={fromVillage}
              onChange={(e) => setFromVillage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-emerald-500 outline-none bg-white"
            >
              {VILLAGES.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Destination College
            </label>
            <select
              value={toCollege}
              onChange={(e) => setToCollege(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-emerald-500 outline-none bg-white"
            >
              {COLLEGES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Travel Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-emerald-500 outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Preferred Departure
            </label>
            <input
              type="time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-emerald-500 outline-none bg-white"
            />
          </div>
        </div>

        {/* Filters and Counters Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  filterType === 'all' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Vehicles ({allResults.length})
              </button>
              <button
                onClick={() => setFilterType('public')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  filterType === 'public' ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Public Buses (5)
              </button>
              <button
                onClick={() => setFilterType('private')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  filterType === 'private' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Private Rides (3)
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            Found <span className="font-bold text-emerald-600">{availableCount} active options</span> matching {fromVillage} → {toCollege}
          </div>
        </div>
      </div>

      {/* Booking Confirmation Toast */}
      {bookingConfirmed && selectedTransit && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-emerald-950">
                Seat Confirmed on {selectedTransit.number} ({selectedTransit.type})!
              </div>
              <p className="text-xs text-emerald-800">
                Board at <span className="font-bold">{selectedTransit.pickupPoint}</span> by{' '}
                <span className="font-bold">{selectedTransit.departureTime} AM</span>. Live GPS tracking has started below.
              </p>
            </div>
          </div>
          <button
            onClick={() => setBookingConfirmed(false)}
            className="text-xs font-semibold text-emerald-800 hover:underline px-3 py-1.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Results Table & Live Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Direct &amp; Connecting Transits</h2>
              <span className="text-xs text-slate-400">Date: {travelDate}</span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredResults.map((item) => {
                const isFull = item.status === 'full'

                return (
                  <div
                    key={item.id}
                    className={`p-5 transition hover:bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      selectedTransit?.id === item.id ? 'bg-emerald-50/50 border-l-4 border-emerald-600' : ''
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{item.number}</span>
                        <span className="text-xs text-slate-500 font-medium">• {item.type}</span>
                        <StatusBadge status={item.status} />
                      </div>

                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          Board: <strong className="text-slate-800">{item.pickupPoint}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Departs: <strong className="text-slate-800">{item.departureTime} AM</strong>
                        </span>
                        <span>Est: {item.travelTime}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500">Seats:</span>
                          <span className={`font-bold ${isFull ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {item.available} free
                          </span>
                          <span className="text-slate-400">/ {item.capacity}</span>
                        </div>
                        {item.cost > 0 ? (
                          <span className="font-bold text-blue-600">₹{item.cost} fare</span>
                        ) : (
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                            Student Pass Valid
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 self-end sm:self-center">
                      {isFull ? (
                        <div className="text-right">
                          <button
                            disabled
                            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed mb-1"
                          >
                            Bus Full
                          </button>
                          <div className="text-[10px] text-rose-500 font-medium">Use AI Alternative below</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleBook(item)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
                        >
                          Select &amp; Track
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Alternative Transportation Recommendation Panel (Module 10) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold tracking-tight">
                AI Smart Alternatives (When Govt Buses are Full or Cancelled)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ROUTELESS AI never leaves you stranded with a "No buses available" alert. We maintain active standby agreements with verified rural operators:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <div className="font-bold text-xs text-emerald-400">Shared Auto-Rickshaws</div>
                <div className="text-[11px] text-slate-300 mt-1">Standby at Kovilpatti Market</div>
                <div className="text-xs font-bold text-white mt-2">₹40/student • 2 seats left</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <div className="font-bold text-xs text-emerald-400">Community Vans</div>
                <div className="text-[11px] text-slate-300 mt-1">Rajapalayam Temple Gate</div>
                <div className="text-xs font-bold text-white mt-2">₹30/student • 5 seats left</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <div className="font-bold text-xs text-emerald-400">Multi-Stage Shuttle</div>
                <div className="text-[11px] text-slate-300 mt-1">Via Ettayapuram Hub</div>
                <div className="text-xs font-bold text-white mt-2">Connecting Bus #TN72AK</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Map Track */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Live Vehicle Position</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Tracking
            </span>
          </div>
          <TransportMap
            selectedVehicleId={selectedTransit?.id}
            height="540px"
            animated={true}
          />
        </div>
      </div>
    </div>
  )
}
