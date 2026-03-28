'use client'

import type { JSX } from 'react'
import { motion } from 'framer-motion'

interface Partner {
  name: string
  category: string
}

const PARTNERS: Partner[] = [
  { name: 'Invisalign', category: 'Doctor Provider' },
  { name: 'Straumann', category: 'Implants' },
  { name: 'E.max', category: 'Lentes Cerâmicas' },
  { name: 'CFO', category: 'Conselho Federal' },
  { name: 'CRO-MG', category: 'Conselho Regional' },
]

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export default function TrustBadgesSection(): JSX.Element {
  return (
    <section
      className="py-16 md:py-20 bg-white border-b border-slate-100"
      aria-label="Certificações e parcerias"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="text-center text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] mb-10"
        >
          Tecnologia e Parcerias de Alto Padrão
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center gap-1 px-6 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100 transition-all duration-300"
            >
              <span className="text-slate-700 font-semibold text-sm tracking-wide">
                {partner.name}
              </span>
              <span className="text-slate-400 text-[10px] tracking-widest uppercase">
                {partner.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
