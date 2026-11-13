import { NavLink } from 'react-router-dom'
import {
  Home,
  Search,
  Bus,
  Car,
  MapPin,
  Bot,
  User,
  LayoutDashboard,
  Users,
  Route as RouteIcon,
  TrendingUp,
  SlidersHorizontal,
  AlertTriangle,
  BarChart3,
  History,
  Navigation,
  CheckSquare,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Sidebar() {
  const { role: authRole } = useAuth()
  const role = authRole || 'student'
  const studentNav = [
    { label: 'Home Dashboard', path: '/student', icon: Home },
    { label: 'Search Routes', path: '/student/search', icon: Search },
    { label: 'Public Transport', path: '/student/public', icon: Bus },
    { label: 'Private Transport', path: '/student/private', icon: Car },
    { label: 'My Trips & Status', path: '/student/trips', icon: MapPin },
    { label: 'AI Assistant', path: '/student/assistant', icon: Bot },
    { label: 'Profile Settings', path: '/student/profile', icon: User },
  ]

  const adminNav = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Vehicles', path: '/admin/vehicles', icon: Bus },
    { label: 'Routes & Stops', path: '/admin/routes', icon: RouteIcon },
    { label: 'AI Demand Predictions', path: '/admin/predictions', icon: TrendingUp },
    { label: 'Route Optimization', path: '/admin/optimization', icon: SlidersHorizontal },
    { label: 'Emergency Simulation', path: '/admin/emergency', icon: AlertTriangle, highlight: true },
    { label: 'Analytics & Reports', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Activity Logs', path: '/admin/logs', icon: History },
  ]

  const driverNav = [
    { label: 'Driver Console', path: '/driver', icon: LayoutDashboard },
    { label: 'Assigned Route', path: '/driver/route', icon: Navigation },
    { label: 'Student Allocation', path: '/driver/allocation', icon: Users },
    { label: 'Vehicle Status', path: '/driver/vehicle', icon: CheckSquare },
    { label: 'Trip History', path: '/driver/history', icon: History },
    { label: 'Driver Profile', path: '/driver/profile', icon: User },
  ]

  const navItems = role === 'admin' ? adminNav : role === 'driver' ? driverNav : studentNav

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 flex-shrink-0">
      <div className="py-5 px-4 space-y-6">
        <div>
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            {role.toUpperCase()} PORTAL
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isEmergency = 'highlight' in item && !!(item as { highlight?: boolean }).highlight

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/student' || item.path === '/admin' || item.path === '/driver'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? isEmergency
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                          : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : isEmergency
                        ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isEmergency ? 'text-rose-400' : ''}`} />
                  <span className="truncate">{item.label}</span>
                  {isEmergency && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Network Status Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-200">Tamil Nadu Rural Grid</span>
        </div>
        <p className="text-[10px] text-slate-400">Virudhunagar &amp; Tirunelveli Division</p>
      </div>
    </aside>
  )
}
