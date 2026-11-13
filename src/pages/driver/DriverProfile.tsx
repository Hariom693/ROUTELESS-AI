import { User, Bus, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react'

export default function DriverProfile() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <User className="w-7 h-7 text-amber-600" />
        <span>Driver Profile</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-2xl font-black">MM</div>
            <div>
              <div className="text-lg font-black text-slate-900">M. Murugan</div>
              <div className="text-xs text-amber-600 font-semibold">Route Captain • Senior Driver</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 py-2 border-b border-slate-100"><Mail className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Email:</span><span className="font-bold ml-auto">driver@demo.com</span></div>
            <div className="flex items-center gap-2 py-2 border-b border-slate-100"><Phone className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Mobile:</span><span className="font-bold ml-auto">+91 98421 98765</span></div>
            <div className="flex items-center gap-2 py-2 border-b border-slate-100"><ShieldCheck className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">License:</span><span className="font-bold ml-auto">TN-DL-2018-1234567</span></div>
            <div className="flex items-center gap-2 py-2 border-b border-slate-100"><Bus className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Assigned Vehicle:</span><span className="font-bold ml-auto">TN 72 B 1234</span></div>
            <div className="flex items-center gap-2 py-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Base Depot:</span><span className="font-bold ml-auto">Kovilpatti Bus Depot</span></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Experience &amp; Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-slate-900">8</div>
              <div className="text-xs text-slate-500 font-medium">Years of Service</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-emerald-700">2,340</div>
              <div className="text-xs text-slate-500 font-medium">Total Trips</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-blue-700">96.5%</div>
              <div className="text-xs text-slate-500 font-medium">On-Time Rate</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-amber-700">4.8/5</div>
              <div className="text-xs text-slate-500 font-medium">Safety Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
