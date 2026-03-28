'use client'

import { useState, useRef } from 'react'
import type { JSX } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

interface WhyAlvaSectionProps {
  onOpenModal: (unit: 'centro' | 'boa_vista') => void
}

interface Testimonial {
  name: string
  text: string
  stars: number
  treatment: string
}

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Fernanda A.',
    text: 'Fiz meu implante e ficou perfeito! O atendimento foi super cuidadoso e o resultado superou minhas expectativas.',
    stars: 5,
    treatment: 'Implante Dentário',
  },
  {
    name: 'Ricardo M.',
    text: 'Coloquei facetas e o resultado foi incrível. A Dra. Renata foi muito atenciosa e me explicou tudo passo a passo.',
    stars: 5,
    treatment: 'Lentes e Facetas',
  },
  {
    name: 'Camila S.',
    text: 'Minha filha temia dentista e aqui ela foi com muito mais tranquilidade. Equipe maravilhosa com as crianças!',
    stars: 5,
    treatment: 'Odontopediatria',
  },
]

export default function WhyAlvaSection({ onOpenModal }: WhyAlvaSectionProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function handleCtaClick() {
    trackEvent('click_cta_why_alva', { unit: 'centro' })
    onOpenModal('centro')
  }

  function scrollToIndex(i: number) {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i] as HTMLElement | undefined
    if (!card) return
    // getBoundingClientRect é sempre relativo ao viewport — imune ao offsetParent
    const cardLeft = card.getBoundingClientRect().left
    const trackLeft = track.getBoundingClientRect().left
    track.scrollTo({ left: track.scrollLeft + cardLeft - trackLeft, behavior: 'smooth' })
    setActiveIndex(i)
  }

  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    const trackRect = track.getBoundingClientRect()
    const viewCenter = trackRect.left + trackRect.width / 2
    let closest = 0
    let minDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const rect = (child as HTMLElement).getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const dist = Math.abs(viewCenter - cardCenter)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActiveIndex(closest)
  }

  return (
    <section id="por-que-alva" className="py-32 md:py-44 bg-cream-50" aria-label="Por que a Alva Sorrisos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Por que a Alva Sorrisos?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-navy-900 leading-[1.1] tracking-[-0.02em] text-balance">
            Confiança que se constrói{' '}
            <span className="text-orange-500 italic">sorriso a sorriso</span>
          </h2>
        </motion.div>

        {/* Rating banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="bg-navy-900 rounded-3xl p-10 md:p-14 mb-20 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/7 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-20 left-0 w-64 h-64 bg-blue-600/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="text-center flex-shrink-0">
              <div className="font-display text-[88px] font-light text-white leading-none mb-3 tracking-[-0.03em]" aria-label="Nota 4,6 no Google">
                4,6
              </div>
              <div className="flex justify-center gap-1 mb-3" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FF6B2B">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-white/35 text-sm tracking-wide">no Google Reviews</p>
            </div>

            <div className="w-px h-20 bg-white/[0.08] hidden md:block" aria-hidden="true" />

            <div className="text-center md:text-left">
              <p className="font-display text-3xl sm:text-4xl font-light text-white mb-4 text-balance leading-[1.15] tracking-[-0.02em]">
                Mais de 5.000 pacientes{' '}
                <span className="text-orange-400 italic">confiam em nós</span>
              </p>
              <p className="text-slate-400 leading-[1.85] max-w-lg font-light text-[15px]">
                Nossa nota no Google reflete o que mais importa: pacientes satisfeitos,
                tratamentos bem-sucedidos e um atendimento que vai além do consultório.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Carrossel de depoimentos ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="mb-20"
        >
          {/* Track: scroll-snap mobile, grid desktop */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollPaddingLeft: '1rem' }}
          >
            {TESTIMONIALS.map((item) => (
              <figure
                key={item.name}
                className="snap-start flex-shrink-0 w-[85vw] md:w-auto flex flex-col bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100/80"
              >
                <div className="flex gap-1 mb-5" aria-label={`${item.stars} estrelas`}>
                  {Array.from({ length: item.stars }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#FF6B2B" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                {/* flex-grow equaliza a altura dos cards independente do texto */}
                <blockquote className="flex-grow text-slate-600 text-sm leading-[1.85] mb-6 italic">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm flex-shrink-0"
                    aria-hidden="true"
                  >
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-navy-900 font-semibold text-sm leading-tight">{item.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5 tracking-wide">{item.treatment}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Navigation dots — visíveis mobile e desktop */}
          <div className="flex justify-center gap-2.5 mt-8" role="tablist" aria-label="Navegar depoimentos">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Depoimento ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 h-2 bg-orange-500'
                    : 'w-2 h-2 bg-gray-300 hover:bg-orange-300'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="text-center"
        >
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-9 py-5 rounded-full text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/35 hover:-translate-y-1.5 hover:scale-[1.02]"
          >
            Quero transformar meu sorriso
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
