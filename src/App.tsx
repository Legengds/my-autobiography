import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import Home from './pages/Home'
import Reader from './pages/Reader'
import Editor from './pages/Editor'
import Profile from './pages/Profile'

// ── Auth Context ─────────────────────────────────────────────
interface AuthCtxType {
  session: Session | null
  user: User | null
  loading: boolean
  signIn: (e: string, p: string) => Promise<{ error: Error | null }>
  signUp: (e: string, p: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}
const AuthCtx = createContext<AuthCtxType>({ session: null, user: null, loading: true, signIn: async () => ({ error: null }), signUp: async () => ({ error: null }), signOut: async () => {} })
export const useAuth = () => useContext(AuthCtx)

function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
  }, [])

  // CRITICAL: listen for auth state changes so login/logout is detected
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  const value: AuthCtxType = {
    session, user: session?.user ?? null, loading,
    signIn: (e, p) => supabase.auth.signInWithPassword({ email: e, password: p }).then(r => ({ error: r.error })),
    signUp: (e, p) => supabase.auth.signUp({ email: e, password: p }).then(r => ({ error: r.error })),
    signOut: () => supabase.auth.signOut().then(() => setSession(null)),
  }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

// ── Toast Context ───────────────────────────────────────────
interface ToastMsg { id: string; type: 'success' | 'error' | 'info'; message: string }
const ToastCtx = createContext<{ toasts: ToastMsg[]; show: (t: ToastMsg['type'], m: string) => void }>({ toasts: [], show: () => {} })
export const useToast = () => useContext(ToastCtx)

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMsg[]>([])
  const show = useCallback((type: ToastMsg['type'], message: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])
  return (
    <ToastCtx.Provider value={{ toasts, show }}>
      {children}
      <div style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 384, padding: '0 16px', pointerEvents: 'none' }}>
        {toasts.map(t => (
          <div key={t.id} style={{ padding: '12px 16px', borderRadius: 12, background: t.type === 'success' ? '#f0fdf4' : t.type === 'error' ? '#fef2f2' : '#eff6ff', border: '1px solid', borderColor: t.type === 'success' ? '#bbf7d0' : t.type === 'error' ? '#fecaca' : '#bfdbfe', fontSize: 14, fontWeight: 500, color: t.type === 'success' ? '#166534' : t.type === 'error' ? '#991b1b' : '#1e40af', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

// ── Spinner ─────────────────────────────────────────────────
function FunctionSpinner() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F7F4' }}>
      <div style={{ width: 40, height: 40, border: '4px solid #E8DFD0', borderTopColor: '#8B7355', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ── Route Renderer ───────────────────────────────────────────
function RouteRenderer({ navigate }: { navigate: (to: string) => void }) {
  const { user, loading } = useAuth()
  const path = window.location.hash.slice(1) || '/'
  const normalized = path.replace(/\/$/, '') || '/'

  if (loading) return <FunctionSpinner />

  // Not logged in
  if (!user) {
    if (normalized !== '/login') window.location.hash = '/login'
    return normalized === '/login' ? <Login navigate={navigate} /> : null
  }

  // Logged in — route to page
  if (normalized === '/login' || normalized === '/') return <Home navigate={navigate} />
  if (normalized.startsWith('/reader/')) return <Reader id={normalized.split('/reader/')[1]} navigate={navigate} />
  if (normalized === '/editor') return <Editor navigate={navigate} />
  if (normalized.startsWith('/editor/')) return <Editor id={normalized.split('/editor/')[1]} navigate={navigate} />
  if (normalized === '/profile') return <Profile navigate={navigate} />

  // Fallback
  window.location.hash = '/'
  return <Home navigate={navigate} />
}

// ── Main App ────────────────────────────────────────────────
export default function App() {
  const navigate = useCallback((to: string) => { window.location.hash = to }, [])

  // Listen for hash changes
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const onHashChange = () => setTick(t => t + 1)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Listen for Supabase auth changes (forces re-render)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setTick(t => t + 1)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthProvider>
      <ToastProvider>
        {/* key forces re-render on auth/navigation changes */}
        <RouteRenderer key={tick} navigate={navigate} />
      </ToastProvider>
    </AuthProvider>
  )
}
