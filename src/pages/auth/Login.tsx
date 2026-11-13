import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Bus, Eye, EyeOff, ShieldAlert, Sparkles, Navigation, Users, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import type { UserRole } from '../../types'

export default function Login() {
  const [email, setEmail] = useState('student@demo.com')
  const [password, setPassword] = useState('demo1234')
  const [role, setRole] = useState<UserRole>('student')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleRoleTabChange = (newRole: UserRole) => {
    setRole(newRole)
    if (newRole === 'student') {
      setEmail('student@demo.com')
      setPassword('demo1234')
    } else if (newRole === 'admin') {
      setEmail('admin@demo.com')
      setPassword('demo1234')
    } else if (newRole === 'driver') {
      setEmail('driver@demo.com')
      setPassword('demo1234')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password, role)
      if (role === 'admin') navigate('/admin')
      else if (role === 'driver') navigate('/driver')
      else navigate('/student')
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Hero Panel */}
      <div className="md:w-5/12 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
              <Bus className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">ROUTELESS AI</h1>
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">The Last Mile</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-Powered Rural Student Transportation</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight text-white mb-4">
            No Student Left Behind Due to Broken Transits.
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Empowering village communities with predictive demand allocation, emergency vehicle breakdown rerouting, and real-time multi-modal connectivity to educational institutions.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span>AI Emergency Reallocation for Bus Breakdowns</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span>Unified Public & Private Rural Mobility Network</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span>Live Animated Tracking & Capacity Balancing</span>
            </div>
          </div>
        </div>

        {/* Live Metrics preview */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-white">487</div>
            <div className="text-xs text-slate-400">Rural Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">8</div>
            <div className="text-xs text-slate-400">Active Routes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">98.4%</div>
            <div className="text-xs text-slate-400">Transit Reliability</div>
          </div>
        </div>
      </div>

      {/* Right Login Card */}
      <div className="md:w-7/12 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Sign in to ROUTELESS AI</h2>
            <p className="text-sm text-slate-500 mt-1">Select your access role to load your specialized console</p>
          </div>

          {/* Role selector tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => handleRoleTabChange('student')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'student'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'admin'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('driver')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                role === 'driver'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              Driver
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-slate-400">Demo: demo1234</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 mb-2">Instant Demo Quick-Switch:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleTabChange('student')}
                className="p-2 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-lg text-left transition"
              >
                <div className="font-bold text-[11px] text-slate-800">Student</div>
                <div className="text-[10px] text-slate-500 truncate">Priya Sundaram</div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleTabChange('admin')}
                className="p-2 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-lg text-left transition"
              >
                <div className="font-bold text-[11px] text-slate-800">Admin</div>
                <div className="text-[10px] text-slate-500 truncate">K. Rajasekaran</div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleTabChange('driver')}
                className="p-2 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 border border-slate-200 rounded-lg text-left transition"
              >
                <div className="font-bold text-[11px] text-slate-800">Driver</div>
                <div className="text-[10px] text-slate-500 truncate">M. Murugan</div>
              </button>
            </div>

            <div className="mt-4 text-center text-xs text-slate-500">
              New rural student?{' '}
              <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">
                Register Student Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
