<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDraftPool } from '../composables/useDraftPool'
import { type HeroCode, type MapCode, heroImages, heroNames, mapImages, mapNames } from '../consts'

interface BaseDraftStep {
  type: 'pick' | 'ban' | 'map' | 'position' | 'choice' | 'final'
  team: 'A' | 'B'
}

interface PickStep extends BaseDraftStep {
  type: 'pick'
  value: HeroCode | null
}

interface BanStep extends BaseDraftStep {
  type: 'ban'
  value: HeroCode | null
}

interface MapStep extends BaseDraftStep {
  type: 'map'
  value: MapCode | null
}

interface PositionStep extends BaseDraftStep {
  type: 'position'
  value: 1 | 2 | null
}

interface ChoiceStep extends BaseDraftStep {
  type: 'choice'
  value: 'map' | 'position' | null
}

interface FinalStep extends BaseDraftStep {
  type: 'final'
  value: null
}

type DraftStep = PickStep | BanStep | MapStep | PositionStep | ChoiceStep | FinalStep

const draftSteps: DraftStep[] = [
  { type: 'pick', team: 'A', value: null },
  { type: 'pick', team: 'B', value: null },
  { type: 'ban', team: 'A', value: null },
  { type: 'ban', team: 'B', value: null },
  { type: 'pick', team: 'B', value: null },
  { type: 'pick', team: 'A', value: null },
  { type: 'choice', team: 'B', value: null },
  { type: 'final', team: 'A', value: null },
]

const router = useRouter()
const { availableHeroes, availableMaps } = useDraftPool()

const currentStepIndex = ref(0)
const steps = ref<DraftStep[]>(draftSteps)

const currentStep = computed<DraftStep>(() => steps.value[currentStepIndex.value])

const unavailableHeroes = computed(() =>
  steps.value
    .filter(step => step.type === 'pick' || step.type === 'ban')
    .filter(step => step.value)
    .map((step) => ({
      hero: step.value,
      reason: step.type === 'ban' ? 'ban' : 'pick',
    }))
)

const isHeroDisabled = (hero: HeroCode) => unavailableHeroes.value.some(h => h.hero === hero)

const phaseText = computed(() => {
  const step = currentStep.value

  switch (step?.type) {
    case 'pick':
      return `Pick a hero`
    case 'ban':
      return `Ban a hero`
    case 'map':
      return `Select a map`
    case 'position':
      return `Choose turn order`
    case 'choice':
      return `Choose map or position`
    case 'final':
    default:
      return 'Unknown step'
  }
})

const handleStepComplete = () => {
  currentStepIndex.value++

  if (currentStepIndex.value === steps.value.length) {
    const pickedHeroes = steps.value.filter(step => step.type === 'pick')

    const teamAHeroes = pickedHeroes.filter(step => step.team === 'A').map(step => step.value)
    const teamBHeroes = pickedHeroes.filter(step => step.team === 'B').map(step => step.value)
    const selectedMap = steps.value.find(step => step.type === 'map')!
    const selectedPosition = steps.value.find(step => step.type === 'position')!

    const firstTeam = selectedPosition.value === 1 ? selectedPosition.team : selectedMap.team

    router.push({
      name: 'team-match',
      query: {
        teamA: teamAHeroes.join(','),
        teamB: teamBHeroes.join(','),
        map: selectedMap.value,
        first: firstTeam,
      },
    })
  }
}

const selectHero = (hero: HeroCode) => {
  if (currentStep.value.type !== 'pick' && currentStep.value.type !== 'ban') {
    return
  }

  if (isHeroDisabled(hero)) {
    return
  }

  steps.value[currentStepIndex.value].value = hero
  handleStepComplete()
}

const needToMakeChoice = computed(() => steps.value.some(step => step.type === 'choice'))

const makeChoice = (choice: 'map' | 'position') => {
  if (currentStep.value.type !== 'choice') return

  const choiceStep = steps.value.findIndex(step => step.type === 'choice')
  steps.value[choiceStep] = {
    type: choice,
    team: steps.value[choiceStep].team,
    value: null,
  }

  const finalStep = steps.value.findIndex(step => step.type === 'final')
  steps.value[finalStep] = {
    type: choice === 'map' ? 'position' : 'map',
    team: steps.value[finalStep].team,
    value: null,
  }
}

const selectMap = (map: MapCode) => {
  if (needToMakeChoice.value) {
    makeChoice('map')
  }

  if (currentStep.value.type !== 'map') return

  steps.value[currentStepIndex.value].value = map
  handleStepComplete()
}

const selectPosition = (position: 1 | 2) => {
  if (needToMakeChoice.value) {
    makeChoice('position')
  }

  if (currentStep.value.type !== 'position') return

  steps.value[currentStepIndex.value].value = position
  handleStepComplete()
}

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
        <span class="phase-step-text">{{ phaseText }}</span>
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
        <div
          v-for="hero in availableHeroes"
          :key="hero"
          class="card"
          :class="{
            'not-available': isHeroDisabled(hero),
          }"
          @click="selectHero(hero)"
        >
          <div class="card-content">
            <img :src="heroImages[hero]" :alt="heroNames[hero]" />
            <div class="card-name">{{ heroNames[hero] }}</div>
          </div>
          <div class="card-status" v-if="isHeroDisabled(hero)">
            {{ unavailableHeroes.find(h => h.hero === hero)!.reason === 'pick' ? 'Picked' : 'Banned' }}
          </div>
        </div>
      </div>

      <div class="cards map-cards">
        <div
          v-for="map in availableMaps"
          :key="map"
          class="card map"
          @click="selectMap(map)"
        >
          <div class="card-content">
            <img :src="mapImages[map]" :alt="mapNames[map]" />
            <div class="card-name">{{ mapNames[map] }}</div>
          </div>
        </div>
      </div>

      <div class="position-buttons">
        <button class="choice-button" @click="selectPosition(1)">Go First</button>
        <button class="choice-button" @click="selectPosition(2)">Go Second</button>
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

.card {
  background: white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.card:hover:not(.not-available) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card.not-available {
  opacity: 0.5;
  cursor: not-allowed;
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

.card.map img {
  aspect-ratio: 16/9;
  object-fit: cover;
}

.card-name {
  text-align: center;
  font-weight: 500;
}

.card-status {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.position-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.choice-button {
  padding: 12px 24px;
  font-size: 1rem;
  background-color: var(--team-a-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.choice-button:hover {
  opacity: 0.9;
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

  .card {
    padding: 8px;
  }

  .position-buttons {
    grid-template-columns: 1fr;
  }
}
</style>
