import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função para verificar se as variáveis de ambiente estão configuradas
export function checkSupabaseConfig() {
  if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here') {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL não está configurada')
    return false
  }
  
  if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY não está configurada')
    return false
  }
  
  return true
}
