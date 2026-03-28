'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import type { JSX } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

interface HeroSectionProps {
  onOpenModalAuto: () => void
}

const CYCLING_WORDS = ['Autoestima', 'Confiança', 'Vida'] as const

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export default function HeroSection({ onOpenModalAuto }: HeroSectionProps): JSX.Element {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  function handleCtaClick() {
    trackEvent('click_cta_hero')
    onOpenModalAuto()
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden grain"
      aria-label="Apresentação"
    >
      {/* ── Foto real de fundo ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Sorriso saudável e confiante — Alva Sorrisos"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[right_15%]"
        />
        {/* Gradiente: esquerda bem escura (WCAG texto) → direita transparente (rosto visível) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
      </div>

      {/* Wave divider — transição orgânica para a seção clara abaixo */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 md:h-24"
        >
          {/* Camada de profundidade — onda traseira levemente opaca */}
          <path
            d="M0,55 C200,90 400,20 600,55 C800,90 1000,25 1200,55 C1300,68 1380,45 1440,55 L1440,90 L0,90 Z"
            fill="#ffffff"
            fillOpacity="0.35"
          />
          {/* Onda principal — cor sólida da seção abaixo */}
          <path
            d="M0,70 C240,35 480,90 720,60 C900,38 1100,80 1300,58 C1360,48 1410,65 1440,62 L1440,90 L0,90 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-44 w-full">
        <div className="max-w-xl lg:max-w-2xl">

          {/* H1 estático — editorial, peso leve */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_PREMIUM }}
            className="font-display text-5xl sm:text-6xl lg:text-[72px] font-light text-white leading-[1.08] tracking-[-0.025em] text-balance mb-6"
          >
            Tudo o que seu sorriso{' '}
            <br className="hidden sm:block" />
            precisa{' '}
            <span className="text-orange-500 italic">em um só lugar.</span>
          </motion.h1>

          {/* Cycling headline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-slate-300/70 leading-[1.15] tracking-[-0.02em] mb-12"
            aria-live="polite"
          >
            {'Transformamos sua '}
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                transition={{ duration: 0.7, ease: EASE_PREMIUM }}
                className="text-orange-400 italic"
              >
                {CYCLING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          {/* Body copy — contraste melhorado */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_PREMIUM }}
            className="text-lg text-slate-300 font-light leading-[1.85] tracking-[0.01em] mb-14 max-w-xl"
          >
            Tecnologia de ponta, atendimento humanizado e um time que cuida
            do seu sorriso em duas unidades em Uberaba.
          </motion.p>

          {/* CTA único com geofencing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_PREMIUM }}
          >
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-5 rounded-full text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-2 hover:scale-[1.02] animate-cta-glow"
            >
              Agendar Avaliação Gratuita
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="flex flex-wrap items-center gap-6 mt-12"
          >
            <div className="flex items-center gap-2">
              <div className="flex" aria-label="Avaliação 4,6 de 5 estrelas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF6B2B" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-slate-300 text-sm">
                <strong className="text-white font-semibold">4,6</strong> no Google
              </span>
            </div>
            <div className="w-px h-4 bg-white/12 hidden sm:block" aria-hidden="true" />
            <span className="text-slate-400 text-sm tracking-wide">+5.000 sorrisos transformados</span>
            <div className="w-px h-4 bg-white/12 hidden sm:block" aria-hidden="true" />
            <span className="text-slate-400 text-sm tracking-wide">Avaliação gratuita</span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/20">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
