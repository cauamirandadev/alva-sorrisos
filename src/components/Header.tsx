'use client'

import { useState, useEffect } from 'react'
import type { JSX } from 'react'
import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

interface HeaderProps {
  /** Abre o modal em modo geolocalização (detecta unidade mais próxima) */
  onOpenModalAuto: () => void
}

const NAV_LINKS = [
  { href: '#tratamentos', label: 'Tratamentos' },
  { href: '#por-que-alva', label: 'Por que a Alva?' },
  { href: '#unidades', label: 'Unidades' },
] as const

export default function Header({ onOpenModalAuto }: HeaderProps): JSX.Element {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleCtaClick() {
    trackEvent('click_cta_header', { unit: 'centro' })
    onOpenModalAuto()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/85 backdrop-blur-xl shadow-xl shadow-black/25 border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo real da Alva Sorrisos */}
          <a href="#" className="flex items-center group" aria-label="Alva Sorrisos — Início">
            <Image
              src="/logo.png"
              alt="Alva Sorrisos"
              width={68}
              height={92}
              priority
              className="object-contain h-16 w-auto transition-opacity duration-300 group-hover:opacity-85"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Menu principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/55 hover:text-white text-sm font-medium tracking-wide transition-all duration-200 hover:text-orange-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={handleCtaClick}
            className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/35 hover:-translate-y-0.5 animate-cta-glow"
          >
            Agendar Avaliação
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-navy-800/95 backdrop-blur-xl rounded-2xl mb-4 p-5 flex flex-col gap-1 animate-fade-in border border-white/[0.07] shadow-2xl shadow-black/40">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/65 hover:text-white text-sm font-medium py-3 px-2 border-b border-navy-700 last:border-0 transition-colors hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); handleCtaClick() }}
              className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
            >
              Agendar Avaliação
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
