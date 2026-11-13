import { useState } from 'react'
import { SlidersHorizontal, Sparkles, CheckCircle, AlertTriangle, ArrowRight, Bus } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'
import { SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

export default function RouteOptimization() {
  const [optimized, setOptimized] = useState(false)

  const allocations = SAMPLE_BUSES.map((b) => ({
    vehicle: b.number,
    route: b.route,
    allocated: b.occupied,
    capacity: b.capacity,
    fill: Math.round((b.occupied / b.capacity) * 100),
    status: b.status === 'full' ? 'Full → Redirect overflow' : b.occupied / b.capacity > 0.75 ? 'Near Full' : 'Optimal',
  }))

  const overflowBus = SAMPLE_BUSES.find((b) => b.status === 'full')
  const overflowStudents = overflowBus ? 15 : 0
  const receivingVehicle = PRIVATE_VEHICLES[0]

  const handleOptimize = () => {
    setOptimized(false)
    setTimeout(() => setOptimized(true), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-7 h-7 text-emerald-600" />
            <span>Smart Route Optimization</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">AI allocates students to vehicles based on capacity, route compatibility, and proximity</p>
        </div>
        <button
          onClick={handleOptimize}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Run Optimization</span>
        </button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center">
          <div className="text-2xl font-black text-slate-900">487</div>
          <div className="text-xs text-slate-500 font-medium">Total Students</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center">
          <div className="text-2xl font-black text-emerald-600">310</div>
          <div className="text-xs text-slate-500 font-medium">Total Seat Capacity</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center">
          <div className={`text-2xl font-black ${optimized ? 'text-emerald-600' : 'text-amber-600'}`}>
            {optimized ? '✅ Balanced' : '⚠️ Imbalanced'}
          </div>
          <div className="text-xs text-slate-500 font-medium">Optimization Status</div>
        </div>
      </div>

      {/* Current Allocation Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Current Vehicle Allocation Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Route</th>
                <th className="pb-3">Allocated</th>
                <th className="pb-3">Capacity</th>
                <th className="pb-3">Fill %</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {allocations.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50/60">
                  <td className="py-3 font-bold text-slate-900">{a.vehicle}</td>
                  <td className="py-3">{a.route}</td>
                  <td className="py-3">{a.allocated} / {a.capacity}</td>
                  <td className="py-3">
                    <div className="w-20 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${a.fill === 100 ? 'bg-rose-500' : a.fill > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${a.fill}%` }} />
                    </div>
                  </td>
                  <td className="py-3 font-bold">{a.fill}%</td>
                  <td className="py-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      a.status.includes('Full') ? 'bg-rose-100 text-rose-700' : a.status === 'Near Full' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overflow Scenario */}
      {overflowBus && (
        <div className={`bg-white rounded-2xl p-6 border shadow-xs space-y-4 ${optimized ? 'border-emerald-200' : 'border-amber-200'}`}>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Overflow Resolution Scenario
          </h2>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
            Bus <strong>{overflowBus.number}</strong> is at full capacity ({overflowBus.capacity}/{overflowBus.capacity}). <strong>{overflowStudents} additional students</strong> need an alternative vehicle.
          </div>

          {optimized && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-3 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sm mb-1">✅ Solution: Redirect {overflowStudents} students to {receivingVehicle.number} ({receivingVehicle.type})</div>
                <p className="text-emerald-800">
                  Vehicle {receivingVehicle.number} has {receivingVehicle.available} available seats at {receivingVehicle.pickupPoint}.
                  All {overflowStudents} students successfully redirected. Maximum vehicle capacity never exceeded.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
