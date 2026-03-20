import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import { Autobiography } from '../types'
import TopNav from '../components/TopNav'
import BottomNav from '../components/BottomNav'
import ChapterCard from '../components/ChapterCard'
import EmptyState from '../components/EmptyState'
import Modal from '../components/Modal'
import { useToast } from '../App'

export default function Home({ navigate }: { navigate: (to: string) => void }) {
  const [chapters, setChapters] = useState<Autobiography[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { show } = useToast()

  const fetchChapters = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('autobiographies').select('*').order('created_at', { ascending: false })
    if (data) setChapters(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchChapters() }, [fetchChapters])

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await supabase.from('autobiographies').delete().eq('id', deleteId)
    if (error) { show('error', '删除失败') }
    else { show('success', '已删除'); setChapters(prev => prev.filter(c => c.id !== deleteId)) }
    setDeleteId(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4', paddingBottom: 80 }}>
      <TopNav />
      <main style={{ maxWidth: 768, margin: '0 auto', padding: '16px' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: 'white', borderRadius: 16, padding: 20, animation: 'pulse 1.5s infinite' }}>
                <div style={{ height: 20, background: '#F5F0E8', borderRadius: 8, width: '60%', marginBottom: 12 }} />
                <div style={{ height: 14, background: '#F5F0E8', borderRadius: 6, width: '100%', marginBottom: 8 }} />
                <div style={{ height: 14, background: '#F5F0E8', borderRadius: 6, width: '75%' }} />
              </div>
            ))}
          </div>
        ) : chapters.length === 0 ? (
          <EmptyState navigate={navigate} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {chapters.map(chapter => (
              <ChapterCard key={chapter.id} chapter={chapter} onDelete={setDeleteId} navigate={navigate} />
            ))}
          </div>
        )}
      </main>
      <BottomNav navigate={navigate} />
      <Modal open={!!deleteId} title="确认删除" message="确定删除这篇章节吗？此操作不可恢复。" confirmText="删除" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  )
}
