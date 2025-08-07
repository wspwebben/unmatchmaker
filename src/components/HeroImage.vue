<script setup lang="ts">
import { type HeroCode, heroImages, heroNames } from '../consts'

defineProps<{
  hero: HeroCode
}>()
</script>

<template>
  <img
    :src="heroImages[hero]"
    :alt="heroNames[hero]"
    class="hero-image"
  />
</template>

<style scoped>
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
</style>

