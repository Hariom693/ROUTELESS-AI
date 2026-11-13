import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { User, UserRole } from '../types'

interface AuthContextType {
  user: User | null
  role: UserRole | null
  loading: boolean
  login: (email: string, password: string, explicitRole?: UserRole) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string, role: UserRole, village?: string) => Promise<void>
  switchDemoRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USERS: Record<UserRole, User> = {
  student: {
    id: 'demo-student-uuid-0001',
    full_name: 'Priya Sundaram',
    email: 'student@demo.com',
    phone: '+91 98765 43210',
    role: 'student',
    village: 'Kovilpatti',
    created_at: '2026-11-01T08:00:00Z',
    last_login_at: new Date().toISOString(),
  },
  admin: {
    id: 'demo-admin-uuid-0001',
    full_name: 'K. Rajasekaran (Transport Officer)',
    email: 'admin@demo.com',
    phone: '+91 94431 12345',
    role: 'admin',
    village: 'Virudhunagar HQ',
    created_at: '2026-10-15T09:30:00Z',
    last_login_at: new Date().toISOString(),
  },
  driver: {
    id: 'demo-driver-uuid-0001',
    full_name: 'M. Murugan (Route Captain)',
    email: 'driver@demo.com',
    phone: '+91 98421 98765',
    role: 'driver',
    village: 'Kovilpatti Bus Depot',
    created_at: '2026-10-20T06:00:00Z',
    last_login_at: new Date().toISOString(),
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('routeless_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
    return null
  })
  const [role, setRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem('routeless_role') as UserRole) || null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If we already have a saved local user, keep it
    if (user && role) {
      setLoading(false)
      return
    }

    // Try Supabase auth session if available
    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          Promise.resolve(
            supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()
          ).then(({ data }) => {
              if (data) {
                setUser(data as unknown as User)
                setRole((data as unknown as User).role)
                localStorage.setItem('routeless_user', JSON.stringify(data))
                localStorage.setItem('routeless_role', (data as unknown as User).role)
              }
            })
            .catch(() => {
              // fallback gracefully
            })
        }
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data } = await supabase.from('users').select('*').eq('id', session.user.id).single()
          if (data) {
            setUser(data)
            setRole(data.role)
            localStorage.setItem('routeless_user', JSON.stringify(data))
            localStorage.setItem('routeless_role', data.role)
          }
        }
      })

      return () => subscription.unsubscribe()
    } catch {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, _password: string, explicitRole?: UserRole) => {
    // Check if this matches a demo user or fallback mode
    const normEmail = email.toLowerCase().trim()
    let matchedRole: UserRole = explicitRole || 'student'

    if (normEmail.includes('admin')) {
      matchedRole = 'admin'
    } else if (normEmail.includes('driver')) {
      matchedRole = 'driver'
    } else if (normEmail.includes('student')) {
      matchedRole = 'student'
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: _password })
      if (!error && data?.user) {
        const { data: profile } = await supabase.from('users').select('*').eq('id', data.user.id).single()
        if (profile) {
          setUser(profile)
          setRole(profile.role)
          localStorage.setItem('routeless_user', JSON.stringify(profile))
          localStorage.setItem('routeless_role', profile.role)
          return
        }
      }
    } catch {
      // Supabase is offline or using placeholder keys, fall through to demo session
    }

    // Demo/Simulated session for seamless demonstration
    const demoUser: User = {
      ...DEMO_USERS[matchedRole],
      email: email || DEMO_USERS[matchedRole].email,
      last_login_at: new Date().toISOString(),
    }
    setUser(demoUser)
    setRole(matchedRole)
    localStorage.setItem('routeless_user', JSON.stringify(demoUser))
    localStorage.setItem('routeless_role', matchedRole)
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch {
      // Ignore network errors on logout
    }
    setUser(null)
    setRole(null)
    localStorage.removeItem('routeless_user')
    localStorage.removeItem('routeless_role')
  }

  const register = async (email: string, _password: string, name: string, userRole: UserRole, village?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password: _password })
      if (!error && data.user) {
        const newUser: User = {
          id: data.user.id,
          full_name: name,
          email,
          role: userRole,
          village: village || 'Kovilpatti',
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
        }
        await supabase.from('users').insert(newUser)
        setUser(newUser)
        setRole(userRole)
        localStorage.setItem('routeless_user', JSON.stringify(newUser))
        localStorage.setItem('routeless_role', userRole)
        return
      }
    } catch {
      // Fallback to local session
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      full_name: name,
      email,
      role: userRole,
      village: village || 'Kovilpatti',
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
    }
    setUser(newUser)
    setRole(userRole)
    localStorage.setItem('routeless_user', JSON.stringify(newUser))
    localStorage.setItem('routeless_role', userRole)
  }

  const switchDemoRole = (newRole: UserRole) => {
    const u = DEMO_USERS[newRole]
    setUser(u)
    setRole(newRole)
    localStorage.setItem('routeless_user', JSON.stringify(u))
    localStorage.setItem('routeless_role', newRole)
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, register, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
