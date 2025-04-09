<script setup lang="ts">
import { computed } from 'vue';
import { type HeroCode, heroImages, heroNames } from '../../consts'
import { type DraftStep } from '../../types/draft'

const props = defineProps<{
  hero: HeroCode
  draftStep?: DraftStep
  onClick: () => void
}>()

const reasonText = computed (() => {
  switch (props.draftStep?.type) {
    case 'pick':
      return 'Picked'
    case 'ban':
      return 'Banned'
    default:
      return ''
  }
})

const disabled = computed(() => props.draftStep !== undefined)
</script>

<template>
  <div
    class="card"
    :class="{ 'not-available': disabled }"
    @click="onClick"
  >
    <div class="card-content">
      <img :src="heroImages[hero]" :alt="heroNames[hero]" />
      <div class="card-name">{{ heroNames[hero] }}</div>
    </div>
    <div class="card-status" :class="{ 'team-a': draftStep?.team === 'A', 'team-b': draftStep?.team === 'B' }" v-if="draftStep">
      {{ reasonText }}
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  background: white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.team-a {
  --team-color: var(--team-a-color);
}

.team-b {
  --team-color: var(--team-b-color);
}

.card:hover:not(.not-available) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card.not-available {
  cursor: not-allowed;
}

.card.not-available::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255, 0.5);
}

.card-content {
  position: relative;
}

.card-content img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
}

.card-name {
  text-align: center;
  font-weight: 500;
}

.card-status {
  position: absolute;
  z-index: 1;
  top: 8px;
  right: 8px;
  color: white;
  background: var(--team-color, rgba(0, 0, 0));
  opacity: 0.8;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

@media (max-width: 640px) {
  .card {
    padding: 8px;
  }
}
</style>
