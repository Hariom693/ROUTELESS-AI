import { Navigation, MapPin, Clock, AlertTriangle } from 'lucide-react'
import TransportMap from '../../components/map/TransportMap'

export default function AssignedRoute() {
  const stops = [
    { order: 1, name: 'Kovilpatti Bus Stand', eta: '07:30 AM', lat: 9.1727, lng: 77.8692 },
    { order: 2, name: 'Ettayapuram Junction', eta: '07:45 AM', lat: 9.25, lng: 77.88 },
    { order: 3, name: 'Sivakasi Main Stand', eta: '08:25 AM', lat: 9.4529, lng: 77.7961 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
        <Navigation className="w-7 h-7 text-emerald-600" />
        <span>Assigned Route Details</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransportMap height="450px" animated={true} selectedVehicleId="b1" />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Route Information</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Source</span><span className="font-bold">Kovilpatti</span></div>
              <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Destination</span><span className="font-bold">Sivakasi</span></div>
              <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Total Distance</span><span className="font-bold">28.5 km</span></div>
              <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-500">Est. Duration</span><span className="font-bold">55 min</span></div>
              <div className="flex justify-between py-2"><span className="text-slate-500">Number of Stops</span><span className="font-bold">3</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" />Stops Schedule</h2>
            <div className="space-y-2">
              {stops.map((s) => (
                <div key={s.order} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">{s.order}</span>
                  <div>
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-slate-500">ETA: {s.eta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <h2 className="text-sm font-bold text-slate-900">Traffic Segments</h2>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs flex items-center justify-between">
              <span className="text-slate-700">Kovilpatti → Ettayapuram</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Clear</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs flex items-center justify-between">
              <span className="text-slate-700">Ettayapuram → Sivakasi</span>
              <span className="font-bold text-amber-700 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate (+15 min)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
