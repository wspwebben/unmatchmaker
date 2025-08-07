<script setup lang="ts">
import { type MapCode, mapImages, mapNames } from '../consts'

defineProps<{
  map: MapCode
}>()
</script>

<template>
  <img
    :src="mapImages[map]"
    :alt="mapNames[map]"
    class="map-image"
  />
</template>

<style scoped>
.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
</style>

