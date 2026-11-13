import { useState } from 'react'
import { MapPin, Clock, Bus, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import StatusBadge from '../../components/common/StatusBadge'

export default function MyTrips() {
  const [tab, setTab] = useState<'active' | 'history'>('active')

  const sampleTrips = [
    {
      id: 'trip-101',
      date: 'Today, 13 Nov 2026',
      route: 'Kovilpatti → Govt Arts College Sivakasi',
      vehicle: 'TN 72 B 1234 (Govt Bus)',
      pickupPoint: 'Kovilpatti Bus Stand',
      departureTime: '07:30 AM',
      expectedArrival: '08:25 AM',
      duration: '55 mins',
      distance: '28.5 km',
      traffic: 'low',
      status: 'in_transit',
      seatNumber: 'Seat #14 (Reserved)',
    },
    {
      id: 'trip-102',
      date: 'Tomorrow, 14 Nov 2026',
      route: 'Kovilpatti → Govt Arts College Sivakasi',
      vehicle: 'TN 72 B 1234 (Govt Bus)',
      pickupPoint: 'Kovilpatti Bus Stand',
      departureTime: '07:30 AM',
      expectedArrival: '08:25 AM',
      duration: '55 mins',
      distance: '28.5 km',
      traffic: 'low',
      status: 'scheduled',
      seatNumber: 'Seat #12 (Scheduled)',
    },
    {
      id: 'trip-098',
      date: 'Yesterday, 12 Nov 2026',
      route: 'Sivakasi → Kovilpatti',
      vehicle: 'TN 72 B 1234 (Govt Bus)',
      pickupPoint: 'Govt Arts College Gate',
      departureTime: '04:15 PM',
      expectedArrival: '05:10 PM',
      duration: '55 mins',
      distance: '28.5 km',
      traffic: 'low',
      status: 'completed',
      seatNumber: 'Seat #09',
    },
    {
      id: 'trip-095',
      date: '10 Nov 2026',
      route: 'Virudhunagar → Sivakasi',
      vehicle: 'TN 72 C 3456 (Govt Bus)',
      pickupPoint: 'Virudhunagar Stand',
      departureTime: '07:45 AM',
      expectedArrival: '08:45 AM',
      duration: '60 mins',
      distance: '20.0 km',
      traffic: 'high',
      status: 'delayed',
      seatNumber: 'Seat #22',
    },
    {
      id: 'trip-090',
      date: '08 Nov 2026',
      route: 'Kovilpatti → Tirunelveli',
      vehicle: 'TN 58 B 7890 (Govt Bus)',
      pickupPoint: 'Kovilpatti New Stand',
      departureTime: '08:00 AM',
      expectedArrival: '09:50 AM',
      duration: '110 mins',
      distance: '72.0 km',
      traffic: 'medium',
      status: 'completed',
      seatNumber: 'Seat #31',
    },
  ]

  const displayedTrips = tab === 'active'
    ? sampleTrips.filter((t) => t.status === 'in_transit' || t.status === 'scheduled' || t.status === 'delayed')
    : sampleTrips.filter((t) => t.status === 'completed' || t.status === 'cancelled')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Student Trips &amp; Live Journey Status</h1>
          <p className="text-xs text-slate-500 mt-1">Track your daily college commute and review your allocated seats</p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs">
          <button
            onClick={() => setTab('active')}
            className={`px-4 py-1.5 rounded-lg font-bold transition ${
              tab === 'active' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active &amp; Upcoming
          </button>
          <button
            onClick={() => setTab('history')}
            className={`px-4 py-1.5 rounded-lg font-bold transition ${
              tab === 'history' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past Trips
          </button>
        </div>
      </div>

      {/* Trips Cards */}
      <div className="space-y-4">
        {displayedTrips.map((trip) => {
          const isInTransit = trip.status === 'in_transit'

          return (
            <div
              key={trip.id}
              className={`bg-white rounded-2xl p-6 border shadow-xs transition ${
                isInTransit ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-slate-200/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">{trip.date}</span>
                    <StatusBadge status={trip.status} />
                    {isInTransit && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Live in motion
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{trip.route}</h3>
                  <div className="text-xs text-slate-600 font-medium">Assigned: {trip.vehicle}</div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg inline-block">
                    {trip.seatNumber}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Free Student Pass Verified</div>
                </div>
              </div>

              {/* Timing & Boarding Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5 font-medium">Boarding Point</span>
                  <strong className="text-slate-900">{trip.pickupPoint}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5 font-medium">Departure Time</span>
                  <strong className="text-slate-900">{trip.departureTime}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5 font-medium">Expected Arrival</span>
                  <strong className="text-slate-900">{trip.expectedArrival}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5 font-medium">Distance &amp; Traffic</span>
                  <strong className="text-slate-900">{trip.distance} ({trip.duration})</strong>
                </div>
              </div>

              {/* Progress Indicator if In Transit */}
              {isInTransit && (
                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Journey Progress</span>
                    <span className="text-emerald-700">~18 mins remaining to destination</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-2/3 animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
