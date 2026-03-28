'use client'

import type { JSX } from 'react'
import { motion } from 'framer-motion'

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

interface DoctorCard {
  name: string
  cro: string
  epao: string
  unit: string
  specialties: string[]
  photoLabel: string
}

const DOCTORS: DoctorCard[] = [
  {
    name: 'Dra. Renata F. R. Menezes',
    cro: 'CRO MG57107',
    epao: 'EPAO 15527',
    unit: 'Unidade Centro',
    specialties: ['Implantodontia', 'Prótese Dentária', 'Reabilitação Oral'],
    photoLabel: 'Foto da Dra. Renata',
  },
  {
    name: 'Dra. Luana A. Barreto',
    cro: 'CRO MG44478',
    epao: 'EPAO 15630',
    unit: 'Unidade Boa Vista',
    specialties: ['Ortodontia', 'Invisalign', 'Estética Dental'],
    photoLabel: 'Foto da Dra. Luana',
  },
]

export default function EquipeSection(): JSX.Element {
  return (
    <section className="py-32 md:py-44 bg-navy-900" aria-label="Nossa Equipe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Nossa Equipe
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-white leading-[1.1] tracking-[-0.02em] text-balance mb-5">
            Seu sorriso em{' '}
            <span className="text-orange-500 italic">boas mãos</span>
          </h2>
          <p className="text-white/40 text-lg font-light leading-[1.85]">
            Profissionais especializadas, comprometidas com excelência e
            atualização constante para os melhores resultados.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {DOCTORS.map((doctor, i) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: EASE_PREMIUM }}
              className="bg-navy-800 border border-white/[0.06] rounded-3xl overflow-hidden"
            >
              {/* Slot de foto — retrato */}
              <div className="bg-neutral-100 border-b-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-center p-10 min-h-[280px] group hover:bg-orange-50/60 hover:border-orange-300 transition-all duration-300 aspect-[4/3]">
                <div className="w-14 h-14 rounded-full bg-neutral-200 group-hover:bg-orange-100 flex items-center justify-center mb-4 transition-colors duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-neutral-400 group-hover:text-orange-400 transition-colors" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-neutral-600 font-semibold text-sm mb-1">{doctor.photoLabel}</p>
                <p className="text-neutral-400 text-xs">Foto profissional — retrato</p>
              </div>

              {/* Informações da profissional */}
              <div className="p-7">
                <div className="mb-1">
                  <span className="text-orange-400/70 text-[11px] font-medium tracking-widest uppercase">
                    {doctor.unit}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-light text-white tracking-[-0.01em] mb-1">
                  {doctor.name}
                </h3>
                <p className="text-white/30 text-[11px] tracking-wider mb-5">
                  {doctor.cro} · {doctor.epao}
                </p>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialties.map((s) => (
                    <span
                      key={s}
                      className="bg-white/5 text-white/50 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/8 tracking-wide"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
