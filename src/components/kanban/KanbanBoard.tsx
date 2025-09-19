'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { KanbanColumn, KanbanCard } from '@/types'
import { KanbanColumnComponent } from './KanbanColumn'
import { KanbanCardComponent } from './KanbanCard'

interface KanbanBoardProps {
  columns: KanbanColumn[]
  onUpdateColumns: (columns: KanbanColumn[]) => void
}

export function KanbanBoard({ columns, onUpdateColumns }: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<KanbanCard | null>(null)
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    
    // Encontrar o card que está sendo arrastado
    const card = columns
      .flatMap(col => col.cards)
      .find(card => card.id === active.id)
    
    setActiveCard(card || null)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveCard(null)

    if (!over) return

    const activeCardId = active.id as string
    const overColumnId = over.id as string

    // Encontrar a coluna de origem e destino
    const sourceColumn = columns.find(col => 
      col.cards.some(card => card.id === activeCardId)
    )
    const targetColumn = columns.find(col => col.id === overColumnId)

    if (!sourceColumn || !targetColumn) return

    // Se é a mesma coluna, não faz nada
    if (sourceColumn.id === targetColumn.id) return

    // Mover o card entre colunas
    const cardToMove = sourceColumn.cards.find(card => card.id === activeCardId)!
    const updatedCard = { ...cardToMove, status: targetColumn.id }

    const newColumns = columns.map(col => {
      if (col.id === sourceColumn.id) {
        return {
          ...col,
          cards: col.cards.filter(card => card.id !== activeCardId)
        }
      }
      if (col.id === targetColumn.id) {
        return {
          ...col,
          cards: [...col.cards, updatedCard]
        }
      }
      return col
    })

    onUpdateColumns(newColumns)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 p-6 overflow-x-auto">
        <SortableContext items={columns.map(col => col.id)}>
          {columns.map(column => (
            <KanbanColumnComponent
              key={column.id}
              column={column}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeCard ? (
          <KanbanCardComponent card={activeCard} />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
