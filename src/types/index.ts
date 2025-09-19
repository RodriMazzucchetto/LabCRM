// Tipos para o sistema Kanban
export interface KanbanCard {
  id: string
  title: string
  content: string
  status: string
  created_at: string
  updated_at: string
  customer_phone?: string
  customer_name?: string
  last_message?: string
  unread_count?: number
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
  order: number
}

// Tipos para mensagens do WhatsApp
export interface WhatsAppMessage {
  id: string
  conversation_id: string
  from: string
  to: string
  message_type: 'text' | 'image' | 'document' | 'audio'
  content: string
  timestamp: string
  is_from_customer: boolean
  status: 'sent' | 'delivered' | 'read'
}

// Tipos para conversas
export interface Conversation {
  id: string
  customer_phone: string
  customer_name?: string
  status: 'new' | 'in_progress' | 'waiting' | 'resolved' | 'closed'
  assigned_to?: string
  created_at: string
  updated_at: string
  last_message_at: string
  unread_count: number
}
