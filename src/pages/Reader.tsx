import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Autobiography } from '../types'
import TopNav from '../components/TopNav'
import { ArrowLeft, Calendar, FileText, Edit2 } from 'lucide-react'

export default function Reader({ id, navigate }: { id: string; navigate: (to: string) => void }) {
  const [chapter, setChapter] = useState<Autobiography | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!id) return
    supabase.from('autobiographies').select('*').eq('id', id).single()
      .then(({ data }) => { if (data) setChapter(data); setLoading(false) })
  }, [id])
  if (loading) return <div style={{ minHeight: '100vh', background: '#F9F7F4' }}><TopNav /><div style={{ maxWidth: 768, margin: '0 auto', padding: 32 }}><div style={{ height: 32, background: '#E8DFD0', borderRadius: 12, width: '50%', margin: '0 auto 32px' }} /></div></div>
  if (!chapter) return <div style={{ minHeight: '100vh', background: '#F9F7F4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#8B7D6B', marginBottom: 16 }}>章节不存在</p><button onClick={() => window.location.hash = '/'} style={{ background: 'none', border: 'none', color: '#8B7355', cursor: 'pointer', fontWeight: 600 }}>返回首页</button></div>
  const d = new Date(chapter.created_at)
  const fmt = d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate() + '日'
  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4', paddingBottom: 80 }}>
      <TopNav />
      <main style={{ maxWidth: 768, margin: '0 auto', padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <button onClick={() => window.location.hash = '/'} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#8B7D6B', cursor: 'pointer', fontSize: 14 }}><ArrowLeft size={20} />返回</button>
          <button onClick={() => window.location.hash = '/editor/' + id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#FEF3C7', color: '#92400E', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}><Edit2 size={16} />编辑</button>
        </div>
        <article style={{ background: 'white', borderRadius: 24, padding: 40, boxShadow: '0 2px 8px rgba(139,115,85,0.06)', border: '1px solid #E8DFD0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#A8998A', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #F0EBE3' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={14} />{fmt}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FileText size={14} />{chapter.content.length}字</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#3D3226', marginBottom: 32, fontFamily: 'serif', lineHeight: 1.4 }}>{chapter.title || '无题'}</h1>
          <p style={{ fontSize: 17, color: '#5C4A3A', lineHeight: 2, fontFamily: 'serif', whiteSpace: 'pre-wrap', margin: 0 }}>{chapter.content || '暂无内容'}</p>
        </article>
      </main>
    </div>
  )
}
