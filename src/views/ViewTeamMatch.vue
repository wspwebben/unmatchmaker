<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { type HeroCode, type MapCode, heroImages, heroNames, mapImages, mapNames } from '../consts'

const route = useRoute()

const teamAHeroes = computed(() => (route.query.teamA as string).split(',') as HeroCode[])
const teamBHeroes = computed(() => (route.query.teamB as string).split(',') as HeroCode[])
const selectedMap = computed(() => route.query.map as MapCode)
const firstTeam = computed(() => route.query.first as 'A' | 'B')
</script>

<template>
  <div class="container">
    <h1 class="title">Team Match</h1>

    <div class="match-layout">
      <!-- Team A -->
      <div class="team-section">
        <h2 class="team-title" :class="{ 'goes-first': firstTeam === 'A' }">
          Team A {{ firstTeam === 'A' ? '(First)' : '(Second)' }}
        </h2>
        <div class="hero-grid">
          <div v-for="hero in teamAHeroes" :key="hero" class="hero-card">
            <img :src="heroImages[hero]" :alt="heroNames[hero]" />
            <div class="hero-name">{{ heroNames[hero] }}</div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="map-section">
        <h2 class="section-title">Map</h2>
        <div class="map-card">
          <img :src="mapImages[selectedMap]" :alt="mapNames[selectedMap]" />
          <div class="map-name">{{ mapNames[selectedMap] }}</div>
        </div>
      </div>

      <!-- Team B -->
      <div class="team-section">
        <h2 class="team-title" :class="{ 'goes-first': firstTeam === 'B' }">
          Team B {{ firstTeam === 'B' ? '(First)' : '(Second)' }}
        </h2>
        <div class="hero-grid">
          <div v-for="hero in teamBHeroes" :key="hero" class="hero-card">
            <img :src="heroImages[hero]" :alt="heroNames[hero]" />
            <div class="hero-name">{{ heroNames[hero] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.match-layout {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
}

.team-section {
  border-radius: 8px;
}

.team-title {
  text-align: center;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.team-title.goes-first {
  color: #4a90e2;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.hero-card {
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
}

.hero-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.25rem;
}

.hero-name {
  font-weight: 500;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.map-section {
  border-radius: 8px;
  width: 180px;
}

.section-title {
  text-align: center;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.map-card {
  background: white;
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
}

.map-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.map-name {
  font-weight: 500;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .container {
    padding: 8px;
  }

  .match-layout {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .map-section {
    width: 100%;
    order: -1;
  }

  .hero-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .team-title, .section-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
