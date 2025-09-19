import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Função para verificar se as variáveis de ambiente estão configuradas
export function checkSupabaseConfig() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_url_here') {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL não está configurada')
    return false
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your_supabase_anon_key_here') {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY não está configurada')
    return false
  }
  
  return true
}

// Só criar o cliente Supabase se as configurações estiverem válidas
export const supabase = checkSupabaseConfig() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Função helper para usar o Supabase com segurança
export function useSupabase() {
  if (!supabase) {
    throw new Error('Supabase não está configurado. Configure as variáveis de ambiente primeiro.')
  }
  return supabase
}
