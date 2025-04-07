<script setup lang="ts">
import { useDraftPool } from '../composables/useDraftPool'

const { availableHeroes, availableMaps } = useDraftPool()

</script>

<template>
  <div>
    {{ availableHeroes }}
    {{ availableMaps }}
  </div>
</template>
