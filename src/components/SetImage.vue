<script setup lang="ts">
import { type SetCode, setImages, setNames } from '../consts'

defineProps<{
  set: SetCode
}>()
</script>

<template>
  <figure
    class="set-card"
  >
    <img :src="setImages[set]" :alt="setNames[set]" />
    <figcaption>{{ setNames[set] }}</figcaption>
  </figure>
</template>

<style scoped>
.set-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
