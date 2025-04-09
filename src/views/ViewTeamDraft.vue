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

const currentStep = computed(() => steps.value[currentStepIndex.value])

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
      return `Team ${step.team}: Pick a hero`
    case 'ban':
      return `Team ${step.team}: Ban a hero`
    case 'choice':
      return `Team ${step.team}: Choose map or position`
    case 'map':
      return `Team ${step.team}: Select a map`
    case 'position':
      return `Team ${step.team}: Choose turn order`
    case 'final':
      return `Team ${step.team}: ${steps.value[currentStepIndex.value - 1].type === 'map' ? 'Choose turn order' : 'Select a map'}`
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
    <div class="status">
      <h2>{{ phaseText }}</h2>
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
          <div class="pick-value">
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
      <div class="position-buttons">
        <button class="choice-button" @click="selectPosition(1)">Go First</button>
        <button class="choice-button" @click="selectPosition(2)">Go Second</button>
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
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.status {
  text-align: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.draft-layout {
  display: grid;
  gap: 20px;
}

.draft-status {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.team-picks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pick-row {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: white;
  border-radius: 4px;
  align-items: center;
  border-left: 4px solid transparent;
  transition: all 0.2s;
}

.pick-row.active {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

.pick-row.team-a {
  border-left-color: #4a90e2;
}

.pick-row.team-b {
  border-left-color: #e24a4a;
}

.pick-label {
  font-weight: 500;
  text-transform: capitalize;
}

.pick-value {
  font-weight: 600;
  color: #4a90e2;
}

.selection-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section, .sidebar-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.section h3, .sidebar-section h3 {
  margin: 0 0 15px 0;
  font-size: 1.2rem;
}

.cards {
  display: grid;
  gap: 15px;
}

.hero-cards {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}

.map-cards {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.card {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 10px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 0.9rem;
}

.card-status {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.card.map {
  aspect-ratio: 16/9;
}

.card.map img {
  height: 100%;
  object-fit: cover;
}

.position-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.choice-button {
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.choice-button:hover {
  background-color: #357abd;
}

@media (min-width: 768px) {
  .draft-layout {
    grid-template-columns: 300px 1fr;
  }

  .draft-status {
    position: sticky;
    top: 20px;
    align-self: start;
  }
}

@media (max-width: 1024px) {
  .options-row {
    grid-template-columns: 1fr;
  }
}
</style>
