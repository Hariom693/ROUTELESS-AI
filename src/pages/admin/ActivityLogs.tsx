import { History, Shield, Clock } from 'lucide-react'

const LOGS = [
  { user: 'Priya Sundaram', role: 'student', loginTime: '13 Nov 2026, 07:15:22 AM', logoutTime: '—', duration: 'Active', status: 'active' },
  { user: 'K. Rajasekaran', role: 'admin', loginTime: '13 Nov 2026, 06:30:04 AM', logoutTime: '—', duration: 'Active', status: 'active' },
  { user: 'M. Murugan', role: 'driver', loginTime: '13 Nov 2026, 06:00:11 AM', logoutTime: '—', duration: 'Active', status: 'active' },
  { user: 'Karthik Murugan', role: 'student', loginTime: '13 Nov 2026, 07:00:45 AM', logoutTime: '—', duration: 'Active', status: 'active' },
  { user: 'Lakshmi Ranganathan', role: 'student', loginTime: '13 Nov 2026, 06:45:33 AM', logoutTime: '—', duration: 'Active', status: 'active' },
  { user: 'Venkatesh Subramanian', role: 'student', loginTime: '12 Nov 2026, 07:20:18 AM', logoutTime: '12 Nov 2026, 05:35:42 PM', duration: '10h 15m', status: 'completed' },
  { user: 'Divya Prabhakar', role: 'student', loginTime: '12 Nov 2026, 07:30:00 AM', logoutTime: '12 Nov 2026, 04:10:22 PM', duration: '8h 40m', status: 'completed' },
  { user: 'K. Rajasekaran', role: 'admin', loginTime: '12 Nov 2026, 06:15:55 AM', logoutTime: '12 Nov 2026, 06:45:00 PM', duration: '12h 29m', status: 'completed' },
  { user: 'Aravind Kumar', role: 'student', loginTime: '12 Nov 2026, 06:58:12 AM', logoutTime: '12 Nov 2026, 03:20:00 PM', duration: '8h 22m', status: 'completed' },
  { user: 'M. Murugan', role: 'driver', loginTime: '12 Nov 2026, 05:45:30 AM', logoutTime: '12 Nov 2026, 02:00:10 PM', duration: '8h 15m', status: 'completed' },
  { user: 'Meenakshi Selvam', role: 'student', loginTime: '11 Nov 2026, 07:10:44 AM', logoutTime: '11 Nov 2026, 05:00:00 PM', duration: '9h 49m', status: 'completed' },
  { user: 'Suganya Natarajan', role: 'student', loginTime: '11 Nov 2026, 07:22:10 AM', logoutTime: '11 Nov 2026, 04:55:30 PM', duration: '9h 33m', status: 'completed' },
]

export default function ActivityLogs() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <History className="w-7 h-7 text-indigo-600" />
        <span>Login &amp; Activity Audit Log</span>
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Login Time</th>
              <th className="px-5 py-3">Logout Time</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Session</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {LOGS.map((log, i) => (
              <tr key={i} className="hover:bg-slate-50/60">
                <td className="px-5 py-3 font-bold text-slate-900">{log.user}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    log.role === 'admin' ? 'bg-blue-100 text-blue-700' : log.role === 'driver' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>{log.role}</span>
                </td>
                <td className="px-5 py-3 text-slate-500">{log.loginTime}</td>
                <td className="px-5 py-3 text-slate-500">{log.logoutTime}</td>
                <td className="px-5 py-3 font-semibold">{log.duration}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    log.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    {log.status === 'active' ? 'Active Now' : 'Ended'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
