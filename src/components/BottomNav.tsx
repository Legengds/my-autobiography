import { BookOpen, PenLine, User } from 'lucide-react'

export default function BottomNav({ navigate }: { navigate: (to: string) => void }) {
  const path = window.location.hash.slice(1) || '/'
  const isActive = (p: string) => p === '/' ? path === '/' : path.startsWith(p)
  const navs = [
    { to: '/', icon: BookOpen, label: '首页' },
    { to: '/editor', icon: PenLine, label: '写自传' },
    { to: '/profile', icon: User, label: '我的' },
  ]
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E8DFD0', zIndex: 50, display: 'flex', justifyContent: 'space-around', height: 56, alignItems: 'center', paddingBottom: 'env(safe-area-inset-bottom,0)' }}
      className="md-hidden">
      {navs.map(({ to, icon: Icon, label }) => (
        <button key={to} onClick={() => navigate(to)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', color: isActive(to) ? '#8B7355' : '#A8998A', position: 'relative', height: '100%' }}>
          {isActive(to) && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 24, height: 3, background: '#8B7355', borderRadius: '0 0 3px 3px' }} />}
          <Icon size={22} strokeWidth={isActive(to) ? 2.5 : 2} />
          <span style={{ fontSize: 11, fontWeight: isActive(to) ? 600 : 400 }}>{label}</span>
        </button>
      ))}
    </nav>
  )
}
