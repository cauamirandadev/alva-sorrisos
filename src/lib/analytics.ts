import type { Unit, Treatment } from '@/lib/constants'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    fbq: (action: string, event: string, params?: Record<string, unknown>) => void
  }
}

// Eventos de funil mapeados — nenhum evento ad-hoc permitido
export type TrackableEvent =
  | 'click_cta_hero'
  | 'click_cta_hero_centro'
  | 'click_cta_hero_boa_vista'
  | 'click_cta_header'
  | 'click_cta_treatments'
  | 'click_cta_why_alva'
  | 'click_cta_transformacoes'
  | 'modal_open'
  | 'modal_close'
  | 'lead_captured'
  | 'whatsapp_redirect'

// Payload fortemente tipado — sem index signature [key: string]: unknown
export interface EventPayload {
  unit?: Unit
  treatment?: Treatment
  lead_name?: string
}

// Mapeamento para eventos padrão do Meta Pixel
const META_PIXEL_MAP: Partial<Record<TrackableEvent, string>> = {
  lead_captured: 'Lead',
  whatsapp_redirect: 'Contact',
  modal_open: 'ViewContent',
}

/**
 * Dispara um evento no GTM dataLayer e no Meta Pixel.
 * Nunca lança exceção — falhas de analytics não devem bloquear o fluxo do usuário.
 */
export function trackEvent(eventName: TrackableEvent, payload?: EventPayload): void {
  if (typeof window === 'undefined') return

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload })
    }
  } catch {
    // GTM failure is silent — never block user flow
  }

  try {
    if (typeof window.fbq === 'function') {
      const pixelEvent = META_PIXEL_MAP[eventName] ?? 'CustomEvent'
      window.fbq('track', pixelEvent, payload as Record<string, unknown>)
    }
  } catch {
    // Pixel failure is silent — never block user flow
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug('[Analytics]', eventName, payload)
  }
}
