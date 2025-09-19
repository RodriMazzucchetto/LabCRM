'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { KanbanCard } from '@/types'
import { MessageCircle, Clock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KanbanCardProps {
  card: KanbanCard
}

export function KanbanCardComponent({ card }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Agora há pouco'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h atrás`
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow",
        isDragging && "opacity-50"
      )}
    >
      {/* Header do card */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900 text-sm">
            {card.customer_name || card.customer_phone || 'Cliente'}
          </span>
        </div>
        {card.unread_count && card.unread_count > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {card.unread_count}
          </span>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="mb-3">
        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
          {card.title}
        </h4>
        {card.last_message && (
          <p className="text-gray-600 text-xs line-clamp-2">
            {card.last_message}
          </p>
        )}
      </div>

      {/* Footer do card */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          <span>WhatsApp</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(card.updated_at)}</span>
        </div>
      </div>
    </div>
  )
}
