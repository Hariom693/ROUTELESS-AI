import { useState } from 'react'
import { Bus, Clock, MapPin, Users, CheckCircle, AlertTriangle } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'
import { SAMPLE_BUSES } from '../../lib/constants'

export default function PublicTransport() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = SAMPLE_BUSES.filter((b) => {
    const matchesSearch =
      b.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.route.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bus className="w-7 h-7 text-emerald-600" />
            <span>Government Bus Fleet</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dedicated rural student transits operated by Tamil Nadu State Transport Corporation (TNSTC)
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search route or bus number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-emerald-500 outline-none w-52 bg-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-emerald-500 outline-none bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="full">Full Capacity</option>
          </select>
        </div>
      </div>

      {/* Grid of buses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((bus) => {
          const fillPercentage = Math.round((bus.occupied / bus.capacity) * 100)
          const isFull = bus.status === 'full'

          return (
            <div
              key={bus.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{bus.number}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Govt Bus
                    </span>
                  </div>
                  <StatusBadge status={bus.status} />
                </div>

                <div className="text-xs font-semibold text-slate-800">{bus.route}</div>

                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Departure: <strong className="text-slate-800">{bus.departureTime} AM</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Boarding: <strong className="text-slate-800">{bus.pickupPoint}</strong></span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Passenger Load</span>
                    <span className="font-bold text-slate-800">
                      {bus.occupied} / {bus.capacity} seats ({fillPercentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFull ? 'bg-rose-500' : fillPercentage > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                  <div className="mt-1 text-right text-[10px] font-semibold text-emerald-600">
                    {bus.available} seats currently available
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Free for student pass holders</span>
                {isFull ? (
                  <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Full
                  </span>
                ) : (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Direct Route
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
