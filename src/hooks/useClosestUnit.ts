import { useState, useEffect } from 'react'
import type { Unit } from '@/lib/constants'

// Coordenadas aproximadas das unidades em Uberaba
const CLINIC_COORDS: Record<Unit, { lat: number; lng: number }> = {
  centro:    { lat: -19.7543, lng: -47.9391 }, // R. São Benedito, 39
  boa_vista: { lat: -19.7331, lng: -47.9255 }, // Av. Elías Cruvinel, 903
}

/**
 * Fórmula de Haversine — distância em km entre dois pontos geográficos.
 * Precisão suficiente para distâncias curtas (< 50 km) sem ponto flutuante instável.
 */
function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function closestUnitFromCoords(lat: number, lng: number): Unit {
  const dCentro = haversineKm(lat, lng, CLINIC_COORDS.centro.lat, CLINIC_COORDS.centro.lng)
  const dBoaVista = haversineKm(lat, lng, CLINIC_COORDS.boa_vista.lat, CLINIC_COORDS.boa_vista.lng)
  return dBoaVista < dCentro ? 'boa_vista' : 'centro'
}

export interface UseClosestUnitResult {
  /** Unidade mais próxima detectada, ou null enquanto detectando / após erro */
  closestUnit: Unit | null
  /** true enquanto a API de geolocalização está processando */
  detecting: boolean
}

/**
 * Hook que aciona navigator.geolocation e retorna a unidade Alva Sorrisos
 * mais próxima do usuário usando a fórmula de Haversine.
 *
 * - enabled=false → não faz nada (para botões de unidade explícita)
 * - Permissão negada / sem suporte → detecting=false, closestUnit=null (fallback no chamador)
 */
export function useClosestUnit(enabled: boolean): UseClosestUnitResult {
  const [closestUnit, setClosestUnit] = useState<Unit | null>(null)
  const [detecting, setDetecting] = useState(false)

  useEffect(() => {
    if (!enabled) return
    if (typeof navigator === 'undefined' || !navigator.geolocation) return

    setDetecting(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setClosestUnit(closestUnitFromCoords(latitude, longitude))
        setDetecting(false)
      },
      () => {
        // Permissão negada ou timeout — fallback silencioso
        setDetecting(false)
      },
      { timeout: 6000, maximumAge: 120_000 },
    )
  }, [enabled])

  return { closestUnit, detecting }
}
