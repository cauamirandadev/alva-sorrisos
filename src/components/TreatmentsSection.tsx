'use client'

import type { JSX } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

interface TreatmentsSectionProps {
  onOpenModal: (unit: 'centro' | 'boa_vista') => void
}

interface Treatment {
  icon: JSX.Element
  title: string
  description: string
  tag: string | null
}

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

const TREATMENTS: Treatment[] = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="14" width="10" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 14v-2a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 6v3M9 7.5l2.6 1.5M15 7.5l-2.6 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Implantes e Próteses',
    description: 'Recupere função e estética com implantes de titânio e próteses sob medida de alta durabilidade.',
    tag: 'Alta Demanda',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="13" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4v16M12 4v16M16 4v16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.4"/>
      </svg>
    ),
    title: 'Invisalign e Ortodontia',
    description: 'Alinhadores transparentes ou brackets estéticos para corrigir com discrição e conforto.',
    tag: null,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="11" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 11c0 4 2.5 7 6 7s6-3 6-7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 8.5L7 5M15 8.5l2 -3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Lentes e Facetas',
    description: 'Design do sorriso personalizado com lentes ultrafinas de porcelana — natural e duradouro.',
    tag: 'Mais Buscado',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3C8.5 3 6 5.5 6 8.5c0 2 1 3.5 2.5 5L10 18h4l1.5-4.5C17 12 18 10.5 18 8.5 18 5.5 15.5 3 12 3z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9.5 15.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'HOF (Botox)',
    description: 'Harmonização Orofacial com toxina botulínica para relaxar músculos e rejuvenescer.',
    tag: null,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Clareamento',
    description: 'Clareamento profissional de consultório ou caseiro supervisionado para um sorriso brilhante.',
    tag: null,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3C8 3 5 6 5 9.5c0 2 .8 3.5 2 4.8L8.5 19h7l1.5-4.7c1.2-1.3 2-2.8 2-4.8C19 6 16 3 12 3z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9.5 13.5s1 1.5 2.5 1.5 2.5-1.5 2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9.5" cy="9.5" r="1" fill="currentColor"/>
        <circle cx="14.5" cy="9.5" r="1" fill="currentColor"/>
      </svg>
    ),
    title: 'Odontopediatria',
    description: 'Cuidado especializado para crianças em ambiente acolhedor, criando hábitos saudáveis desde cedo.',
    tag: null,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Clínico Geral',
    description: 'Consultas de rotina, restaurações, tratamento de canal e prevenção para saúde bucal em dia.',
    tag: null,
  },
]

export default function TreatmentsSection({ onOpenModal }: TreatmentsSectionProps): JSX.Element {
  function handleCtaClick() {
    trackEvent('click_cta_treatments', { unit: 'centro' })
    onOpenModal('centro')
  }

  return (
    <section id="tratamentos" className="relative pt-0 pb-32 md:pb-44 bg-navy-900" aria-label="Tratamentos">
      {/* Wave divider superior — white → navy-900 */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 md:h-24 block"
        >
          <path
            d="M0,62 C240,28 480,88 720,55 C900,32 1100,78 1300,52 C1360,42 1410,60 1440,58 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">

        {/* Section header — scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="max-w-2xl mb-20"
        >
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Nossos Tratamentos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-white leading-[1.1] tracking-[-0.02em] text-balance mb-5">
            Uma solução completa para{' '}
            <span className="text-orange-500 italic">cada necessidade</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-[1.85] tracking-[0.005em]">
            Da prevenção à estética avançada, nosso time multidisciplinar oferece
            os melhores tratamentos em um ambiente moderno e acolhedor.
          </p>
        </motion.div>

        {/* Cards com stagger + hover framer-motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {TREATMENTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_PREMIUM }}
              whileHover={{ y: -10, scale: 1.025, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="group relative bg-navy-800 border border-white/[0.06] hover:border-orange-500/30 rounded-2xl p-8 cursor-default shadow-lg hover:shadow-2xl hover:shadow-orange-500/8 transition-colors duration-300"
            >
              {item.tag && (
                <span className="absolute top-5 right-5 bg-orange-500/10 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/20">
                  {item.tag}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-orange-500/8 border border-orange-500/12 flex items-center justify-center text-orange-400 mb-6 group-hover:bg-orange-500/18 group-hover:border-orange-500/25 group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>

              <h3 className="text-white font-semibold text-base mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-[1.75]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA — scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20"
        >
          <p className="text-white/35 text-base font-light">Não sabe por onde começar?</p>
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/35 hover:-translate-y-1 hover:scale-[1.02]"
          >
            Agendar avaliação gratuita
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
