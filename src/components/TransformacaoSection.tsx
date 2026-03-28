'use client'

import type { JSX } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

interface TransformacaoSectionProps {
  onOpenModal: (unit: 'centro' | 'boa_vista') => void
}

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

interface Case {
  treatment: string
  legend: string
}

const CASES: Case[] = [
  { treatment: 'Lentes e Facetas', legend: 'Caso 01 — Design do Sorriso completo' },
  { treatment: 'Implantes e Próteses', legend: 'Caso 02 — Reabilitação total' },
  { treatment: 'Invisalign e Ortodontia', legend: 'Caso 03 — Correção de alinhamento' },
]

function BeforeAfterSlot({ label }: { label: string }): JSX.Element {
  return (
    <div className="bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 min-h-[200px] group hover:border-orange-300/60 hover:bg-orange-50/30 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-orange-50 flex items-center justify-center mb-3 transition-colors duration-300">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-neutral-300 group-hover:text-orange-300 transition-colors" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-neutral-400 font-medium text-sm">{label}</p>
    </div>
  )
}

export default function TransformacaoSection({ onOpenModal }: TransformacaoSectionProps): JSX.Element {
  function handleCtaClick() {
    trackEvent('click_cta_transformacoes', { unit: 'centro' })
    onOpenModal('centro')
  }

  return (
    <section className="py-32 md:py-44 bg-cream-50" aria-label="Transformações Reais">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Casos de Sucesso
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-navy-900 leading-[1.1] tracking-[-0.02em] text-balance mb-5">
            Transformações{' '}
            <span className="text-orange-500 italic">reais</span>
          </h2>
          <p className="text-gray-500 text-lg font-light leading-[1.85]">
            Cada sorriso conta uma história. Veja algumas das transformações
            realizadas pela nossa equipe especializada.
          </p>
        </motion.div>

        {/* Casos — grid de cards antes/depois */}
        <div className="flex flex-col gap-10">
          {CASES.map((c, i) => (
            <motion.div
              key={c.legend}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE_PREMIUM }}
              className="bg-white rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100/80"
            >
              {/* Cabeçalho do caso */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-orange-50 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full border border-orange-100">
                  {c.treatment}
                </span>
                <span className="text-gray-400 text-sm font-light">{c.legend}</span>
              </div>

              {/* Slots antes/depois */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 pl-1">Antes</p>
                  <BeforeAfterSlot label="Foto Antes" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2 pl-1">Depois</p>
                  <BeforeAfterSlot label="Foto Depois" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-base font-light mb-6">
            Quer fazer parte das nossas transformações?
          </p>
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-9 py-5 rounded-full text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/35 hover:-translate-y-1.5 hover:scale-[1.02]"
          >
            Agendar avaliação gratuita
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
