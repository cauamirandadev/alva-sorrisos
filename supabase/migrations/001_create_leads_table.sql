-- =============================================================================
-- Migration 001 — Tabela de Leads com RLS (Row Level Security)
-- Projeto: Alva Sorrisos Landing Page
-- =============================================================================
-- Como executar:
--   1. Acesse o painel do Supabase: https://supabase.com/dashboard
--   2. Selecione seu projeto → SQL Editor → New Query
--   3. Cole este script completo e execute (Run)
--
-- OU via Supabase CLI:
--   npx supabase db push
-- =============================================================================


-- ─── 1. EXTENSÃO ──────────────────────────────────────────────────────────────
-- Garante que gen_random_uuid() está disponível para IDs automáticos.
-- No Supabase, uuid-ossp já vem habilitado por padrão, mas é idempotente.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ─── 2. TABELA ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.leads (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT        NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 80),
    treatment   TEXT        NOT NULL,
    unit        TEXT        NOT NULL    CHECK (unit IN ('centro', 'boa_vista')),
    ip_address  TEXT,                   -- Opcional: para auditoria e dedup
    created_at  TIMESTAMPTZ NOT NULL    DEFAULT now()
);

-- Constraint de tratamentos válidos — segunda linha de defesa além do Zod
ALTER TABLE public.leads
    ADD CONSTRAINT leads_treatment_valid CHECK (
        treatment IN (
            'Implantes e Próteses',
            'Invisalign e Ortodontia',
            'Lentes e Facetas',
            'HOF (Botox)',
            'Clareamento',
            'Odontopediatria',
            'Clínico Geral'
        )
    );

-- Comentários de documentação no schema
COMMENT ON TABLE  public.leads                IS 'Leads capturados pela landing page da Alva Sorrisos';
COMMENT ON COLUMN public.leads.id             IS 'UUID gerado automaticamente';
COMMENT ON COLUMN public.leads.name           IS 'Nome do lead (sanitizado pelo backend antes do INSERT)';
COMMENT ON COLUMN public.leads.treatment      IS 'Tratamento de interesse selecionado no modal';
COMMENT ON COLUMN public.leads.unit           IS 'Unidade da clínica: centro ou boa_vista';
COMMENT ON COLUMN public.leads.ip_address     IS 'IP do cliente para auditoria (extraído do header x-forwarded-for)';
COMMENT ON COLUMN public.leads.created_at     IS 'Timestamp UTC da criação do lead';


-- ─── 3. ÍNDICES ───────────────────────────────────────────────────────────────
-- Aceleram as queries mais comuns no dashboard/CRM.

CREATE INDEX IF NOT EXISTS leads_created_at_idx  ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_unit_idx         ON public.leads (unit);
CREATE INDEX IF NOT EXISTS leads_treatment_idx    ON public.leads (treatment);


-- ─── 4. ROW LEVEL SECURITY (RLS) ─────────────────────────────────────────────
-- REGRA ZERO TRUST:
--   - Anon role (frontend/public)  → ACESSO NEGADO em tudo
--   - Authenticated role (usuários) → ACESSO NEGADO em tudo
--   - Service Role (backend admin)  → ACESSO TOTAL (bypassa RLS por design do Supabase)
--
-- O service_role bypassa RLS automaticamente no Supabase.
-- As policies abaixo negam explicitamente anon e authenticated.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política de INSERT: NEGADO para anon e authenticated
-- (o service_role não precisa de policy — ele bypassa RLS)
CREATE POLICY "deny_anon_insert"
    ON public.leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (false);

-- Política de SELECT: NEGADO para anon e authenticated
CREATE POLICY "deny_anon_select"
    ON public.leads
    FOR SELECT
    TO anon, authenticated
    USING (false);

-- Política de UPDATE: NEGADO para todos (tabela append-only)
CREATE POLICY "deny_all_update"
    ON public.leads
    FOR UPDATE
    TO anon, authenticated, service_role
    USING (false);

-- Política de DELETE: NEGADO para todos (compliance — dados retidos por 90 dias)
CREATE POLICY "deny_all_delete"
    ON public.leads
    FOR DELETE
    TO anon, authenticated, service_role
    USING (false);


-- ─── 5. REVOKE DE PERMISSÕES DIRETAS ─────────────────────────────────────────
-- Garante que mesmo sem RLS (ex: após reset acidental), anon não tem acesso.
-- Defense in depth: RLS + REVOKE = dupla barreira.

REVOKE ALL ON public.leads FROM anon;
REVOKE ALL ON public.leads FROM authenticated;


-- ─── 6. VERIFICAÇÃO ──────────────────────────────────────────────────────────
-- Execute após a migration para confirmar que RLS está ativo:
--
--   SELECT tablename, rowsecurity
--   FROM pg_tables
--   WHERE schemaname = 'public' AND tablename = 'leads';
--
-- Resultado esperado: rowsecurity = true
--
-- Para listar as policies criadas:
--   SELECT policyname, cmd, roles, qual
--   FROM pg_policies
--   WHERE tablename = 'leads';

-- =============================================================================
-- FIM DA MIGRATION 001
-- =============================================================================
