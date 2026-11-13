import { useState } from 'react'
import {
  LayoutDashboard,
  Bus,
  Users,
  MapPin,
  Clock,
  Navigation,
  CheckCircle,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Bell,
} from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'

export default function DriverDashboard() {
  const [tripStatus, setTripStatus] = useState('scheduled')
  const [locationSharing, setLocationSharing] = useState(false)
  const [statusChanged, setStatusChanged] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    setTripStatus(newStatus)
    setStatusChanged(true)
    setTimeout(() => setStatusChanged(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
            <Navigation className="w-3.5 h-3.5" />
            <span>DRIVER COMMAND CENTRE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Vanakkam, M. Murugan! 👋
          </h1>
          <p className="text-amber-200 text-sm mt-1">
            Vehicle <span className="font-bold text-white">TN 72 B 1234</span> • Route: Kovilpatti → Sivakasi • Departure: 07:30 AM
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Students Assigned" value={32} icon={<Users className="w-5 h-5" />} color="blue" />
        <StatCard title="Available Seats" value={18} icon={<CheckCircle className="w-5 h-5" />} color="green" />
        <StatCard title="Route Distance" value="28.5 km" icon={<MapPin className="w-5 h-5" />} color="navy" />
        <StatCard title="Est. Duration" value="55 min" icon={<Clock className="w-5 h-5" />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Vehicle Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bus className="w-4 h-4 text-emerald-600" />
            Assigned Vehicle Details
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Vehicle Number</span><span className="font-bold text-slate-900">TN 72 B 1234</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Vehicle Type</span><span className="font-bold">Government Bus</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Route</span><span className="font-bold">Kovilpatti → Sivakasi</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Departure Time</span><span className="font-bold text-emerald-700">07:30 AM</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Max Capacity</span><span className="font-bold">50 seats</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Allocated Students</span><span className="font-bold text-blue-700">32 students</span></div>
            <div className="flex justify-between py-2"><span className="text-slate-500">Status</span><StatusBadge status="available" /></div>
          </div>
        </div>

        {/* Controls Card */}
        <div className="space-y-4">
          {/* Trip Status Update */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Update Trip Status</h2>
            <select
              value={tripStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:border-emerald-500 outline-none bg-white"
            >
              <option value="scheduled">Scheduled</option>
              <option value="waiting">Waiting for Pickup</option>
              <option value="in_transit">In Transit</option>
              <option value="completed">Completed</option>
            </select>
            {statusChanged && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4" /> Trip status updated to "{tripStatus}" successfully!
              </div>
            )}
          </div>

          {/* Location Sharing Toggle */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Live Location Sharing</h2>
              <p className="text-xs text-slate-500 mt-0.5">Allow students to track your vehicle on the map</p>
            </div>
            <button onClick={() => setLocationSharing(!locationSharing)} className="cursor-pointer">
              {locationSharing ? (
                <ToggleRight className="w-10 h-10 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-slate-400" />
              )}
            </button>
          </div>

          {/* Pickup Points */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Today's Pickup Points
            </h2>
            <div className="space-y-2">
              {[
                { order: 1, stop: 'Kovilpatti Bus Stand', time: '07:30 AM', students: 18 },
                { order: 2, stop: 'Ettayapuram Junction', time: '07:45 AM', students: 8 },
                { order: 3, stop: 'Sivakasi Main Stand (Drop)', time: '08:25 AM', students: 0 },
              ].map((s) => (
                <div key={s.order} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">{s.order}</span>
                    <div>
                      <div className="font-bold text-slate-900">{s.stop}</div>
                      <div className="text-slate-500">ETA: {s.time}</div>
                    </div>
                  </div>
                  {s.students > 0 && <span className="font-bold text-blue-700">{s.students} boarding</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-600" />
          Recent Notifications
        </h2>
        <div className="space-y-2">
          {[
            { msg: '32 students have been allocated to your vehicle for today\'s morning route', time: '06:15 AM', type: 'info' },
            { msg: 'Traffic alert: Moderate traffic expected near Ettayapuram Junction (+15 min)', time: '06:30 AM', type: 'warning' },
            { msg: 'All passengers must arrive 10 minutes before 07:30 AM departure', time: '06:00 AM', type: 'info' },
          ].map((n, i) => (
            <div key={i} className={`p-3 rounded-xl text-xs flex items-start gap-2 ${n.type === 'warning' ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-slate-50 border border-slate-200 text-slate-700'}`}>
              {n.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" /> : <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />}
              <div><div className="font-medium">{n.msg}</div><div className="text-slate-400 mt-0.5">{n.time}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
