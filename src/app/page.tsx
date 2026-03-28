'use client'

import { useState, useCallback } from 'react'
import type { JSX } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import TreatmentsSection from '@/components/TreatmentsSection'
import WhyAlvaSection from '@/components/WhyAlvaSection'
import ClinicStructureSection from '@/components/ClinicStructureSection'
import TransformacaoSection from '@/components/TransformacaoSection'
import EquipeSection from '@/components/EquipeSection'
import TrustBadgesSection from '@/components/TrustBadgesSection'
import Footer from '@/components/Footer'
import LeadModal from '@/components/LeadModal'
import type { Unit } from '@/lib/constants'

export default function Home(): JSX.Element {
  const [modalUnit, setModalUnit] = useState<Unit | null>(null)
  const [modalAutoDetect, setModalAutoDetect] = useState(false)

  // Botões com unidade explícita (Hero, Tratamentos, etc.) — sem geolocalização
  const openModal = useCallback((unit: Unit) => {
    setModalAutoDetect(false)
    setModalUnit(unit)
  }, [])

  // Botão genérico do Header — aciona geolocalização para detectar unidade mais próxima
  const openModalAuto = useCallback(() => {
    setModalAutoDetect(true)
    setModalUnit('centro') // fallback caso geolocalização seja negada
  }, [])

  const closeModal = useCallback(() => {
    setModalUnit(null)
    setModalAutoDetect(false)
  }, [])

  return (
    <>
      <Header onOpenModalAuto={openModalAuto} />
      <main>
        <HeroSection onOpenModalAuto={openModalAuto} />
        <TrustBadgesSection />
        <TreatmentsSection onOpenModal={openModal} />
        <WhyAlvaSection onOpenModal={openModal} />
        <ClinicStructureSection />
        <TransformacaoSection onOpenModal={openModal} />
        <EquipeSection />
      </main>
      <Footer />

      {modalUnit !== null && (
        <LeadModal
          unit={modalUnit}
          autoDetect={modalAutoDetect}
          onClose={closeModal}
        />
      )}
    </>
  )
}
