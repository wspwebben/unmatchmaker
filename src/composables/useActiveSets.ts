import { ref, computed } from 'vue'
import { SetCode } from '../consts'

const activeSets = ref<SetCode[]>([])

// Load active sets from localStorage on initialization
function loadActiveSets() {
  try {
    const stored = localStorage.getItem('activeSets')
    if (stored) {
      activeSets.value = JSON.parse(stored)
    } else {
      // Default to all sets active
      activeSets.value = Object.values(SetCode)
    }
  } catch (error) {
    console.error('Failed to load active sets:', error)
    activeSets.value = Object.values(SetCode)
  }
}

// Save active sets to localStorage
function saveActiveSets() {
  try {
    localStorage.setItem('activeSets', JSON.stringify(activeSets.value))
  } catch (error) {
    console.error('Failed to save active sets:', error)
  }
}

// Initialize on module load
loadActiveSets()

export function useActiveSets() {
  const isSetActive = (set: SetCode) => activeSets.value.includes(set)

  const toggleSet = (set: SetCode) => {
    if (isSetActive(set)) {
      activeSets.value = activeSets.value.filter(s => s !== set)
    } else {
      activeSets.value.push(set)
    }
    saveActiveSets()
  }

  const toggleAllSets = () => {
    if (allSetsActive.value) {
      activeSets.value = []
    } else {
      activeSets.value = Object.values(SetCode)
    }
    saveActiveSets()
  }

  const activeSetsCount = computed(() => activeSets.value.length)
  const totalSetsCount = computed(() => Object.values(SetCode).length)
  const allSetsActive = computed(() => activeSetsCount.value === totalSetsCount.value)

  return {
    isSetActive,
    toggleSet,
    toggleAllSets,
    activeSetsCount,
    totalSetsCount,
    allSetsActive,
    activeSets: computed(() => activeSets.value)
  }
}
