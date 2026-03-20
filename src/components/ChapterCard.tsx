import { Autobiography } from '../types'
import { BookOpen, Clock, FileText } from 'lucide-react'

interface Props { chapter: Autobiography; onDelete: (id: string) => void; navigate: (to: string) => void }

export default function ChapterCard({ chapter, onDelete, navigate }: Props) {
  const d = new Date(chapter.created_at)
  const fmt = d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate() + '日'
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(139,115,85,0.06)', border: '1px solid #E8DFD0', transition: 'all 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(139,115,85,0.1)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(139,115,85,0.06)' }}>
      <div onClick={() => navigate('/reader/' + chapter.id)} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#3D3226', fontFamily: 'serif', margin: 0, flex: 1, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{chapter.title || '无题'}</h3>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 8, flexShrink: 0 }}>
            <BookOpen size={14} color="#D4AF37" />
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#8B7D6B', lineHeight: 1.7, marginBottom: 16, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{chapter.content || '暂无内容'}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F5F0E8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#A8998A' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} />{fmt}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FileText size={12} />{chapter.content.length}字</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => navigate('/editor/' + chapter.id)} style={{ padding: '4px 12px', fontSize: 12, background: 'rgba(139,115,85,0.08)', color: '#8B7355', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500 }}>编辑</button>
          <button onClick={() => onDelete(chapter.id)} style={{ padding: '4px 12px', fontSize: 12, background: 'rgba(220,38,38,0.05)', color: '#dc2626', borderRadius: 8, border: 'none', cursor: 'pointer' }}>删除</button>
        </div>
      </div>
    </div>
  )
}
