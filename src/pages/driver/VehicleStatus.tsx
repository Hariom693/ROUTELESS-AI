import { useState } from 'react'
import { Bus, CheckCircle, AlertTriangle, Fuel, Wrench, Send } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'

export default function VehicleStatus() {
  const [currentStatus, setCurrentStatus] = useState('available')
  const [issueType, setIssueType] = useState('mechanical')
  const [issueDesc, setIssueDesc] = useState('')
  const [issueSubmitted, setIssueSubmitted] = useState(false)

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault()
    setIssueSubmitted(true)
    setTimeout(() => setIssueSubmitted(false), 4000)
    setIssueDesc('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <Bus className="w-7 h-7 text-emerald-600" />
        <span>Vehicle Status &amp; Maintenance</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Vehicle Information</h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Number</span><span className="font-bold">TN 72 B 1234</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Type</span><span className="font-bold">Government Bus</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Capacity</span><span className="font-bold">50 seats</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Route</span><span className="font-bold">Kovilpatti → Sivakasi</span></div>
            <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Last Maintenance</span><span className="font-bold">05 Nov 2026</span></div>
            <div className="flex justify-between py-2"><span className="text-slate-500">Status</span><StatusBadge status={currentStatus} /></div>
          </div>

          {/* Fuel Gauge */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 flex items-center gap-1"><Fuel className="w-3.5 h-3.5" /> Fuel Level</span>
              <span className="font-bold text-emerald-700">75%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          {/* Status Update */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <h3 className="text-xs font-bold text-slate-700">Update Vehicle Availability</h3>
            <div className="flex flex-wrap gap-2">
              {['available', 'full', 'unavailable'].map((s) => (
                <button key={s} onClick={() => setCurrentStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  currentStatus === s ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Issue */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-600" />
            Report Vehicle Issue
          </h2>

          {issueSubmitted && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4" /> Issue reported to admin successfully! Reference: #ISS-2026-1113
            </div>
          )}

          <form onSubmit={handleSubmitIssue} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Issue Type</label>
              <select value={issueType} onChange={(e) => setIssueType(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium outline-none bg-white">
                <option value="mechanical">Mechanical Issue</option>
                <option value="breakdown">Full Breakdown</option>
                <option value="fuel">Fuel / Battery Issue</option>
                <option value="tyre">Tyre / Wheel Problem</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
              <textarea value={issueDesc} onChange={(e) => setIssueDesc(e.target.value)} rows={3} placeholder="Describe the issue..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Urgency</label>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs border border-amber-200">Medium (default)</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200 cursor-pointer hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition">High/Emergency</span>
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer">
              <Send className="w-4 h-4" /> Submit Issue Report
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
