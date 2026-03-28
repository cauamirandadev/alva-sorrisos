import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { TREATMENTS, UNITS } from '@/lib/constants'
import { getSupabaseAdmin } from '@/lib/supabase'

// ─── Schema Zod ────────────────────────────────────────────────────────────────

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter ao menos 2 caracteres.')
    .max(80, 'Nome muito longo.')
    // Sanitização XSS: remove tags HTML e escapa caracteres especiais
    .transform((v) =>
      v
        .replace(/<[^>]*>/g, '')
        .replace(/[&<>"']/g, (c) => {
          const map: Record<string, string> = {
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
          }
          return map[c] ?? c
        })
    ),
  treatment: z.enum(TREATMENTS, { error: 'Tratamento inválido.' }),
  unit: z.enum(['centro', 'boa_vista'] as const, { error: 'Unidade inválida.' }),
})

export type LeadInput = z.infer<typeof leadSchema>

// ─── Handler ───────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Validação de Content-Type
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { error: 'Content-Type deve ser application/json.' },
      { status: 415 }
    )
  }

  // Parse do body
  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Payload inválido — JSON malformado.' },
      { status: 400 }
    )
  }

  // Validação com Zod
  const parsed = leadSchema.safeParse(rawBody)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Dados inválidos.'
    return NextResponse.json({ error: firstError }, { status: 422 })
  }

  const lead: LeadInput = parsed.data

  // ─── Persistência no Supabase (Service Role — bypassa RLS) ─────────────────
  // Dados já validados e sanitizados pelo Zod antes de chegar aqui.
  // O supabaseAdmin usa a Service Role Key — nunca exposta ao cliente.
  // Qualquer falha retorna 500 genérico: stack trace e detalhes do banco
  // nunca chegam ao frontend.
  try {
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      null

    const { error: dbError } = await getSupabaseAdmin()
      .from('leads')
      .insert({
        name: lead.name,
        treatment: lead.treatment,
        unit: lead.unit,
        ip_address: ipAddress,
      })

    if (dbError) {
      // Log interno com detalhes — nunca exposto ao cliente
      console.error('[API /leads] Supabase INSERT falhou:', {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details,
      })
      return NextResponse.json(
        { error: 'Erro interno. Tente novamente em instantes.' },
        { status: 500 }
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.info('[Lead salvo]', {
        name: lead.name,
        treatment: lead.treatment,
        unit: UNITS[lead.unit],
        ip: ipAddress ?? 'unknown',
        timestamp: new Date().toISOString(),
      })
    }

  } catch (unexpectedError) {
    // Captura erros inesperados (rede, timeout, etc.)
    console.error('[API /leads] Erro inesperado na persistência:', unexpectedError)
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente em instantes.' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { success: true, message: 'Lead registrado com sucesso.' },
    {
      status: 201,
      headers: { 'Cache-Control': 'no-store' },
    }
  )
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Método não permitido.' }, { status: 405 })
}
