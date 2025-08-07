import { computed } from 'vue'
import { setContents } from '../consts'
import { useActiveSets } from './useActiveSets'

export function useAvailableItems() {
  const { activeSets } = useActiveSets()

  const availableHeroes = computed(() => activeSets.value.flatMap(setCode => setContents[setCode].heroes))
  const availableMaps = computed(() => activeSets.value.flatMap(setCode => setContents[setCode].maps))

  return {
    availableHeroes,
    availableMaps
  }
}
