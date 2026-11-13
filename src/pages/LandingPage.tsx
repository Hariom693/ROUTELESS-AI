import { Link } from 'react-router-dom'
import {
  Bus,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Navigation,
  AlertTriangle,
  Bot,
  BarChart3,
  Clock,
  CheckCircle,
  ChevronRight,
} from 'lucide-react'

const FEATURES = [
  { icon: MapPin, title: 'Smart Route Search', desc: 'Find buses between any village and college with real-time seat availability and traffic info.', color: 'emerald' },
  { icon: Sparkles, title: 'AI Demand Prediction', desc: 'Machine learning forecasts student demand, identifies shortages, and recommends additional vehicles.', color: 'purple' },
  { icon: AlertTriangle, title: 'Emergency Simulation', desc: 'Simulate bus breakdowns and watch AI reallocate students to alternative vehicles instantly.', color: 'rose' },
  { icon: Navigation, title: 'Live Vehicle Tracking', desc: 'Animated vehicle markers on an interactive map showing real-time positions across rural routes.', color: 'blue' },
  { icon: Bot, title: 'AI Chatbot Assistant', desc: 'Ask about buses, seats, routes, or traffic. Get instant answers from our AI-powered assistant.', color: 'amber' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Real-time stats, charts, and reports for administrators to monitor the entire transport network.', color: 'cyan' },
]

const STATS = [
  { value: '487+', label: 'Students Connected' },
  { value: '8', label: 'Active Routes' },
  { value: '8', label: 'Vehicles Tracked' },
  { value: '5', label: 'Rural Villages' },
]

const ROLES = [
  { role: 'Student', desc: 'Search routes, check buses, track vehicles, and chat with AI assistant.', color: 'emerald', path: '/login' },
  { role: 'Admin', desc: 'Monitor fleet, predict demand, simulate emergencies, view analytics.', color: 'blue', path: '/login' },
  { role: 'Driver', desc: 'View assigned routes, manage trips, update vehicle status.', color: 'amber', path: '/login' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight text-slate-900">ROUTELESS AI</div>
              <div className="text-[9px] uppercase tracking-widest text-emerald-600 font-semibold">The Last Mile</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition px-3 py-2">
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/30 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.15),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Hackathon 2026 — AI-Powered Rural Mobility
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              No Student Left Behind.
              <span className="block text-emerald-400 mt-2">No Journey Without a Solution.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              ROUTELESS AI is an intelligent rural transportation management system that predicts demand,
              optimizes available resources, and finds alternative transportation when regular services fail.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition hover:scale-[1.02]"
              >
                Launch Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-slate-900">{s.value}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The Rural Student Mobility Crisis
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Millions of rural students depend on limited government buses that are overcrowded, unreliable,
            and frequently cancelled. When a bus breaks down, students have no information about alternatives.
            There is no unified platform to solve this — until now.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            'Limited bus availability',
            'Overcrowded buses',
            'Unexpected breakdowns',
            'No alternative info',
            'Poor rural connectivity',
            'No intelligent planning',
          ].map((problem, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs font-medium text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
              {problem}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Powered by AI. Built for Villages.
            </h2>
            <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
              Six core modules working together to ensure no rural student is left without transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              const colorClasses: Record<string, string> = {
                emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
                purple: 'bg-purple-100 text-purple-600 border-purple-200',
                rose: 'bg-rose-100 text-rose-600 border-rose-200',
                blue: 'bg-blue-100 text-blue-600 border-blue-200',
                amber: 'bg-amber-100 text-amber-600 border-amber-200',
                cyan: 'bg-cyan-100 text-cyan-600 border-cyan-200',
              }
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorClasses[f.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">How ROUTELESS AI Works</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { step: '01', title: 'Student Searches for a Route', desc: 'Enter source village and destination college. The system instantly shows all available buses and private vehicles.' },
            { step: '02', title: 'AI Predicts Demand & Optimizes', desc: 'Machine learning analyzes historical patterns to predict shortages and intelligently allocate students to vehicles.' },
            { step: '03', title: 'Emergency? AI Reallocates', desc: 'When a bus breaks down, the system automatically finds alternative vehicles and reassigns affected students.' },
            { step: '04', title: 'Track & Travel', desc: 'Students track their vehicle on an interactive map, see estimated arrival time, and get AI chatbot assistance.' },
          ].map((s, i) => (
            <div key={i} className="flex gap-5 items-start p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                {s.step}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Three User Roles */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Three Portals. One Platform.</h2>
            <p className="mt-3 text-sm text-slate-400">Role-based dashboards for students, administrators, and drivers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ROLES.map((r, i) => {
              const borderColors: Record<string, string> = {
                emerald: 'border-emerald-500/30 hover:border-emerald-500/60',
                blue: 'border-blue-500/30 hover:border-blue-500/60',
                amber: 'border-amber-500/30 hover:border-amber-500/60',
              }
              const badgeColors: Record<string, string> = {
                emerald: 'bg-emerald-500/20 text-emerald-400',
                blue: 'bg-blue-500/20 text-blue-400',
                amber: 'bg-amber-500/20 text-amber-400',
              }
              return (
                <Link
                  key={i}
                  to={r.path}
                  className={`block p-6 rounded-2xl bg-slate-800/50 border transition ${borderColors[r.color]}`}
                >
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${badgeColors[r.color]}`}>
                    {r.role}
                  </span>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">{r.desc}</p>
                  <div className="mt-4 text-xs font-bold text-emerald-400 flex items-center gap-1">
                    Try {r.role} Portal <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Scenario Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Live Scenario Demos</h2>
          <p className="mt-3 text-sm text-slate-500">See how ROUTELESS AI handles real-world transportation challenges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
              <Zap className="w-4 h-4" />
              High Demand Shortage
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              AI predicts 120 students need transport but only 90 seats exist. The dashboard highlights
              the 30-student shortage and recommends deploying private vehicles.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2">
              <AlertTriangle className="w-4 h-4" />
              Bus Breakdown Emergency
            </div>
            <p className="text-xs text-rose-700 leading-relaxed">
              Admin clicks "Simulate Breakdown" → bus goes offline → AI instantly reallocates 32
              affected students to 2 alternative vehicles within seconds.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-sm mb-2">
              <MapPin className="w-4 h-4" />
              No Transport? AI Finds One
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              When no direct bus exists, the system suggests shared auto-rickshaws, community vans,
              and multi-stage shuttle connections via hub points.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <Bot className="w-4 h-4" />
              AI Chatbot Assistance
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Ask "What buses go to Sivakasi?" or "Check traffic" and the chatbot responds instantly
              with live transport data, seat counts, and route options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Every student deserves a reliable way to reach education.
          </h2>
          <p className="mt-3 text-sm text-emerald-100 max-w-xl mx-auto">
            Regardless of where they live. ROUTELESS AI bridges the last mile.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-emerald-700 font-bold text-sm shadow-lg transition hover:scale-[1.02]"
          >
            Launch ROUTELESS AI <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Bus className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">ROUTELESS AI — The Last Mile</div>
                <div className="text-[10px] text-slate-500">Hackathon 2026 | AI-Powered Rural Mobility</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              Virudhunagar & Tirunelveli Division, Tamil Nadu, India
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

