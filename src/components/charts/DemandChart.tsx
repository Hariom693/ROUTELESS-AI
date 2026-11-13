import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'
import { DEMAND_PREDICTIONS } from '../../lib/constants'

export default function DemandChart() {
  const chartData = DEMAND_PREDICTIONS.map((p) => ({
    route: p.route.replace('–', '→').substring(0, 22),
    'Predicted Students': p.predicted,
    'Available Seats': p.available,
    shortage: Math.max(0, p.predicted - p.available),
  }))

  return (
    <div className="w-full bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">AI Demand vs Capacity Forecast</h3>
        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase">
          AI Generated
        </span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="route" tick={{ fontSize: 10 }} interval={0} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
          <ReferenceLine y={0} stroke="#94a3b8" />
          <Bar dataKey="Predicted Students" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Available Seats" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-slate-400 mt-3 italic">
        ⚠️ Predictions are AI-generated estimates based on historical patterns — not confirmed passenger counts.
      </p>
    </div>
  )
}
