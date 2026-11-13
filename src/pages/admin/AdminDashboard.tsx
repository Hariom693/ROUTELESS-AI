import {
  Bus,
  Car,
  Users,
  UserCheck,
  UserX,
  MapPin,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Clock,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import { Link } from 'react-router-dom'
import { SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

const DAILY_DEMAND = [
  { day: 'Mon', students: 95 },
  { day: 'Tue', students: 102 },
  { day: 'Wed', students: 98 },
  { day: 'Thu', students: 115 },
  { day: 'Fri', students: 108 },
  { day: 'Sat', students: 45 },
  { day: 'Sun', students: 12 },
]

const TRANSPORT_TYPE = [
  { name: 'Public Buses', value: 170, color: '#10b981' },
  { name: 'Private Vehicles', value: 42, color: '#3b82f6' },
]

const VEHICLE_UTIL = [
  ...SAMPLE_BUSES.map((b) => ({
    name: b.number.split(' ').slice(-1)[0],
    utilisation: Math.round((b.occupied / b.capacity) * 100),
    fill: b.status === 'full' ? '#ef4444' : b.occupied / b.capacity > 0.75 ? '#f97316' : '#10b981',
  })),
  ...PRIVATE_VEHICLES.map((p) => ({
    name: p.number.split(' ').slice(-1)[0],
    utilisation: Math.round((p.occupied / p.capacity) * 100),
    fill: '#3b82f6',
  })),
]

const SEAT_DATA = [
  { name: 'Occupied', value: 170, color: '#0f172a' },
  { name: 'Available', value: 72, color: '#22c55e' },
]

const RECENT_ACTIVITY = [
  { time: '07:32 AM', message: 'Bus TN 72 B 1234 departed Kovilpatti Bus Stand', type: 'info' },
  { time: '07:28 AM', message: '32 students allocated to Sivakasi morning route', type: 'success' },
  { time: '07:15 AM', message: 'Traffic alert: Heavy congestion on Virudhunagar corridor (+25 min)', type: 'warning' },
  { time: '06:45 AM', message: 'AI Prediction: 120 students expected on Kovilpatti–Sivakasi tomorrow', type: 'ai' },
]

const ROUTE_STATUS = [
  { route: 'Kovilpatti → Sivakasi', buses: 2, capacity: 80, occupied: 50, available: 30, traffic: 'low', status: 'active' },
  { route: 'Sankarankovil → Sivakasi', buses: 1, capacity: 45, occupied: 40, available: 5, traffic: 'medium', status: 'active' },
  { route: 'Rajapalayam → Tirunelveli', buses: 1, capacity: 55, occupied: 33, available: 22, traffic: 'low', status: 'active' },
  { route: 'Virudhunagar → Sivakasi', buses: 1, capacity: 50, occupied: 50, available: 0, traffic: 'high', status: 'full' },
  { route: 'Kovilpatti → Tirunelveli', buses: 1, capacity: 60, occupied: 45, available: 15, traffic: 'medium', status: 'active' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Transportation Command Centre</h1>
          <p className="text-xs text-slate-500 mt-1">Virudhunagar &amp; Tirunelveli Division — Real-time fleet status and AI insights</p>
        </div>
        <Link
          to="/admin/emergency"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition animate-pulse"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Open Emergency Simulator</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={487} icon={<Users className="w-5 h-5" />} change="+12 this week" changeType="positive" color="blue" />
        <StatCard title="Public Buses" value={5} icon={<Bus className="w-5 h-5" />} change="4 available" changeType="positive" color="navy" />
        <StatCard title="Private Vehicles" value={3} icon={<Car className="w-5 h-5" />} change="19 seats" changeType="neutral" color="green" />
        <StatCard title="Occupied Seats" value={170} icon={<UserCheck className="w-5 h-5" />} change="of 242 total" changeType="neutral" color="orange" />
        <StatCard title="Available Seats" value={72} icon={<UserX className="w-5 h-5" />} change="29.8% free" changeType="positive" color="green" />
        <StatCard title="Active Routes" value={8} icon={<MapPin className="w-5 h-5" />} color="blue" />
        <StatCard title="Emergency Allocs" value={2} icon={<AlertTriangle className="w-5 h-5" />} change="AI handled" changeType="positive" color="red" />
        <StatCard title="Today's Demand" value={487} icon={<TrendingUp className="w-5 h-5" />} change="↑ 8% vs avg" changeType="positive" color="purple" />
      </div>

      {/* Charts 2×2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Demand */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Daily Student Demand (This Week)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DAILY_DEMAND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
              <Bar dataKey="students" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transport Type Pie */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Public vs Private Ridership</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={TRANSPORT_TYPE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {TRANSPORT_TYPE.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Utilisation */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Vehicle Fill Rate (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={VEHICLE_UTIL} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={55} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} formatter={(v) => `${v}%`} />
              <Bar dataKey="utilisation" radius={[0, 6, 6, 0]}>
                {VEHICLE_UTIL.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Seat Donut */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Seat Allocation Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={SEAT_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {SEAT_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Route Status Table + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Status */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Corridor Status Board</h3>
            <Link to="/admin/routes" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Manage routes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Route</th>
                  <th className="pb-3">Buses</th>
                  <th className="pb-3">Capacity</th>
                  <th className="pb-3">Occupied</th>
                  <th className="pb-3">Available</th>
                  <th className="pb-3">Traffic</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {ROUTE_STATUS.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/60">
                    <td className="py-3 font-bold text-slate-900">{r.route}</td>
                    <td className="py-3">{r.buses}</td>
                    <td className="py-3">{r.capacity}</td>
                    <td className="py-3">{r.occupied}</td>
                    <td className="py-3 font-bold text-emerald-600">{r.available}</td>
                    <td className="py-3">
                      <span className={`w-2.5 h-2.5 rounded-full inline-block ${r.traffic === 'low' ? 'bg-emerald-500' : r.traffic === 'medium' ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'}`} />
                    </td>
                    <td className="py-3"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Live Activity Feed</h3>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((act, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                  act.type === 'warning' ? 'bg-amber-500' : act.type === 'success' ? 'bg-emerald-500' : act.type === 'ai' ? 'bg-purple-500' : 'bg-slate-400'
                }`}>
                  {act.type === 'ai' ? <Sparkles className="w-3.5 h-3.5" /> : act.type === 'warning' ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="font-medium text-slate-800">{act.message}</div>
                  <div className="text-slate-400 mt-0.5">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
