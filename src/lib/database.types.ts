/**
 * database.types.ts — Tipagem TypeScript para o schema do Supabase.
 *
 * Estrutura compatível com @supabase/supabase-js v2+ (GenericSchema).
 * Campos obrigatórios pelo SDK: Row, Insert, Update, Relationships.
 *
 * Para regenerar automaticamente com Supabase CLI:
 *   npx supabase gen types typescript --project-id <PROJECT_ID> > src/lib/database.types.ts
 */

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          treatment: string
          unit: string
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          treatment: string
          unit: string
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          treatment?: string
          unit?: string
          ip_address?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type LeadRow = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
