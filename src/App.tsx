import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { ReactNode } from 'react'

// Auth pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import LandingPage from './pages/LandingPage'

// Student pages
import StudentDashboard from './pages/student/StudentDashboard'
import SearchRoutes from './pages/student/SearchRoutes'
import PublicTransport from './pages/student/PublicTransport'
import PrivateTransport from './pages/student/PrivateTransport'
import MyTrips from './pages/student/MyTrips'
import AIAssistant from './pages/student/AIAssistant'
import Profile from './pages/student/Profile'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import Students from './pages/admin/Students'
import Vehicles from './pages/admin/Vehicles'
import AdminRoutes from './pages/admin/Routes'
import AIPredictions from './pages/admin/AIPredictions'
import RouteOptimization from './pages/admin/RouteOptimization'
import EmergencySimulation from './pages/admin/EmergencySimulation'
import Analytics from './pages/admin/Analytics'
import ActivityLogs from './pages/admin/ActivityLogs'

// Driver pages
import DriverDashboard from './pages/driver/DriverDashboard'
import AssignedRoute from './pages/driver/AssignedRoute'
import StudentAllocation from './pages/driver/StudentAllocation'
import VehicleStatus from './pages/driver/VehicleStatus'
import TripHistory from './pages/driver/TripHistory'
import DriverProfile from './pages/driver/DriverProfile'

// Common components
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import LoadingSpinner from './components/common/LoadingSpinner'
import ChatbotWidget from './components/chatbot/ChatbotWidget'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRole: string
}

function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  if (role !== allowedRole) return <Navigate to="/login" replace />
  return <>{children}</>
}

function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <ChatbotWidget />
    </div>
  )
}

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <ChatbotWidget />
    </div>
  )
}

function DriverLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <ChatbotWidget />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout><StudentDashboard /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/search" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout><SearchRoutes /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/public" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout><PublicTransport /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/private" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout><PrivateTransport /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/trips" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout><MyTrips /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/assistant" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout><AIAssistant /></StudentLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/profile" element={
        <ProtectedRoute allowedRole="student">
          <StudentLayout><Profile /></StudentLayout>
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><AdminDashboard /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/students" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><Students /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/vehicles" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><Vehicles /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/routes" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><AdminRoutes /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/predictions" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><AIPredictions /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/optimization" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><RouteOptimization /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/emergency" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><EmergencySimulation /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><Analytics /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/logs" element={
        <ProtectedRoute allowedRole="admin">
          <AdminLayout><ActivityLogs /></AdminLayout>
        </ProtectedRoute>
      } />

      {/* Driver routes */}
      <Route path="/driver" element={
        <ProtectedRoute allowedRole="driver">
          <DriverLayout><DriverDashboard /></DriverLayout>
        </ProtectedRoute>
      } />
      <Route path="/driver/route" element={
        <ProtectedRoute allowedRole="driver">
          <DriverLayout><AssignedRoute /></DriverLayout>
        </ProtectedRoute>
      } />
      <Route path="/driver/allocation" element={
        <ProtectedRoute allowedRole="driver">
          <DriverLayout><StudentAllocation /></DriverLayout>
        </ProtectedRoute>
      } />
      <Route path="/driver/vehicle" element={
        <ProtectedRoute allowedRole="driver">
          <DriverLayout><VehicleStatus /></DriverLayout>
        </ProtectedRoute>
      } />
      <Route path="/driver/history" element={
        <ProtectedRoute allowedRole="driver">
          <DriverLayout><TripHistory /></DriverLayout>
        </ProtectedRoute>
      } />
      <Route path="/driver/profile" element={
        <ProtectedRoute allowedRole="driver">
          <DriverLayout><DriverProfile /></DriverLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

