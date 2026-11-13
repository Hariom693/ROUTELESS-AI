import { User, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { VILLAGES } from '../../lib/constants'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <User className="w-7 h-7 text-emerald-600" />
        <span>Student Profile</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-black uppercase">
              {user?.full_name ? user.full_name.charAt(0) : 'S'}
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">{user?.full_name || 'Student'}</div>
              <div className="text-xs text-emerald-600 font-semibold">Rural Commuter Student</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 py-2 border-b border-slate-100"><Mail className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Email:</span><span className="font-bold ml-auto">{user?.email || 'student@demo.com'}</span></div>
            <div className="flex items-center gap-2 py-2 border-b border-slate-100"><Phone className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Phone:</span><span className="font-bold ml-auto">{user?.phone || '+91 98765 43210'}</span></div>
            <div className="flex items-center gap-2 py-2 border-b border-slate-100"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Home Village:</span><span className="font-bold ml-auto">{user?.village || 'Kovilpatti'}</span></div>
            <div className="flex items-center gap-2 py-2"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Account Created:</span><span className="font-bold ml-auto">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : '01 Nov 2026'}</span></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Commute Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-emerald-700">24</div>
              <div className="text-xs text-slate-500 font-medium">Total Trips</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-blue-700">684 km</div>
              <div className="text-xs text-slate-500 font-medium">Distance Covered</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-purple-700">22h</div>
              <div className="text-xs text-slate-500 font-medium">Time in Transit</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-amber-700">₹0</div>
              <div className="text-xs text-slate-500 font-medium">Total Cost (Pass)</div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 mb-2">Recent Login Activity</h3>
            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="flex justify-between"><span>13 Nov 2026, 07:15 AM</span><span className="font-bold text-emerald-600">Active</span></div>
              <div className="flex justify-between"><span>12 Nov 2026, 07:20 AM</span><span>10h 15m session</span></div>
              <div className="flex justify-between"><span>11 Nov 2026, 07:10 AM</span><span>9h 49m session</span></div>
              <div className="flex justify-between"><span>10 Nov 2026, 07:05 AM</span><span>8h 33m session</span></div>
              <div className="flex justify-between"><span>09 Nov 2026, 07:22 AM</span><span>9h 12m session</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
