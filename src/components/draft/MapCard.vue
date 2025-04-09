<script setup lang="ts">
import { type MapCode, mapImages, mapNames } from '../../consts'

defineProps<{
  map: MapCode
  onClick: () => void
}>()
</script>

<template>
  <div class="card map" @click="onClick">
    <div class="card-content">
      <img :src="mapImages[map]" :alt="mapNames[map]" />
      <div class="card-name">{{ mapNames[map] }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

@media (max-width: 640px) {
  .card {
    padding: 8px;
  }
}
</style>
