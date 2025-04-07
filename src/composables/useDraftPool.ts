import { useRoute } from 'vue-router'
import { type HeroCode, type MapCode, heroNames, mapNames } from '../consts'

export function useDraftPool() {
  const route = useRoute()

  // Extract heroes and maps from URL parameters
  const heroesParam = route.query.heroes as string || ''
  const mapsParam = route.query.maps as string || ''

  // Validation function
  const isHeroCode = (hero: string): hero is HeroCode => {
    return Object.keys(heroNames).includes(hero)
  }

  const isMapCode = (map: string): map is MapCode => {
    return Object.keys(mapNames).includes(map)
  }

  // Convert to arrays and filter invalid codes
  const availableHeroes = heroesParam.split(',').filter(isHeroCode)
  const availableMaps = mapsParam.split(',').filter(isMapCode)

  return {
    availableHeroes,
    availableMaps,
  }
}
