import { BookOpen } from 'lucide-react'

export default function EmptyState({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
      <div style={{ width: 96, height: 96, borderRadius: 32, background: 'rgba(139,115,85,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <BookOpen size={48} color="rgba(139,115,85,0.3)" />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#5C3D1E', margin: '0 0 8px' }}>还没有章节</h3>
      <p style={{ fontSize: 14, color: '#A8998A', textAlign: 'center', marginBottom: 32, lineHeight: 1.6, maxWidth: 320 }}>
        每个人的人生都值得被记录。<br />点击下方按钮，写下你的第一章。
      </p>
      <button onClick={() => window.location.hash = '/editor'} style={{ padding: '12px 24px', background: '#8B7355', color: 'white', borderRadius: 16, border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(139,115,85,0.2)' }}>
        开始写作
      </button>
    </div>
  )
}
