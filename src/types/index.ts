export interface Autobiography {
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}
