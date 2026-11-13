import { MapPin } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'
import TransportMap from '../../components/map/TransportMap'

const ROUTES = [
  { id: 'r1', source: 'Kovilpatti', destination: 'Sivakasi', distance: 28.5, duration: 55, stops: 3, vehicles: 2, status: 'active' },
  { id: 'r2', source: 'Sankarankovil', destination: 'Sivakasi', distance: 45.2, duration: 80, stops: 3, vehicles: 1, status: 'active' },
  { id: 'r3', source: 'Rajapalayam', destination: 'Tirunelveli', distance: 55.0, duration: 90, stops: 3, vehicles: 1, status: 'active' },
  { id: 'r4', source: 'Virudhunagar', destination: 'Sivakasi', distance: 20.0, duration: 40, stops: 3, vehicles: 1, status: 'active' },
  { id: 'r5', source: 'Kovilpatti', destination: 'Tirunelveli', distance: 72.0, duration: 110, stops: 3, vehicles: 1, status: 'active' },
]

export default function Routes() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <MapPin className="w-7 h-7 text-emerald-600" />
        <span>Route Network &amp; Stops Management</span>
      </h1>

      <TransportMap height="350px" animated={false} />

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Destination</th>
              <th className="px-5 py-3">Distance</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Stops</th>
              <th className="px-5 py-3">Vehicles</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {ROUTES.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/60">
                <td className="px-5 py-3 font-bold text-slate-900">{r.source}</td>
                <td className="px-5 py-3 font-bold text-slate-900">{r.destination}</td>
                <td className="px-5 py-3">{r.distance} km</td>
                <td className="px-5 py-3">{r.duration} min</td>
                <td className="px-5 py-3">{r.stops}</td>
                <td className="px-5 py-3">{r.vehicles}</td>
                <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
