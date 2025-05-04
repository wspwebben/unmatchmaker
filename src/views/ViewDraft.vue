<script setup lang="ts">
import { type DraftStep } from '../types/draft'
import BaseDraft from '../components/draft/BaseDraft.vue'

const draftScheme: DraftStep[] = [
  { type: 'ban', team: 'A', value: null },
  { type: 'ban', team: 'B', value: null },
  { type: 'pick', team: 'A', value: null },
  { type: 'pick', team: 'B', value: null },
  { type: 'choice', team: 'B', value: null },
  { type: 'final', team: 'A', value: null },
]
</script>

<template>
  <BaseDraft
    :draft-scheme="draftScheme"
    :team-names="{ a: 'Player 1', b: 'Player 2' }"
  />
</template>

