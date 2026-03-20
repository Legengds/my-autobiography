import { useState } from 'react'
import { useAuth } from '../App'
import TopNav from '../components/TopNav'
import BottomNav from '../components/BottomNav'
import Modal from '../components/Modal'
import { User, Mail, Shield, LogOut, BookOpen, Feather } from 'lucide-react'
import { useToast } from '../App'

export default function Profile({ navigate }: { navigate: (to: string) => void }) {
  const { user, signOut } = useAuth()
  const { show } = useToast()
  const [showLogout, setShowLogout] = useState(false)
  const handleLogout = async () => { await signOut(); show('success', '已退出登录'); window.location.hash = '/login' }
  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4', paddingBottom: 80 }}>
      <TopNav />
      <main style={{ maxWidth: 768, margin: '0 auto', padding: 24 }}>
        <div style={{ background: 'white', borderRadius: 24, padding: 32, marginBottom: 24, boxShadow: '0 2px 8px rgba(139,115,85,0.06)', border: '1px solid #E8DFD0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <User size={40} color="#8B7355" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#3D3226', margin: 0, fontFamily: 'serif' }}>{user?.email?.split('@')[0] || '用户'}</h2>
          <p style={{ fontSize: 14, color: '#A8998A', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}><Mail size={14} />{user?.email}</p>
        </div>
        <div style={{ background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 8px rgba(139,115,85,0.06)', border: '1px solid #E8DFD0' }}>
          {[{ icon: BookOpen, label: '我的自传', sub: '查看所有章节', action: () => window.location.hash = '/', color: '#8B7355' }, { icon: Feather, label: '写新章节', sub: '开始一段新的记录', action: () => window.location.hash = '/editor', color: '#8B7355' }, { icon: Shield, label: '数据安全', sub: '您的数据已加密存储', action: null, color: '#A8998A', badge: '已保护' }].map((item, idx) => (
            <div key={idx} onClick={item.action ? item.action : undefined} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, borderBottom: idx < 2 ? '1px solid #F5F0E8' : 'none', cursor: item.action ? 'pointer' : 'default' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: item.color === '#8B7355' ? '#FEF3C7' : '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><item.icon size={20} color={item.color} /></div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 15, fontWeight: 600, color: '#3D3226', margin: 0 }}>{item.label}</p><p style={{ fontSize: 13, color: '#A8998A', margin: 0 }}>{item.sub}</p></div>
              {item.badge ? <span style={{ fontSize: 12, color: '#16a34a', background: '#f0fdf4', padding: '4px 10px', borderRadius: 8, border: '1px solid #bbf7d0', fontWeight: 500 }}>{item.badge}</span> : item.action ? <span style={{ color: '#A8998A', fontSize: 14 }}>→</span> : null}
            </div>
          ))}
        </div>
        <button onClick={() => setShowLogout(true)} style={{ width: '100%', marginTop: 24, padding: '16px 0', background: 'white', borderRadius: 16, border: '1px solid #E8DFD0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#dc2626', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}><LogOut size={18} />退出登录</button>
      </main>
      <BottomNav navigate={navigate} />
      <Modal open={showLogout} title="确认退出" message="确定要退出当前账号吗？" confirmText="退出" onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
    </div>
  )
}
