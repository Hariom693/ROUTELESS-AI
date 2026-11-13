import { Users, MapPin } from 'lucide-react'

const ALLOCATED_STUDENTS = [
  { seq: 1, name: 'Priya Sundaram', village: 'Kovilpatti', pickup: 'Kovilpatti Bus Stand', time: '07:30 AM', status: 'Confirmed' },
  { seq: 2, name: 'Aravind Kumar', village: 'Kovilpatti', pickup: 'Kovilpatti Bus Stand', time: '07:30 AM', status: 'Confirmed' },
  { seq: 3, name: 'Suganya Natarajan', village: 'Kovilpatti', pickup: 'Kovilpatti Bus Stand', time: '07:30 AM', status: 'Confirmed' },
  { seq: 4, name: 'Balaji Krishnan', village: 'Kovilpatti', pickup: 'Kovilpatti Bus Stand', time: '07:30 AM', status: 'Confirmed' },
  { seq: 5, name: 'Deepa Rajendran', village: 'Kovilpatti', pickup: 'Kovilpatti Bus Stand', time: '07:30 AM', status: 'Confirmed' },
  { seq: 6, name: 'Ganesh Thirunavukkarasu', village: 'Ettayapuram', pickup: 'Ettayapuram Junction', time: '07:45 AM', status: 'Confirmed' },
  { seq: 7, name: 'Haripriya Kannan', village: 'Ettayapuram', pickup: 'Ettayapuram Junction', time: '07:45 AM', status: 'Confirmed' },
  { seq: 8, name: 'Ilango Perumal', village: 'Ettayapuram', pickup: 'Ettayapuram Junction', time: '07:45 AM', status: 'Confirmed' },
  { seq: 9, name: 'Janani Subramanian', village: 'Ettayapuram', pickup: 'Ettayapuram Junction', time: '07:45 AM', status: 'Confirmed' },
  { seq: 10, name: 'Kavitha Moorthy', village: 'Ettayapuram', pickup: 'Ettayapuram Junction', time: '07:45 AM', status: 'Confirmed' },
]

export default function StudentAllocation() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            <span>Student Allocation List</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Vehicle TN 72 B 1234 — Kovilpatti → Sivakasi route</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs font-bold text-emerald-800">
          Capacity: 32 / 50 allocated (64%)
        </div>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '64%' }} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Student Name</th>
              <th className="px-5 py-3">Village</th>
              <th className="px-5 py-3">Pickup Point</th>
              <th className="px-5 py-3">Pickup Time</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {ALLOCATED_STUDENTS.map((s) => (
              <tr key={s.seq} className="hover:bg-slate-50/60">
                <td className="px-5 py-3 font-bold text-slate-400">{s.seq}</td>
                <td className="px-5 py-3 font-bold text-slate-900">{s.name}</td>
                <td className="px-5 py-3 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{s.village}</td>
                <td className="px-5 py-3">{s.pickup}</td>
                <td className="px-5 py-3 font-semibold text-emerald-700">{s.time}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-200 text-xs text-slate-500 font-medium bg-slate-50/60">
          Showing 10 of 32 allocated students. Total capacity: 50 seats.
        </div>
      </div>
    </div>
  )
}
