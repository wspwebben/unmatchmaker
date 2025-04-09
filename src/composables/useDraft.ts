import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { type DraftStep } from '../types/draft'
import { type HeroCode, type MapCode } from '../consts'

export function useDraft(scheme: DraftStep[]) {
  const router = useRouter()
  const currentStepIndex = ref(0)
  const steps = ref<DraftStep[]>([...scheme])

  const currentStep = computed<DraftStep>(() => steps.value[currentStepIndex.value])

  const unavailableHeroes = computed(() =>
    steps.value
      .filter(step => step.type === 'pick' || step.type === 'ban')
      .filter(step => step.value !== null)
      .map((step) => ({
        hero: step.value as HeroCode,
        reason: step,
      }))
  )

  const getHeroDraftStep = (hero: HeroCode): DraftStep | undefined =>
    unavailableHeroes.value.find(h => h.hero === hero)?.reason

  const needToMakeChoice = computed(() =>
    steps.value.some(step => step.type === 'choice')
  )

  const handleStepComplete = () => {
    const nextStepIndex = currentStepIndex.value + 1

    if (nextStepIndex === steps.value.length) {
      const pickedHeroes = steps.value.filter(step => step.type === 'pick')
      const teamAHeroes = pickedHeroes.filter(step => step.team === 'A').map(step => step.value)
      const teamBHeroes = pickedHeroes.filter(step => step.team === 'B').map(step => step.value)
      const selectedMap = steps.value.find(step => step.type === 'map')!
      const selectedPosition = steps.value.find(step => step.type === 'position')!
      const firstTeam = selectedPosition.value === 1 ? selectedPosition.team : selectedMap.team

      return router.push({
        name: 'team-match',
        query: {
          teamA: teamAHeroes.join(','),
          teamB: teamBHeroes.join(','),
          map: selectedMap.value,
          first: firstTeam,
        },
      })
    }

    currentStepIndex.value = nextStepIndex
  }

  const selectHero = (hero: HeroCode) => {
    if (currentStep.value.type !== 'pick' && currentStep.value.type !== 'ban') {
      return
    }

    if (getHeroDraftStep(hero)) {
      return
    }

    steps.value[currentStepIndex.value].value = hero
    handleStepComplete()
  }

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

  return {
    steps,
    currentStep,
    currentStepIndex,
    needToMakeChoice,
    getHeroDraftStep,
    selectHero,
    selectMap,
    selectPosition,
  }
}
