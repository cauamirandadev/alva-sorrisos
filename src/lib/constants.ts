/**
 * Fonte única de verdade para tratamentos e unidades.
 * Importado tanto pelo frontend (LeadModal) quanto pelo backend (API route).
 * Elimina duplicação e garante que lista de opções válidas seja sempre sincronizada.
 */

export const TREATMENTS = [
  'Implantes e Próteses',
  'Invisalign e Ortodontia',
  'Lentes e Facetas',
  'HOF (Botox)',
  'Clareamento',
  'Odontopediatria',
  'Clínico Geral',
] as const

export type Treatment = (typeof TREATMENTS)[number]

export type Unit = 'centro' | 'boa_vista'

export const UNITS: Record<Unit, string> = {
  centro: 'Unidade Centro',
  boa_vista: 'Unidade Boa Vista',
}

export const WHATSAPP_NUMBERS: Record<Unit, string> = {
  centro: '5538999999991',     // TODO: substituir pelo número real antes do deploy
  boa_vista: '5538999999992',  // TODO: substituir pelo número real antes do deploy
}
