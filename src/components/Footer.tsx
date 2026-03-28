'use client'

import type { JSX } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Unit {
  name: string
  id: 'centro' | 'boa_vista'
  rt: string
  cro: string
  epao: string
  address: string
  neighborhood: string
  phone: string
  whatsapp: string
  hours: string
}

const UNITS: Unit[] = [
  {
    name: 'Unidade Centro',
    id: 'centro',
    rt: 'Dra. Renata F. R. Menezes',
    cro: 'CRO: MG57107',
    epao: 'EPAO: 15527',
    address: 'R. São Benedito, 39 — Centro',
    neighborhood: 'Uberaba — MG, 38022-100',
    phone: '(38) 9 9999-9991',
    whatsapp: '5538999999991',
    hours: 'Seg–Sex: 08h–18h | Sáb: 08h–12h',
  },
  {
    name: 'Unidade Boa Vista',
    id: 'boa_vista',
    rt: 'Dra. Luana A. Barreto',
    cro: 'CRO: MG44478',
    epao: 'EPAO: 15630',
    address: 'Av. Elías Cruvinel, 903 — Boa Vista',
    neighborhood: 'Uberaba — MG, 38070-100',
    phone: '(38) 9 9999-9992',
    whatsapp: '5538999999992',
    hours: 'Seg–Sex: 08h–18h | Sáb: 08h–12h',
  },
]

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

function WhatsAppIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.117 1.526 5.845L.057 23.082a.5.5 0 00.614.641l5.499-1.429A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  )
}

export default function Footer(): JSX.Element {
  return (
    <footer id="unidades" className="bg-navy-900 border-t border-white/[0.05]" aria-label="Rodapé">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-12">

          {/* Coluna da marca com logo real */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="lg:col-span-1"
          >
            <a href="#" className="inline-block mb-6" aria-label="Alva Sorrisos — Início">
              <Image
                src="/logo.png"
                alt="Alva Sorrisos"
                width={102}
                height={136}
                className="object-contain h-36 w-auto"
              />
            </a>

            <p className="text-white/30 text-[13px] leading-[1.9] max-w-xs mb-8 font-light tracking-[0.01em]">
              Clínica odontológica premium em Uberaba.
              Duas unidades para cuidar do seu sorriso com
              excelência e atenção humanizada.
            </p>

            <div className="flex items-center gap-2.5">
              <div className="flex" aria-label="Avaliação 4,6 de 5 no Google">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FF6B2B" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-white/35 text-xs tracking-wide">4,6 no Google</span>
            </div>
          </motion.div>

          {/* Unidades */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {UNITS.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE_PREMIUM }}
              >
                <h3 className="text-white font-semibold text-[15px] mb-1 tracking-wide">{unit.name}</h3>

                <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-5">
                  <span className="text-orange-400/70 text-[11px] font-medium tracking-wider uppercase">RT: {unit.rt}</span>
                  <span className="text-white/15 text-[11px]">·</span>
                  <span className="text-white/30 text-[11px] tracking-wider">{unit.cro}</span>
                  <span className="text-white/15 text-[11px]">·</span>
                  <span className="text-white/30 text-[11px] tracking-wider">{unit.epao}</span>
                </div>

                <ul className="space-y-3.5" aria-label={`Informações da ${unit.name}`}>
                  <li className="flex items-start gap-3 text-white/40 text-[13px] font-light leading-[1.7]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0 text-white/20" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span>
                      {unit.address}
                      <br />
                      <span className="text-white/20">{unit.neighborhood}</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-white/40 text-[13px] font-light">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-white/20" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.16 11.8 2 2 0 013.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {unit.phone}
                  </li>
                  <li className="flex items-center gap-3 text-white/40 text-[13px] font-light">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-white/20" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {unit.hours}
                  </li>
                </ul>

                <a
                  href={`https://wa.me/${unit.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 bg-transparent hover:bg-orange-500/10 text-orange-400 hover:text-orange-300 text-xs font-semibold px-5 py-2.5 rounded-full border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:-translate-y-0.5 tracking-wide"
                  aria-label={`Falar no WhatsApp — ${unit.name}`}
                >
                  <WhatsAppIcon />
                  Falar no WhatsApp
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/18 text-[11px] text-center sm:text-left tracking-wide">
            © {new Date().getFullYear()} Alva Sorrisos. Todos os direitos reservados.
          </p>
          <p className="text-white/12 text-[11px] text-center sm:text-right tracking-wide">
            Clínica regulamentada pelo CFO — Conselho Federal de Odontologia
          </p>
        </div>
      </div>
    </footer>
  )
}
