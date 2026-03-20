import { useState } from 'react'
import { useAuth } from '../App'
import { useToast } from '../App'
import { BookMarked, Eye, EyeOff, Feather } from 'lucide-react'

export default function Login({ navigate }: { navigate: (to: string) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const { show } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { show('error', '请填写邮箱和密码'); return }
    setLoading(true)
    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) { show('error', '邮箱或密码错误') }
        else { show('success', '登录成功'); window.location.hash = '/' }
      } else {
        if (password.length < 6) { show('error', '密码至少6位'); setLoading(false); return }
        const { error } = await signUp(email, password)
        if (error) { show('error', '注册失败：' + error.message) }
        else { show('success', '注册成功！请查收验证邮件'); setIsLogin(true) }
      }
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 40, left: 32, fontSize: 128, fontWeight: 700, color: 'rgba(226,211,194,0.5)', fontFamily: 'serif' }}>传</div>
        <div style={{ position: 'absolute', bottom: 80, right: 32, fontSize: 144, fontWeight: 700, color: 'rgba(226,211,194,0.4)', fontFamily: 'serif' }}>记</div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 384, height: 384, background: 'rgba(253,244,228,0.3)', borderRadius: '50%', filter: 'blur(48px)' }} />
      </div>
      <div style={{ position: 'relative', width: '100%', maxWidth: 384, background: 'white', borderRadius: 24, padding: 32, boxShadow: '0 4px 24px rgba(139,115,85,0.08)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: '#8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 12px rgba(139,115,85,0.2)' }}>
            <BookMarked size={32} color="white" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#5C3D1E', fontFamily: 'serif', margin: 0 }}>我的自传</h1>
          <p style={{ color: '#8B7D6B', fontSize: 14, marginTop: 4 }}>记录人生，珍藏回忆</p>
        </div>
        <div style={{ display: 'flex', background: '#F5F0E8', borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {[{ label: '登录', key: true }, { label: '注册', key: false }].map(tab => (
            <button key={String(tab.key)} onClick={() => setIsLogin(tab.key)} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s', background: isLogin === tab.key ? 'white' : 'transparent', color: isLogin === tab.key ? '#5C3D1E' : '#8B7D6B', boxShadow: isLogin === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
              {tab.label}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#5C3D1E', marginBottom: 6 }}>邮箱</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E8DFD0', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#5C3D1E', marginBottom: 6 }}>密码</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={isLogin ? '输入密码' : '至少6位'} style={{ width: '100%', padding: '12px 44px 12px 16px', borderRadius: 12, border: '1px solid #E8DFD0', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8B7D6B' }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', background: '#8B7355', color: 'white', fontSize: 16, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'opacity 0.2s' }}>
            {loading ? <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <Feather size={16} />}
            {isLogin ? '登录' : '注册'}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#8B7D6B', marginTop: 24 }}>
          {isLogin ? '还没有账号？' : '已有账号？'}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#8B7355', fontWeight: 600, cursor: 'pointer', marginLeft: 4, textDecoration: 'underline' }}>
            {isLogin ? '立即注册' : '去登录'}
          </button>
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} input:focus{border-color:#C4A77D!important} body{margin:0}`}</style>
    </div>
  )
}
