import { Car, Clock, MapPin, IndianRupee, ShieldCheck } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'
import { PRIVATE_VEHICLES } from '../../lib/constants'

export default function PrivateTransport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Car className="w-7 h-7 text-blue-600" />
          <span>Private &amp; Community Mobility Fleet</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Registered rural auto-rickshaws, shared vans, and chartered college shuttles to bridge the last mile
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PRIVATE_VEHICLES.map((vehicle) => {
          const fillPercentage = Math.round((vehicle.occupied / vehicle.capacity) * 100)

          return (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-slate-900">{vehicle.type}</span>
                    <div className="text-[11px] text-slate-400 font-medium">{vehicle.number}</div>
                  </div>
                  <StatusBadge status={vehicle.status} />
                </div>

                <div className="space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pickup Point: <strong className="text-slate-800">{vehicle.pickupPoint}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Subsidized Fare: <strong className="text-slate-900">₹{vehicle.cost} / trip</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-blue-700 font-semibold">Police &amp; RTO Verified Driver</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Seats Occupied</span>
                    <span className="font-bold text-slate-800">
                      {vehicle.occupied} / {vehicle.capacity} seats ({fillPercentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                  <div className="mt-1 text-right text-[10px] font-semibold text-blue-600">
                    {vehicle.available} seats ready for pickup
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Auto-dispatchable on breakdown</span>
                <button className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition">
                  Request Ride
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
