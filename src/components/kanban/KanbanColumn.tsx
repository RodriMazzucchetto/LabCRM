'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { KanbanColumn } from '@/types'
import { KanbanCardComponent } from './KanbanCard'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
  column: KanbanColumn
}

export function KanbanColumnComponent({ column }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  return (
    <div className="flex flex-col min-w-80 max-w-80">
      {/* Header da coluna */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg border-b">
        <h3 className="font-semibold text-gray-900">{column.title}</h3>
        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
          {column.cards.length}
        </span>
      </div>

      {/* Cards da coluna */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 p-4 bg-gray-25 rounded-b-lg min-h-96 transition-colors",
          isOver && "bg-blue-50 border-2 border-blue-200 border-dashed"
        )}
      >
        <SortableContext items={column.cards.map(card => card.id)}>
          <div className="space-y-3">
            {column.cards.map(card => (
              <KanbanCardComponent key={card.id} card={card} />
            ))}
          </div>
        </SortableContext>

        {column.cards.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            Arraste conversas para cá
          </div>
        )}
      </div>
    </div>
  )
}
