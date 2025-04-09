<script setup lang="ts">
import { useDraftPool } from '../composables/useDraftPool'
import { useDraft } from '../composables/useDraft'
import { type DraftStep } from '../types/draft'
import { type HeroCode, type MapCode, heroNames, mapNames } from '../consts'
import HeroCard from '../components/draft/HeroCard.vue'
import MapCard from '../components/draft/MapCard.vue'
import PositionButton from '../components/draft/PositionButton.vue'

const draftScheme: DraftStep[] = [
  { type: 'pick', team: 'A', value: null },
  { type: 'pick', team: 'B', value: null },
  { type: 'ban', team: 'A', value: null },
  { type: 'ban', team: 'B', value: null },
  { type: 'pick', team: 'B', value: null },
  { type: 'pick', team: 'A', value: null },
  { type: 'choice', team: 'B', value: null },
  { type: 'final', team: 'A', value: null },
]

const { availableHeroes, availableMaps } = useDraftPool()
const {
  currentStep,
  currentStepIndex,
  steps,
  getHeroDraftStep,
  selectHero,
  selectMap,
  selectPosition,
} = useDraft(draftScheme)

const getStepDisplay = (step: DraftStep) => {
  if (!step.value) return ''

  switch (step.type) {
    case 'pick':
    case 'ban':
      return heroNames[step.value as HeroCode]
    case 'map':
      return mapNames[step.value as MapCode]
    case 'position':
      return `Goes ${step.value === 1 ? 'First' : 'Second'}`
    case 'choice':
      return `Chose ${step.value}`
    default:
      return ''
  }
}
</script>

<template>
  <div class="container">
    <div class="sticky-header">
      <h1 class="phase-text" :class="{ 'team-a': currentStep?.team === 'A', 'team-b': currentStep?.team === 'B' }">
        <span class="phase-team-text">Team {{ currentStep.team }}:</span>
        <span class="phase-step-text">
          {{ currentStep.type === 'pick' ? 'Pick a hero' :
             currentStep.type === 'ban' ? 'Ban a hero' :
             currentStep.type === 'map' ? 'Select a map' :
             currentStep.type === 'position' ? 'Choose turn order' :
             currentStep.type === 'choice' ? 'Choose map or position' :
             'Unknown step' }}
        </span>
      </h1>
    </div>

    <div class="draft-layout">
      <div class="team-picks">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="pick-row"
          :class="{
            'team-a': step.team === 'A',
            'team-b': step.team === 'B',
            'active': currentStepIndex === index
          }"
        >
          <div class="pick-label">
            Team {{ step.team }} {{ step.type }}
          </div>
          <div class="pick-value" :class="{ 'team-a': step.team === 'A', 'team-b': step.team === 'B' }">
            {{ getStepDisplay(step) }}
          </div>
        </div>
      </div>

      <div class="cards hero-cards">
        <HeroCard
          v-for="hero in availableHeroes"
          :key="hero"
          :hero="hero"
          :draft-step="getHeroDraftStep(hero)"
          @click="selectHero(hero)"
        />
      </div>

      <div class="cards map-cards">
        <MapCard
          v-for="map in availableMaps"
          :key="map"
          :map="map"
          @click="selectMap(map)"
        />
      </div>

      <div class="position-buttons">
        <PositionButton :position="1" @click="selectPosition(1)" />
        <PositionButton :position="2" @click="selectPosition(2)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  --team-a-color: #4a90e2;
  --team-b-color: #e24a4a;
  --header-height: 1.5lh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px;
  padding-top: calc(var(--header-height) + 24px);
}

.team-a {
  --team-color: var(--team-a-color);
}

.team-b {
  --team-color: var(--team-b-color);
}

.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sticky-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: -1;
}

.phase-text {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 16px;
  transition: color 0.2s;
}

.phase-team-text {
  color: var(--team-color);
}

.phase-step-text {
  font-size: 0.9em;
  font-weight: inherit;
  margin-left: 0.5ch;
}

.draft-layout {
  display: grid;
  gap: 20px;
}

.team-picks {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pick-row {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border-radius: 4px;
  border-left: 4px solid var(--team-color);
}

.pick-row.active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

.pick-label {
  font-weight: 500;
  text-transform: capitalize;
}

.pick-value {
  font-weight: 600;
  color: var(--team-color);
}

.cards {
  display: grid;
  gap: 16px;
}

.hero-cards {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}

.map-cards {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.position-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 640px) {
  .container {
    padding: 8px;
    padding-top: calc(var(--header-height) + 16px);
  }

  .sticky-header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .phase-text {
    font-size: 1.25rem;
    padding: 12px;
  }

  .draft-layout {
    gap: 12px;
  }

  .team-picks {
    padding: 12px;
  }

  .pick-row {
    padding: 8px 12px;
  }

  .cards {
    gap: 12px;
  }

  .hero-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .map-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .position-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
