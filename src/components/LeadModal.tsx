'use client'

import { useState, useEffect, useRef } from 'react'
import type { JSX } from 'react'
import { trackEvent } from '@/lib/analytics'
import { TREATMENTS, WHATSAPP_NUMBERS, UNITS } from '@/lib/constants'
import type { Treatment, Unit } from '@/lib/constants'
import { useClosestUnit } from '@/hooks/useClosestUnit'

type FormStatus = 'idle' | 'loading' | 'error'

// Mapeamento exclusivamente de display — value enviado ao DB permanece inalterado
const TREATMENT_DISPLAY_LABELS: Partial<Record<Treatment, string>> = {
  'Clínico Geral': 'Não tenho certeza / Avaliação Geral',
}

function isApiError(value: unknown): value is { error: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    typeof (value as Record<string, unknown>)['error'] === 'string'
  )
}

interface LeadModalProps {
  /** Unidade pré-selecionada. Quando autoDetect=true, é apenas o fallback inicial. */
  unit: Unit
  /** Se true, aciona geolocalização para detectar a unidade mais próxima. */
  autoDetect?: boolean
  onClose: () => void
}

export default function LeadModal({ unit, autoDetect = false, onClose }: LeadModalProps): JSX.Element {
  const [selectedUnit, setSelectedUnit] = useState<Unit>(unit)
  const [name, setName] = useState('')
  const [treatment, setTreatment] = useState<Treatment | ''>('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Geolocalização — só ativa quando autoDetect=true
  const { closestUnit, detecting } = useClosestUnit(autoDetect)

  // Quando a geolocalização resolver, atualiza a unidade selecionada
  useEffect(() => {
    if (closestUnit !== null) {
      setSelectedUnit(closestUnit)
    }
  }, [closestUnit])

  // Foco no nome + analytics ao montar
  useEffect(() => {
    setTimeout(() => nameInputRef.current?.focus(), 100)
    trackEvent('modal_open', { unit: selectedUnit })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fechar com Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Bloquear scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Sequência garantida:
  // A) Validar → B) POST /api/leads → C) lead_captured → D) whatsapp_redirect → E) window.open
  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setErrorMsg('')

    if (name.trim().length < 2) {
      setErrorMsg('Por favor, informe seu nome completo.')
      return
    }
    if (!treatment) {
      setErrorMsg('Selecione o tratamento de interesse.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // selectedUnit garante que o payload respeita a validação Zod ('centro' | 'boa_vista')
        body: JSON.stringify({ name: name.trim(), treatment, unit: selectedUnit }),
      })

      if (!res.ok) {
        const data: unknown = await res.json()
        const message = isApiError(data) ? data.error : 'Erro ao registrar. Tente novamente.'
        throw new Error(message)
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado. Tente novamente.')
      return
    }

    trackEvent('lead_captured', { unit: selectedUnit, treatment, lead_name: name.trim() })

    const unitLabel = UNITS[selectedUnit]
    const message = encodeURIComponent(
      `Olá! Meu nome é ${name.trim()} e gostaria de saber mais sobre ${treatment} na ${unitLabel}. Podem me ajudar?`
    )
    const waUrl = `https://wa.me/${WHATSAPP_NUMBERS[selectedUnit]}?text=${message}`

    trackEvent('whatsapp_redirect', { unit: selectedUnit, treatment })

    setTimeout(() => {
      const popup = window.open(waUrl, '_blank', 'noopener,noreferrer')
      if (!popup) {
        setStatus('error')
        setErrorMsg('Seu navegador bloqueou o WhatsApp. Tente desabilitar o bloqueador de pop-ups.')
        return
      }
      onClose()
    }, 250)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md bg-navy-800 rounded-2xl shadow-2xl shadow-black/60 border border-white/10 animate-fade-up overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-light text-white leading-tight tracking-[-0.02em]">
                Agendar Avaliação{' '}
                <span className="text-orange-500 italic">Gratuita</span>
              </h2>
              <p className="text-white/40 text-sm mt-1">
                Dê o primeiro passo para transformar seu sorriso.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/35 hover:text-white transition-all duration-200 p-1 flex-shrink-0 ml-4 hover:rotate-90"
              aria-label="Fechar modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* ── Seletor de Unidade ──────────────────────────────────────── */}
            <div>
              <label className="block text-white/65 text-sm font-medium mb-2">
                Qual unidade prefere?
              </label>

              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Selecionar unidade">
                {(['centro', 'boa_vista'] as const).map((u) => {
                  const isSelected = selectedUnit === u
                  return (
                    <button
                      key={u}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedUnit(u)}
                      className={`flex flex-col items-center justify-center gap-0.5 py-3 px-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                          : 'bg-navy-700 border-white/10 text-white/55 hover:border-orange-500/40 hover:text-white/80'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={isSelected ? 'text-white' : 'text-white/40'}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="text-xs leading-tight text-center">{UNITS[u]}</span>
                    </button>
                  )
                })}
              </div>

              {/* Indicador de detecção de localização */}
              {detecting && (
                <p className="flex items-center gap-1.5 text-white/40 text-xs mt-2" aria-live="polite">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse flex-shrink-0" aria-hidden="true" />
                  Detectando unidade mais próxima...
                </p>
              )}
            </div>

            {/* ── Nome ────────────────────────────────────────────────────── */}
            <div>
              <label htmlFor="lead-name" className="block text-white/65 text-sm font-medium mb-1.5">
                Seu nome
              </label>
              <input
                ref={nameInputRef}
                id="lead-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                autoComplete="given-name"
                maxLength={80}
                className="w-full bg-navy-700 border border-white/10 focus:border-orange-500/60 text-white placeholder:text-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            {/* ── Tratamento ──────────────────────────────────────────────── */}
            <div>
              <label htmlFor="lead-treatment" className="block text-white/65 text-sm font-medium mb-1.5">
                Qual tratamento você busca?
              </label>
              <div className="relative">
                <select
                  id="lead-treatment"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value as Treatment)}
                  className="w-full appearance-none bg-navy-700 border border-white/10 focus:border-orange-500/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled>Selecione um tratamento...</option>
                  {TREATMENTS.map((t) => (
                    <option key={t} value={t}>
                      {TREATMENT_DISPLAY_LABELS[t] ?? t}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm flex items-center gap-1.5" role="alert" aria-live="assertive">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-6 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 mt-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Redirecionando...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.117 1.526 5.845L.057 23.082a.5.5 0 00.614.641l5.499-1.429A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                  Agendar via WhatsApp
                </>
              )}
            </button>
            {/* Trust badge de segurança — imediatamente abaixo do submit */}
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-3">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-shrink-0">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Seus dados estão seguros e não enviamos spam.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
