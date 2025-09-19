'use client'

import { useState } from 'react'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { KanbanColumn } from '@/types'
import { checkSupabaseConfig } from '@/lib/supabase'

// Dados de exemplo para demonstração
const initialColumns: KanbanColumn[] = [
  {
    id: 'new',
    title: 'Novos',
    order: 1,
    cards: [
      {
        id: '1',
        title: 'Dúvida sobre produto',
        content: 'Cliente interessado em conhecer mais sobre nossos produtos',
        status: 'new',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        customer_phone: '+5511999999999',
        customer_name: 'João Silva',
        last_message: 'Olá, gostaria de saber mais sobre seus produtos...',
        unread_count: 2
      },
      {
        id: '2',
        title: 'Solicitação de orçamento',
        content: 'Cliente solicitando orçamento para serviço',
        status: 'new',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString(),
        customer_phone: '+5511888888888',
        customer_name: 'Maria Santos',
        last_message: 'Preciso de um orçamento para...',
        unread_count: 1
      }
    ]
  },
  {
    id: 'in_progress',
    title: 'Em Andamento',
    order: 2,
    cards: [
      {
        id: '3',
        title: 'Negociação em andamento',
        content: 'Cliente em processo de negociação',
        status: 'in_progress',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        updated_at: new Date(Date.now() - 1800000).toISOString(),
        customer_phone: '+5511777777777',
        customer_name: 'Pedro Costa',
        last_message: 'Vou analisar a proposta e retorno...',
        unread_count: 0
      }
    ]
  },
  {
    id: 'waiting',
    title: 'Aguardando',
    order: 3,
    cards: [
      {
        id: '4',
        title: 'Aguardando documentos',
        content: 'Aguardando cliente enviar documentos',
        status: 'waiting',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        customer_phone: '+5511666666666',
        customer_name: 'Ana Oliveira',
        last_message: 'Vou enviar os documentos até amanhã',
        unread_count: 0
      }
    ]
  },
  {
    id: 'resolved',
    title: 'Resolvidos',
    order: 4,
    cards: [
      {
        id: '5',
        title: 'Venda finalizada',
        content: 'Cliente finalizou a compra',
        status: 'resolved',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 172800000).toISOString(),
        customer_phone: '+5511555555555',
        customer_name: 'Carlos Ferreira',
        last_message: 'Obrigado! Ficou perfeito!',
        unread_count: 0
      }
    ]
  }
]

export default function Home() {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns)
  const isSupabaseConfigured = checkSupabaseConfig()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LabCRM</h1>
              <p className="text-gray-600 text-sm">Sistema de gestão de conversas WhatsApp</p>
            </div>
            
            {/* Status da configuração */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                isSupabaseConfigured 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isSupabaseConfigured ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                {isSupabaseConfigured ? 'Supabase Conectado' : 'Configurar Supabase'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Aviso de configuração */}
      {!isSupabaseConfigured && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-6 rounded">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Configuração necessária:</strong> Configure suas variáveis de ambiente do Supabase no arquivo <code>.env.local</code>
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Use o arquivo <code>.env.example</code> como referência
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <main className="flex-1">
        <KanbanBoard 
          columns={columns} 
          onUpdateColumns={setColumns}
        />
      </main>
    </div>
  )
}