<script setup lang="ts">
import { computed } from 'vue'
import { type PositionStep } from '../../types/draft'

const props = defineProps<{
  position: 1 | 2
  draftStep?: PositionStep
  onClick: () => void
}>()

const disabled = computed(() => !!props.draftStep?.value)
const isSelected = computed(() => props.draftStep?.value === props.position)
</script>

<template>
  <button
    class="choice-button"
    :class="{
      'team-a': draftStep?.team === 'A',
      'team-b': draftStep?.team === 'B',
      'selected': isSelected,
      'not-available': disabled && !isSelected
    }"
    @click="onClick"
  >
    Go {{ position === 1 ? 'First' : 'Second' }}
  </button>
</template>

<style scoped>
.choice-button {
  position: relative;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #000000b3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.team-a {
  --team-color: var(--team-a-color);
}

.team-b {
  --team-color: var(--team-b-color);
}

.choice-button:hover:not(.not-available) {
  opacity: 0.9;
}

.choice-button.not-available {
  cursor: not-allowed;
  opacity: 0.5;
}

.choice-button.selected {
  background-color: var(--team-color);
}

.button-status {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 0.7rem;
  opacity: 0.8;
}
</style>
