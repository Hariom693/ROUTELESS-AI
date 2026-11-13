import { Clock, CheckCircle } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'

const TRIPS = [
  { date: '13 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 32, departure: '07:30 AM', arrival: '08:25 AM', duration: '55 min', status: 'in_transit' },
  { date: '12 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 30, departure: '07:30 AM', arrival: '08:22 AM', duration: '52 min', status: 'completed' },
  { date: '11 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 34, departure: '07:30 AM', arrival: '08:28 AM', duration: '58 min', status: 'completed' },
  { date: '10 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 28, departure: '07:30 AM', arrival: '08:30 AM', duration: '60 min', status: 'delayed' },
  { date: '09 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 31, departure: '07:30 AM', arrival: '08:20 AM', duration: '50 min', status: 'completed' },
  { date: '08 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 35, departure: '07:30 AM', arrival: '08:25 AM', duration: '55 min', status: 'completed' },
  { date: '07 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 29, departure: '07:30 AM', arrival: '—', duration: '—', status: 'cancelled' },
  { date: '06 Nov 2026', route: 'Kovilpatti → Sivakasi', students: 33, departure: '07:30 AM', arrival: '08:24 AM', duration: '54 min', status: 'completed' },
]

export default function TripHistory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-7 h-7 text-indigo-600" />
            <span>Trip History</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Vehicle TN 72 B 1234 — Performance log</p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 font-bold text-emerald-800">Total: 24 trips</div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 font-bold text-blue-800">On-time: 20</div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 font-bold text-amber-800">Delayed: 3</div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl px-3 py-1.5 font-bold text-rose-800">Cancelled: 1</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Route</th>
              <th className="px-5 py-3">Students</th>
              <th className="px-5 py-3">Departure</th>
              <th className="px-5 py-3">Arrival</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {TRIPS.map((t, i) => (
              <tr key={i} className="hover:bg-slate-50/60">
                <td className="px-5 py-3 font-bold text-slate-900">{t.date}</td>
                <td className="px-5 py-3">{t.route}</td>
                <td className="px-5 py-3">{t.students}</td>
                <td className="px-5 py-3">{t.departure}</td>
                <td className="px-5 py-3">{t.arrival}</td>
                <td className="px-5 py-3">{t.duration}</td>
                <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
