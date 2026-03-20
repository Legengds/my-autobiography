import { BookMarked, LogOut } from 'lucide-react'
import { useAuth } from '../App'

export default function TopNav() {
  const { user, signOut } = useAuth()
  const handleSignOut = async () => {
    await signOut()
    window.location.hash = '/login'
  }
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #E8DFD0' }}>
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 16px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(139,115,85,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookMarked size={18} color="#8B7355" />
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#5C3D1E', margin: 0, fontFamily: 'serif' }}>我的自传</h1>
        </div>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: '#A8998A', display: 'none' }}>{user.email}</span>
            <button onClick={handleSignOut} title="退出登录" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A8998A', padding: 8, borderRadius: 8 }}>
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
