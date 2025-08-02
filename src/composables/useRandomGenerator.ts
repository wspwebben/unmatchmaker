import { computed, ref } from 'vue'
import type { HeroCode, MapCode } from '@/consts'
import { shuffle } from '@/helpers/shuffle'

export function useRandomGenerator<Code extends HeroCode | MapCode>(items: Code[], initialCount: number) {
  const count = ref(initialCount)
  const randomItems = ref<Code[]>([])

  const maxCount = computed(() => items.length)

  function generateRandomItems() {
    if (count.value > maxCount.value) {
      count.value = maxCount.value
    }

    randomItems.value = shuffle(items).slice(0, count.value)
  }

  return {
    count,
    maxCount,
    randomItems,
    generateRandomItems,
  }
}
