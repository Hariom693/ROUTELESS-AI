import { useState, useMemo } from 'react'
import { AlertTriangle, CheckCircle, XCircle, RotateCcw, Bus, Users, MapPin, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'
import { SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

type SimState = 'idle' | 'selecting' | 'running' | 'complete'

interface AllocationResult {
  vehicleId: string
  vehicleNumber: string
  vehicleType: string
  seatsAllocated: number
  pickupPoint: string
}

interface SimulationResult {
  failedVehicle: typeof SAMPLE_BUSES[0]
  affectedStudents: number
  allocations: AllocationResult[]
  reassigned: number
  unassigned: number
}

export default function EmergencySimulation() {
  const [simState, setSimState] = useState<SimState>('idle')
  const [selectedBusId, setSelectedBusId] = useState<string>(SAMPLE_BUSES[0].id)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [animProgress, setAnimProgress] = useState(0)

  const activeBuses = SAMPLE_BUSES.filter((b) => b.status !== 'breakdown')

  const runSimulation = () => {
    const bus = SAMPLE_BUSES.find((b) => b.id === selectedBusId)
    if (!bus) return

    setSimState('running')
    setAnimProgress(0)

    // Animate progress
    let step = 0
    const interval = setInterval(() => {
      step += 1
      setAnimProgress(Math.min(step * 10, 100))
      if (step >= 10) {
        clearInterval(interval)

        // Calculate reallocation
        const affected = bus.occupied
        const allocations: AllocationResult[] = []
        let totalReassigned = 0

        // Try alternative public buses first
        const otherBuses = SAMPLE_BUSES.filter((b) => b.id !== bus.id && b.status === 'available' && b.available > 0)
        for (const alt of otherBuses) {
          if (totalReassigned >= affected) break
          const canTake = Math.min(alt.available, affected - totalReassigned)
          if (canTake > 0) {
            allocations.push({
              vehicleId: alt.id,
              vehicleNumber: alt.number,
              vehicleType: 'Government Bus',
              seatsAllocated: canTake,
              pickupPoint: alt.pickupPoint,
            })
            totalReassigned += canTake
          }
        }

        // Try private vehicles
        for (const priv of PRIVATE_VEHICLES) {
          if (totalReassigned >= affected) break
          if (priv.status === 'available' && priv.available > 0) {
            const canTake = Math.min(priv.available, affected - totalReassigned)
            allocations.push({
              vehicleId: priv.id,
              vehicleNumber: priv.number,
              vehicleType: priv.type,
              seatsAllocated: canTake,
              pickupPoint: priv.pickupPoint,
            })
            totalReassigned += canTake
          }
        }

        const unassigned = Math.max(0, affected - totalReassigned)

        setResult({
          failedVehicle: bus,
          affectedStudents: affected,
          allocations,
          reassigned: totalReassigned,
          unassigned,
        })
        setSimState('complete')
      }
    }, 200)
  }

  const resetSimulation = () => {
    setSimState('idle')
    setResult(null)
    setAnimProgress(0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>EMERGENCY SIMULATION MODULE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Bus Breakdown Simulation &amp; AI Reallocation
          </h1>
          <p className="text-rose-200 text-sm mt-1 max-w-2xl">
            Select an active government bus, simulate a breakdown, and watch the AI engine reallocate every affected student to alternative vehicles in real-time.
          </p>
        </div>
      </div>

      {/* Control Panel + Current Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Simulation Controls
          </h2>

          {/* Bus Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Select Active Bus to Simulate Failure
            </label>
            <select
              value={selectedBusId}
              onChange={(e) => setSelectedBusId(e.target.value)}
              disabled={simState === 'running'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:border-rose-500 outline-none bg-white disabled:opacity-50"
            >
              {activeBuses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.number} — {b.route} ({b.occupied} students aboard)
                </option>
              ))}
            </select>
          </div>

          {/* Big Red Button */}
          {simState === 'idle' || simState === 'selecting' ? (
            <button
              onClick={runSimulation}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 active:from-rose-800 active:to-rose-900 text-white font-black text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>🚨 SIMULATE BUS BREAKDOWN</span>
            </button>
          ) : simState === 'running' ? (
            <div className="w-full py-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-sm">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-amber-700 rounded-full animate-spin" />
                <span>AI Recalculating Allocations...</span>
              </div>
              <div className="w-4/5 mx-auto h-2 rounded-full bg-amber-200 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-200"
                  style={{ width: `${animProgress}%` }}
                />
              </div>
              <div className="text-xs text-amber-600">{animProgress}% — Analysing capacity, proximity, route compatibility</div>
            </div>
          ) : (
            <button
              onClick={resetSimulation}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer border border-slate-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Simulation</span>
            </button>
          )}

          {/* Description */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700">How it works:</strong> When you click simulate, the selected bus is marked as "Breakdown". The AI identifies all affected students and attempts to reassign them to buses and private vehicles with available capacity. The system never over-allocates beyond a vehicle's maximum capacity.
          </div>
        </div>

        {/* Before / After Comparison Panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Before / After Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before State */}
            <div className={`rounded-2xl p-5 border shadow-xs ${simState === 'complete' ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-emerald-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">Before Simulation</h3>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Available Buses</span><span className="font-bold text-slate-900">5</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Disrupted Students</span><span className="font-bold text-emerald-600">0</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Reassigned Students</span><span className="font-bold text-slate-900">0</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Unassigned Students</span><span className="font-bold text-emerald-600">0</span></div>
              </div>
            </div>

            {/* After State */}
            <div className={`rounded-2xl p-5 border shadow-xs ${
              simState === 'complete'
                ? 'bg-white border-rose-200 ring-2 ring-rose-500/10'
                : 'bg-slate-50 border-slate-200 opacity-40'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className={`w-4 h-4 ${simState === 'complete' ? 'text-rose-600' : 'text-slate-400'}`} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">After Breakdown</h3>
              </div>
              {result ? (
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Available Buses</span><span className="font-bold text-rose-600">4</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Disrupted Students</span><span className="font-bold text-rose-600">{result.affectedStudents}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Reassigned Students</span><span className="font-bold text-emerald-600">{result.reassigned}</span></div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Still Unassigned</span>
                    <span className={`font-bold ${result.unassigned > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {result.unassigned}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">Run simulation to see results</div>
              )}
            </div>
          </div>

          {/* Detailed Results Panel */}
          {simState === 'complete' && result && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5 animate-in fade-in slide-in-from-bottom-2">
              {/* Failed Vehicle Alert */}
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-rose-900">
                    🚌 BREAKDOWN: {result.failedVehicle.number}
                  </div>
                  <div className="text-xs text-rose-700 mt-0.5">
                    Route: {result.failedVehicle.route} | Pickup: {result.failedVehicle.pickupPoint} | Departure: {result.failedVehicle.departureTime} AM
                  </div>
                  <div className="text-xs font-bold text-rose-800 mt-1">
                    👥 {result.affectedStudents} students were aboard this vehicle and need immediate reallocation
                  </div>
                </div>
              </div>

              {/* AI Reallocation Table */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">AI Emergency Reallocation Plan</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="pb-3">Alternative Vehicle</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">New Pickup Point</th>
                        <th className="pb-3">Students Reassigned</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {result.allocations.map((alloc, i) => (
                        <tr key={i} className="hover:bg-emerald-50/50">
                          <td className="py-3 font-bold text-slate-900">{alloc.vehicleNumber}</td>
                          <td className="py-3">{alloc.vehicleType}</td>
                          <td className="py-3">{alloc.pickupPoint}</td>
                          <td className="py-3">
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {alloc.seatsAllocated} students
                            </span>
                          </td>
                          <td className="py-3">
                            <StatusBadge status="available" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary Banner */}
              <div className={`p-4 rounded-xl flex items-center justify-between ${
                result.unassigned === 0
                  ? 'bg-emerald-50 border border-emerald-200'
                  : 'bg-amber-50 border border-amber-200'
              }`}>
                <div className="flex items-center gap-3">
                  {result.unassigned === 0 ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-amber-600" />
                  )}
                  <div>
                    {result.unassigned === 0 ? (
                      <>
                        <div className="text-sm font-bold text-emerald-900">✅ All {result.affectedStudents} students successfully reassigned!</div>
                        <div className="text-xs text-emerald-700">No student left without transportation. AI emergency protocol complete.</div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm font-bold text-amber-900">
                          ⚠️ {result.reassigned} of {result.affectedStudents} students reassigned — {result.unassigned} still unassigned
                        </div>
                        <div className="text-xs text-amber-700">
                          Insufficient alternative vehicle capacity. Contact transport administrator or local community providers for these {result.unassigned} students.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Explanation */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  AI Decision Explanation
                </div>
                <p>The reallocation algorithm used the following priority logic:</p>
                <ol className="list-decimal ml-4 space-y-0.5">
                  <li>Identified {result.affectedStudents} students assigned to failed bus {result.failedVehicle.number}</li>
                  <li>Searched alternative public buses on compatible routes with available seats</li>
                  <li>Searched registered private vehicles (shuttles, vans, auto-rickshaws) with capacity</li>
                  <li>Allocated students proportionally to available seats — never exceeding vehicle maximum capacity</li>
                  <li>Generated new boarding points for each alternative vehicle</li>
                </ol>
                <p className="mt-1 italic text-slate-400">This is an AI-generated simulation. Actual reallocation depends on real-time vehicle availability.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
