'use client'

import type { JSX } from 'react'
import { motion } from 'framer-motion'

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

type BentoSize = 'hero' | 'small' | 'wide'

interface PhotoSlot {
  label: string
  description: string
  size: BentoSize
}

const PHOTO_SLOTS: PhotoSlot[] = [
  {
    label: 'Recepção',
    description: 'Ambiente de acolhimento e espera',
    size: 'hero',
  },
  {
    label: 'Consultório Premium',
    description: 'Equipamentos de última geração',
    size: 'small',
  },
  {
    label: 'Fachada',
    description: 'Localização e identidade visual',
    size: 'small',
  },
  {
    label: 'Área de Esterilização',
    description: 'Protocolos de biossegurança',
    size: 'wide',
  },
]

// Recepção: 2 colunas × 2 linhas (destaque principal)
// Consultório + Fachada: 1×1 cada (coluna direita)
// Esterilização: faixa completa na base
const BENTO_GRID_CLASS: Record<BentoSize, string> = {
  hero:  'md:col-span-2 md:row-span-2',
  small: 'md:col-span-1 md:row-span-1',
  wide:  'md:col-span-3',
}

const BENTO_HEIGHT_CLASS: Record<BentoSize, string> = {
  hero:  'min-h-[260px] md:min-h-[520px]',
  small: 'min-h-[220px]',
  wide:  'min-h-[180px]',
}

function PhotoIcon(): JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlaceholderSlot({ label, description, size }: PhotoSlot): JSX.Element {
  const isHero = size === 'hero'
  return (
    <div
      className={`
        h-full bg-white/4 border border-dashed border-white/12 rounded-2xl
        flex flex-col items-center justify-center text-center
        group hover:border-orange-500/25 hover:bg-white/6 transition-all duration-300
        ${BENTO_HEIGHT_CLASS[size]}
        ${isHero ? 'p-12' : 'p-8'}
      `}
    >
      <div
        className={`
          rounded-xl bg-white/6 group-hover:bg-orange-500/10 flex items-center justify-center mb-4
          transition-colors duration-300 text-white/20 group-hover:text-orange-400/60
          ${isHero ? 'w-16 h-16' : 'w-12 h-12'}
        `}
      >
        <PhotoIcon />
      </div>
      <p className={`text-white/35 font-medium mb-1 ${isHero ? 'text-base' : 'text-sm'}`}>{label}</p>
      <p className="text-white/18 text-xs leading-relaxed max-w-[18ch]">{description}</p>
    </div>
  )
}

export default function ClinicStructureSection(): JSX.Element {
  return (
    <section className="py-32 md:py-44 bg-navy-900" aria-label="Conheça Nossa Estrutura">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="max-w-2xl mb-20"
        >
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Nossas Instalações
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-white leading-[1.1] tracking-[-0.02em] text-balance mb-5">
            Conheça nossa{' '}
            <span className="text-orange-500 italic">estrutura</span>
          </h2>
          <p className="text-white/40 text-lg font-light leading-[1.85]">
            Ambientes projetados para seu conforto e bem-estar, com tecnologia
            de ponta em cada detalhe.
          </p>
        </motion.div>

        {/* Bento Grid: col-span-2 row-span-2 hero + dois small à direita + wide na base */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-4 md:gap-5">
          {PHOTO_SLOTS.map((slot, i) => (
            <motion.div
              key={slot.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_PREMIUM }}
              className={BENTO_GRID_CLASS[slot.size]}
            >
              <PlaceholderSlot {...slot} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
