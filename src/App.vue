<script setup lang="ts">
import { heroes, maps } from './consts'

// Convert heroes object to flat array of all heroes
const allHeroes = Object.values(heroes).flat()

// Convert maps object to flat array of all maps
const allMaps = Object.values(maps).flat()

// Select 7 heroes and 3 maps
const selectedHeroes = [...allHeroes].sort(() => Math.random() - 0.5).slice(0, 7)
const selectedMaps = [...allMaps].sort(() => Math.random() - 0.5).slice(0, 3)

const cardColors = [
  '#FF9B9B', // soft red
  '#9BDFFF', // soft blue
  '#B1FF9B', // soft green
  '#FFE59B', // soft yellow
  '#E09BFF', // soft purple
  '#FF9BE0', // soft pink
  '#9BFFF1', // soft turquoise
]
</script>

<template>
  <div class="container">
    <h1>Unmatchmaker</h1>

    <div class="row">
      <h2>Heroes (7)</h2>
      <div class="cards">
        <div
          v-for="(hero, index) in selectedHeroes"
          :key="hero"
          class="card"
          :style="{ backgroundColor: cardColors[index] }"
        >
          {{ hero }}
        </div>
      </div>
    </div>

    <div class="row">
      <h2>Maps (3)</h2>
      <div class="cards">
        <div
          v-for="(map, index) in selectedMaps"
          :key="map"
          class="card"
          :style="{ backgroundColor: cardColors[index] }"
        >
          {{ map }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.row {
  margin-bottom: 40px;
}

h2 {
  margin-bottom: 20px;
  color: #666;
  font-size: 1.2rem;
}

.cards {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  justify-content: center;
  overflow-x: auto;
}

.card {
  flex-shrink: 0;
  border-radius: 8px;
  padding: 20px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  color: #333;
  font-weight: 500;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
