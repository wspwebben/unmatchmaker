import { ref, computed, watch, readonly } from 'vue'
import { SetCode } from '../consts'

const STORAGE_KEY = 'unmatchmaker-active-sets'

// Initialize from localStorage or default to all sets active
function getInitialActiveSets(): Set<SetCode> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as string[]
      return new Set(parsed.filter(code => Object.values(SetCode).includes(code as SetCode)) as SetCode[])
    }
  } catch (error) {
    console.warn('Failed to parse active sets from localStorage:', error)
  }

  // Default to all sets active
  return new Set(Object.values(SetCode))
}

const activeSets = ref<Set<SetCode>>(getInitialActiveSets())

// Save to localStorage whenever activeSets changes
watch(activeSets, (newActiveSets) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newActiveSets)))
  } catch (error) {
    console.warn('Failed to save active sets to localStorage:', error)
  }
}, { deep: true })

export function useActiveSets() {
  const isSetActive = computed(() => (set: SetCode) => activeSets.value.has(set))

  const toggleSet = (set: SetCode) => {
    if (activeSets.value.has(set)) {
      activeSets.value.delete(set)
    } else {
      activeSets.value.add(set)
    }
  }

  const activateSet = (set: SetCode) => {
    activeSets.value.add(set)
  }

  const deactivateSet = (set: SetCode) => {
    activeSets.value.delete(set)
  }

  const activateAllSets = () => {
    activeSets.value = new Set(Object.values(SetCode))
  }

  const deactivateAllSets = () => {
    activeSets.value.clear()
  }

  const toggleAllSets = () => {
    if (activeSets.value.size === Object.values(SetCode).length) {
      deactivateAllSets()
    } else {
      activateAllSets()
    }
  }

  const activeSetsCount = computed(() => activeSets.value.size)

  const totalSetsCount = computed(() => Object.values(SetCode).length)

  const allSetsActive = computed(() => activeSets.value.size === Object.values(SetCode).length)

  const noSetsActive = computed(() => activeSets.value.size === 0)

  return {
    activeSets: readonly(activeSets),
    isSetActive,
    toggleSet,
    activateSet,
    deactivateSet,
    activateAllSets,
    deactivateAllSets,
    toggleAllSets,
    activeSetsCount,
    totalSetsCount,
    allSetsActive,
    noSetsActive
  }
}
