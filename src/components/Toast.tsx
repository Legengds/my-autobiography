import { CheckCircle, XCircle, Info } from 'lucide-react'
import { useToast } from '../contexts/ToastContext'

export default function Toast() {
  const { toasts } = useToast()

  return (
    <div style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 384, padding: '0 16px' }}>
      {toasts.map(t => (
        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: t.type === 'success' ? '#f0fdf4' : t.type === 'error' ? '#fef2f2' : '#eff6ff', border: '1px solid', borderColor: t.type === 'success' ? '#bbf7d0' : t.type === 'error' ? '#fecaca' : '#bfdbfe', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {t.type === 'success' && <CheckCircle size={18} color="#16a34a" />}
          {t.type === 'error' && <XCircle size={18} color="#dc2626" />}
          {t.type === 'info' && <Info size={18} color="#2563eb" />}
          <span style={{ fontSize: 14, fontWeight: 500, color: t.type === 'success' ? '#166534' : t.type === 'error' ? '#991b1b' : '#1e40af' }}>
            {String(t.message)}
          </span>
        </div>
      ))}
    </div>
  )
}
