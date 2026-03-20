import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../App'
import { supabase } from '../lib/supabase'
import TopNav from '../components/TopNav'
import BottomNav from '../components/BottomNav'
import { ArrowLeft, Save, FileText } from 'lucide-react'
import { useToast } from '../App'

export default function Editor({ id, navigate }: { id?: string; navigate: (to: string) => void }) {
  const isEditing = !!id
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const { show } = useToast()
  const { user } = useAuth() // ← 调用在组件顶层，合法

  useEffect(() => {
    if (!id) {
      const draft = localStorage.getItem('autobiography_draft')
      if (draft) { const { title: t, content: c } = JSON.parse(draft); setTitle(t || ''); setContent(c || '') }
      return
    }
    supabase.from('autobiographies').select('*').eq('id', id).single()
      .then(({ data }) => { if (data) { setTitle(data.title); setContent(data.content) }; setLoading(false) })
  }, [id])

  const handleSave = async () => {
    if (!content.trim()) { show('error', '请输入内容'); return }
    if (!user) { show('error', '请先登录'); return }
    setSaving(true)
    const payload = { title: title.trim() || '无题', content: content.trim(), updated_at: new Date().toISOString() }
    let error
    if (isEditing) {
      ({ error } = await supabase.from('autobiographies').update(payload).eq('id', id!))
    } else {
      // 新增时带上 user_id
      const { error: e } = await supabase.from('autobiographies').insert([{ ...payload, user_id: user.id }])
      error = e
      if (!error) localStorage.removeItem('autobiography_draft')
    }
    setSaving(false)
    if (error) { console.error(error); show('error', '保存失败：' + (error.message || '请重试')) }
    else {
      setSaved(true)
      show('success', '已保存 ✓')
      setTimeout(() => setSaved(false), 3000)
      if (!isEditing) setTimeout(() => window.location.hash = '/', 1500)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4' }}>
      <TopNav />
      <div style={{ maxWidth: 768, margin: '0 auto', padding: 32 }}>
        <div style={{ height: 40, background: '#E8DFD0', borderRadius: 12, width: '60%', marginBottom: 24 }} />
        <div style={{ height: 300, background: '#E8DFD0', borderRadius: 16 }} />
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <TopNav />
      <div style={{ position: 'sticky', top: 57, zIndex: 30, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #E8DFD0' }}>
        <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 16px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => window.location.hash = isEditing ? '/reader/' + id : '/'} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#8B7D6B', cursor: 'pointer', fontSize: 14 }}>
            <ArrowLeft size={18} />返回
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#A8998A', display: 'flex', alignItems: 'center', gap: 4 }}>
              <FileText size={12} />{content.length}字
            </span>
            <button onClick={handleSave} disabled={saving} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 12, border: 'none',
              background: saved ? '#BBF7D0' : '#8B7355', color: 'white', fontSize: 14, fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1
            }}>
              {saving ? <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <Save size={15} />}
              {saved ? '已保存' : '保存'}
            </button>
          </div>
        </div>
      </div>
      <main style={{ maxWidth: 768, margin: '0 auto', width: '100%', padding: '24px 16px', flex: 1 }}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="输入章节标题..." style={{ width: '100%', fontSize: 28, fontWeight: 700, color: '#3D3226', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'serif', marginBottom: 24, padding: 0 }} />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="从这一刻开始书写..." style={{ width: '100%', minHeight: '60vh', fontSize: 17, color: '#5C4A3A', background: 'transparent', border: 'none', outline: 'none', resize: 'none', lineHeight: 2, fontFamily: 'serif' }} />
      </main>
      <BottomNav navigate={navigate} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
