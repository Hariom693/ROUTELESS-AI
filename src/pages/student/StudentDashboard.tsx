import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Bus,
  Car,
  Search,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import TransportMap from '../../components/map/TransportMap'
import { VILLAGES, COLLEGES, SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

export default function StudentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [fromVillage, setFromVillage] = useState(VILLAGES[0].name)
  const [toCollege, setToCollege] = useState(COLLEGES[0].name)
  const [travelDate, setTravelDate] = useState('2026-11-14')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/student/search?from=${encodeURIComponent(fromVillage)}&to=${encodeURIComponent(toCollege)}&date=${travelDate}`)
  }

  const totalPublicSeats = SAMPLE_BUSES.reduce((acc, b) => acc + b.available, 0)
  const totalPrivateSeats = PRIVATE_VEHICLES.reduce((acc, p) => acc + p.available, 0)

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Commuter Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Vanakkam, {user?.full_name || 'Student'}! 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Connected from <span className="text-emerald-400 font-bold">{user?.village || 'Kovilpatti'}</span>. AI guarantees alternative transportation if your scheduled government bus is disrupted.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-xs">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-slate-300">Next Peak Transit Window</div>
              <div className="font-bold text-white text-sm">07:00 AM – 08:30 AM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Available Govt Buses"
          value={SAMPLE_BUSES.filter((b) => b.status === 'available').length}
          icon={<Bus className="w-5 h-5" />}
          change="4 of 5 Active"
          changeType="positive"
          color="green"
        />
        <StatCard
          title="Private & Shared"
          value={PRIVATE_VEHICLES.length}
          icon={<Car className="w-5 h-5" />}
          change="19 Seats Avail"
          changeType="neutral"
          color="blue"
        />
        <StatCard
          title="Total Free Seats"
          value={totalPublicSeats + totalPrivateSeats}
          icon={<TrendingUp className="w-5 h-5" />}
          change="Real-time"
          changeType="positive"
          color="purple"
        />
        <StatCard
          title="Reliability Index"
          value="98.4%"
          icon={<ShieldCheck className="w-5 h-5" />}
          change="+1.2% this week"
          changeType="positive"
          color="navy"
        />
      </div>

      {/* Quick Search Widget Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">Find Tomorrow's Bus or Alternative Rides</h2>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Pickup Village
            </label>
            <select
              value={fromVillage}
              onChange={(e) => setFromVillage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white"
            >
              {VILLAGES.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Destination College
            </label>
            <select
              value={toCollege}
              onChange={(e) => setToCollege(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white"
            >
              {COLLEGES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Travel Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Search Transits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Live Map & Traffic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Live Village-to-College Mobility Map</span>
            </h2>
            <span className="text-xs text-slate-500">Auto-updating every 1.5s</span>
          </div>
          <TransportMap height="420px" animated={true} />
        </div>

        {/* Right Traffic & Quick Alternative Panel */}
        <div className="space-y-4">
          {/* Traffic Monitor Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Corridor Traffic
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Kovilpatti → Sivakasi</div>
                  <div className="text-[11px] text-emerald-700 font-medium">Clear • 55 min trip</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Sankarankovil → Sivakasi</div>
                  <div className="text-[11px] text-amber-700 font-medium">Moderate • +15 min delay</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              </div>

              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Virudhunagar → Sivakasi</div>
                  <div className="text-[11px] text-rose-700 font-medium">Heavy Congestion • +25 min delay</div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* AI Alternative Suggestion Banner */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span className="text-xs font-bold tracking-wide uppercase text-emerald-100">AI Last-Mile Guarantee</span>
            </div>
            <p className="text-xs leading-relaxed text-emerald-50">
              If bus <span className="font-bold underline">TN 72 C 3456</span> fills up at Virudhunagar, 3 verified shared auto-rickshaws are standby-assigned automatically.
            </p>
            <Link
              to="/student/private"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white underline hover:text-emerald-100 mt-2"
            >
              <span>Explore private alternatives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Available Buses Summary Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Next Scheduled Departures from Your Region</h2>
            <p className="text-xs text-slate-500">Government buses operating with reserved student capacity</p>
          </div>
          <Link
            to="/student/public"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View all public buses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3">Bus Number</th>
                <th className="pb-3">Route</th>
                <th className="pb-3">Departure</th>
                <th className="pb-3">Pickup Point</th>
                <th className="pb-3">Seat Availability</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {SAMPLE_BUSES.slice(0, 4).map((bus) => (
                <tr key={bus.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-slate-900">{bus.number}</td>
                  <td className="py-3">{bus.route}</td>
                  <td className="py-3 font-semibold text-emerald-700">{bus.departureTime} AM</td>
                  <td className="py-3 text-slate-500">{bus.pickupPoint}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{bus.available} seats</span>
                      <span className="text-slate-400">/ {bus.capacity}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <StatusBadge status={bus.status} />
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to={`/student/search?from=Kovilpatti&to=Sivakasi`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-xs transition"
                    >
                      Book Seat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
