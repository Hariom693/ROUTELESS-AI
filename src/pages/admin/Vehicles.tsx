import { useState } from 'react'
import { Bus, Car } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'
import { SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

export default function Vehicles() {
  const [tab, setTab] = useState<'public' | 'private'>('public')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Bus className="w-7 h-7 text-emerald-600" />
          <span>Vehicle Fleet Manager</span>
        </h1>
      </div>

      <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs">
        <button onClick={() => setTab('public')} className={`px-4 py-1.5 rounded-lg font-bold transition ${tab === 'public' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}>Public Buses ({SAMPLE_BUSES.length})</button>
        <button onClick={() => setTab('private')} className={`px-4 py-1.5 rounded-lg font-bold transition ${tab === 'private' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}>Private Vehicles ({PRIVATE_VEHICLES.length})</button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="px-5 py-3">Number</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Route</th>
              <th className="px-5 py-3">Capacity</th>
              <th className="px-5 py-3">Available</th>
              <th className="px-5 py-3">Occupied</th>
              <th className="px-5 py-3">Status</th>
              {tab === 'private' && <th className="px-5 py-3">Cost</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {tab === 'public'
              ? SAMPLE_BUSES.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 font-bold text-slate-900">{b.number}</td>
                    <td className="px-5 py-3">Government Bus</td>
                    <td className="px-5 py-3">{b.route}</td>
                    <td className="px-5 py-3">{b.capacity}</td>
                    <td className="px-5 py-3 font-bold text-emerald-600">{b.available}</td>
                    <td className="px-5 py-3">{b.occupied}</td>
                    <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                  </tr>
                ))
              : PRIVATE_VEHICLES.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 font-bold text-slate-900">{p.number}</td>
                    <td className="px-5 py-3">{p.type}</td>
                    <td className="px-5 py-3">{p.pickupPoint}</td>
                    <td className="px-5 py-3">{p.capacity}</td>
                    <td className="px-5 py-3 font-bold text-blue-600">{p.available}</td>
                    <td className="px-5 py-3">{p.occupied}</td>
                    <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-3 font-bold text-slate-900">₹{p.cost}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
