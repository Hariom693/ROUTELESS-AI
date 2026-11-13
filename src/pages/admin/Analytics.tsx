import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { BarChart3 } from 'lucide-react'

const WEEKLY_USAGE = [
  { week: 'Week 1', students: 440, trips: 210 },
  { week: 'Week 2', students: 465, trips: 225 },
  { week: 'Week 3', students: 475, trips: 230 },
  { week: 'Week 4', students: 487, trips: 242 },
]

const ROUTE_PERF = [
  { route: 'KVP→SVK', avg: 55, onTime: 92 },
  { route: 'SNK→SVK', avg: 95, onTime: 78 },
  { route: 'RJP→TNV', avg: 92, onTime: 85 },
  { route: 'VDN→SVK', avg: 65, onTime: 70 },
  { route: 'KVP→TNV', avg: 115, onTime: 82 },
]

const PEAK_HOURS = [
  { hour: '06:00', students: 20 },
  { hour: '06:30', students: 45 },
  { hour: '07:00', students: 98 },
  { hour: '07:30', students: 150 },
  { hour: '08:00', students: 120 },
  { hour: '08:30', students: 40 },
  { hour: '09:00', students: 14 },
]

const VILLAGE_DIST = [
  { name: 'Kovilpatti', value: 145, color: '#10b981' },
  { name: 'Sivakasi', value: 92, color: '#3b82f6' },
  { name: 'Sankarankovil', value: 78, color: '#f97316' },
  { name: 'Rajapalayam', value: 105, color: '#8b5cf6' },
  { name: 'Virudhunagar', value: 67, color: '#0f172a' },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <BarChart3 className="w-7 h-7 text-purple-600" />
        <span>Transportation Analytics &amp; Reports</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Weekly Transport Usage Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WEEKLY_USAGE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="trips" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Route On-Time Performance (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ROUTE_PERF}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="route" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
              <Bar dataKey="onTime" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Peak Hours Boarding Analysis</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PEAK_HOURS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
              <Bar dataKey="students" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Students by Home Village</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={VILLAGE_DIST} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {VILLAGE_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
