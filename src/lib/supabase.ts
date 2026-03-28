/**
 * supabase.ts — Cliente Supabase para uso exclusivo no backend (Server-Side).
 *
 * REGRA ZERO TRUST — Dois clientes com permissões distintas:
 *
 * 1. `getSupabaseAdmin()` — usa SUPABASE_SERVICE_ROLE_KEY (bypassa RLS).
 *    Apenas para operações internas confiáveis: INSERT de leads, leitura de dados sensíveis.
 *    NUNCA exportar para componentes client-side ('use client').
 *    NUNCA usar em arquivos que possam ser importados pelo bundle do browser.
 *
 * 2. `getSupabaseAnon()` — usa NEXT_PUBLIC_SUPABASE_ANON_KEY (respeita RLS).
 *    Para uso futuro em operações públicas com RLS ativo (ex: auth de usuários).
 *    Segura para uso no cliente pois a anon key é pública por design.
 *
 * Inicialização lazy: os clientes são criados apenas na primeira chamada,
 * evitando erros em build quando as variáveis de ambiente não estão presentes.
 */

import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

let _supabaseAdmin: SupabaseClient<Database> | null = null
let _supabaseAnon: SupabaseClient<Database> | null = null

// ─── Cliente Admin (Service Role — bypassa RLS) ──────────────────────────────
// Uso: operações internas confiáveis (INSERT de leads, queries admin).
// Nunca importar em componentes client-side.

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (_supabaseAdmin) return _supabaseAdmin

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error(
      '[Supabase] NEXT_PUBLIC_SUPABASE_URL não configurada. ' +
      'Copie .env.local.example para .env.local e preencha as variáveis.'
    )
  }

  if (!serviceRoleKey) {
    throw new Error(
      '[Supabase] SUPABASE_SERVICE_ROLE_KEY não configurada. ' +
      'Esta variável é obrigatória para operações backend. ' +
      'NÃO adicione prefixo NEXT_PUBLIC_ a ela.'
    )
  }

  _supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      // Service Role não usa sessions — desabilita persistência desnecessária
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return _supabaseAdmin
}

// ─── Cliente Público (Anon Key — respeita RLS) ───────────────────────────────
// Uso: operações futuras que respeitem as políticas de segurança RLS.
// Seguro para uso no cliente (anon key é pública por design do Supabase).

export function getSupabaseAnon(): SupabaseClient<Database> | null {
  if (_supabaseAnon) return _supabaseAnon

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) return null

  _supabaseAnon = createClient<Database>(supabaseUrl, anonKey)
  return _supabaseAnon
}
