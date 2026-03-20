import React from 'react'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}

export default function Modal({ open, title, message, confirmText = '确认', cancelText = '取消', onConfirm, onCancel, danger }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <button onClick={onCancel} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1">
          <X size={18} />
        </button>
        <h3 className="text-lg font-bold text-stone-800 mb-2">{title}</h3>
        <p className="text-sm text-stone-500 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-colors">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={'flex-1 py-2.5 rounded-xl font-medium transition-colors ' + (danger ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-amber-700 text-white hover:bg-amber-800')}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
