import { useNavigate, Link } from 'react-router-dom'
import { Bus, LogOut, Shield, User as UserIcon, AlertTriangle, Sparkles } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import type { UserRole } from '../../types'

export default function Navbar() {
  const { user, role, logout, switchDemoRole } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleRoleQuickSwitch = (newRole: UserRole) => {
    switchDemoRole(newRole)
    if (newRole === 'admin') navigate('/admin')
    else if (newRole === 'driver') navigate('/driver')
    else navigate('/student')
  }

  const roleBadgeColor = {
    student: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    admin: 'bg-blue-50 text-blue-700 border-blue-200',
    driver: 'bg-amber-50 text-amber-700 border-amber-200',
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Brand */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-slate-900">ROUTELESS AI</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Hackathon 2026
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-semibold">Rural Student Mobility</p>
          </div>
        </Link>
      </div>

      {/* Demo Switcher & User Profile */}
      <div className="flex items-center gap-3">
        {/* Instant Role Switching Bar for Judges / Testing */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Switch Role:
          </span>
          <button
            onClick={() => handleRoleQuickSwitch('student')}
            className={`px-2.5 py-1 rounded-lg font-medium text-xs transition ${
              role === 'student' ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => handleRoleQuickSwitch('admin')}
            className={`px-2.5 py-1 rounded-lg font-medium text-xs transition ${
              role === 'admin' ? 'bg-white shadow-xs text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handleRoleQuickSwitch('driver')}
            className={`px-2.5 py-1 rounded-lg font-medium text-xs transition ${
              role === 'driver' ? 'bg-white shadow-xs text-amber-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Driver
          </button>
        </div>

        {/* Emergency Simulator Quick Pill for Admin */}
        {role === 'admin' && (
          <Link
            to="/admin/emergency"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition animate-pulse"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulate Breakdown</span>
          </Link>
        )}

        {/* User Card */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center uppercase shadow-xs">
            {user?.full_name ? user.full_name.charAt(0) : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">{user?.full_name || 'User'}</div>
            <div className="flex items-center gap-1">
              <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border uppercase ${roleBadgeColor[role || 'student']}`}>
                {role || 'student'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
