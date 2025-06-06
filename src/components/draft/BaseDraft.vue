<script setup lang="ts">
import { useDraftPool } from '../../composables/useDraftPool'
import { useDraft } from '../../composables/useDraft'
import { type DraftStep, type DraftType } from '../../types/draft'
import { type HeroCode, type MapCode, heroNames, mapNames } from '../../consts'
import HeroCard from './HeroCard.vue'
import MapCard from './MapCard.vue'
import PositionButton from './PositionButton.vue'

interface Props {
  draftScheme: DraftStep[]
  draftType: DraftType
  teamNames: {
    a: string
    b: string
  }
}

const props = defineProps<Props>()

const { availableHeroes, availableMaps } = useDraftPool()
const {
  steps,
  mapStep,
  positionStep,
  currentStep,
  currentStepIndex,
  getHeroDraftStep,
  selectHero,
  selectMap,
  selectPosition,
} = useDraft(props.draftType, props.draftScheme)

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

const getStepText = (step: DraftStep) => {
  switch (step.type) {
    case 'pick':
      return 'Pick a hero'
    case 'ban':
      return 'Ban a hero'
    case 'map':
      return 'Select a map'
    case 'position':
      return 'Choose turn order'
    case 'choice':
      return 'Choose map or position'
    default:
      return 'Unknown step'
  }
}

const getTeamName = (team: 'A' | 'B') => {
  return team === 'A' ? props.teamNames.a : props.teamNames.b
}
</script>

<template>
  <div class="container">
    <div class="sticky-header" :class="{ 'team-a': currentStep?.team === 'A', 'team-b': currentStep?.team === 'B' }">
      <h1 class="phase-text">
        <span class="phase-team-text">{{ getTeamName(currentStep.team) }}:</span>
        <span class="phase-step-text">{{ getStepText(currentStep) }}</span>
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
            {{ getTeamName(step.team) }}: {{ step.type }}
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
          :draft-step="mapStep"
          @click="selectMap(map)"
        />
      </div>

      <div class="position-buttons">
        <PositionButton :position="1" :draft-step="positionStep" @click="selectPosition(1)" />
        <PositionButton :position="2" :draft-step="positionStep" @click="selectPosition(2)" />
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
  background-color: var(--team-color);
  color: white;
  border-bottom: 1px solid #000000b3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sticky-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
