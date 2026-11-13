import { useState } from 'react'
import { TrendingUp, AlertTriangle, CheckCircle, Info, Sparkles, Bus } from 'lucide-react'

const PREDICTIONS = [
  { route: 'Kovilpatti → Sivakasi', predicted: 120, available: 90, shortage: 30, severity: 'high', explanation: 'High demand predicted based on Monday travel surge pattern. Historical average: 115 students. Pre-exam attendance expected. 87% confidence.' },
  { route: 'Sankarankovil → Sivakasi', predicted: 70, available: 80, shortage: 0, severity: 'ok', explanation: 'Normal demand expected. Historical average: 68 students. Sufficient capacity available on Bus TN 72 B 5678. 92% confidence.' },
  { route: 'Rajapalayam → Tirunelveli', predicted: 100, available: 60, shortage: 40, severity: 'critical', explanation: 'CRITICAL: Exam period at PSN College Tirunelveli. Demand 35% above normal average of 74. Only 1 government bus (TN 58 N 2345) covers this route. Deploy 1-2 additional vehicles urgently. 84% confidence.' },
  { route: 'Virudhunagar → Sivakasi', predicted: 85, available: 100, shortage: 0, severity: 'ok', explanation: 'Capacity adequate. Despite heavy traffic (+25 min delay), total 2-bus capacity exceeds predicted demand. Students advised to depart early. 90% confidence.' },
  { route: 'Kovilpatti → Tirunelveli', predicted: 60, available: 75, shortage: 0, severity: 'ok', explanation: 'Comfortable surplus. Bus TN 58 B 7890 can serve the 60 predicted students. This route sees lower demand on Thursdays. 91% confidence.' },
]

export default function AIPredictions() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [period, setPeriod] = useState<'tomorrow' | 'week'>('tomorrow')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-purple-600" />
            <span>AI Demand Forecast Engine</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Machine learning predictions based on historical patterns, weekday analysis, and occupancy data</p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs">
          <button onClick={() => setPeriod('tomorrow')} className={`px-4 py-1.5 rounded-lg font-bold transition ${period === 'tomorrow' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}>Tomorrow</button>
          <button onClick={() => setPeriod('week')} className={`px-4 py-1.5 rounded-lg font-bold transition ${period === 'week' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}>This Week</button>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-800">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <span><strong>Disclaimer:</strong> These are AI-generated estimates based on historical data patterns, not confirmed passenger counts. Actual demand may vary.</span>
      </div>

      {/* Prediction Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Route-Wise Demand Predictions — 14 Nov 2026</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {PREDICTIONS.map((pred, i) => {
            const isExpanded = expandedRow === i
            return (
              <div key={i}>
                <div
                  className={`px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition ${isExpanded ? 'bg-slate-50' : ''}`}
                  onClick={() => setExpandedRow(isExpanded ? null : i)}
                >
                  <div className="flex-1">
                    <div className="font-bold text-sm text-slate-900">{pred.route}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Click to see AI reasoning</div>
                  </div>

                  <div className="flex items-center gap-6 text-xs">
                    <div className="text-center">
                      <div className="text-slate-400 font-medium">Predicted</div>
                      <div className="font-black text-lg text-slate-900">{pred.predicted}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-400 font-medium">Capacity</div>
                      <div className="font-black text-lg text-emerald-600">{pred.available}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-400 font-medium">Shortage</div>
                      <div className={`font-black text-lg ${pred.shortage > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {pred.shortage > 0 ? `⚠️ ${pred.shortage}` : '✅ 0'}
                      </div>
                    </div>
                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        pred.severity === 'critical' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                        pred.severity === 'high' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {pred.severity === 'critical' ? '🚨 Critical' : pred.severity === 'high' ? '⚠️ High Demand' : '✅ Adequate'}
                      </span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 animate-in fade-in">
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold mb-1">AI Prediction Reasoning:</div>
                        <p className="leading-relaxed">{pred.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-3">
          <Bus className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-rose-900">🚌 Deploy 1 additional bus on Rajapalayam → Tirunelveli</div>
            <p className="text-xs text-rose-700 mt-1">Critical 40-student shortage predicted. Recommend deploying private shuttle TN 58 E 5555 or requesting TNSTC for temporary route reinforcement.</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-amber-900">⚠️ Monitor Kovilpatti → Sivakasi closely</div>
            <p className="text-xs text-amber-700 mt-1">30-student overflow expected. Pre-assign 15 students to private bus TN 72 AK 4321 (12 available seats) and 15 to auto-rickshaws.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
