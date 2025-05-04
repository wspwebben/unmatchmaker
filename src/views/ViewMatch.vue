<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { type HeroCode, type MapCode, heroImages, heroNames, mapImages, mapNames } from '../consts'
import { type DraftType } from '../types/draft'
import TeamCaption from '../components/match/TeamCaption.vue'

const route = useRoute()

const teamAHeroes = computed(() => (route.query.teamA as string).split(',') as HeroCode[])
const teamBHeroes = computed(() => (route.query.teamB as string).split(',') as HeroCode[])
const selectedMap = computed(() => route.query.map as MapCode)
const firstTeam = computed(() => route.query.first as 'A' | 'B')

const draftType = computed(() => route.query.type as DraftType)
const opponentCaption = computed(() => {
  if (draftType.value === 'duel') {
    return 'Player'
  }

  return 'Team'
})
</script>

<template>
  <div class="container">
    <h1 class="title">Match</h1>

    <div class="match-layout">
      <template v-if="draftType === 'duel'">
        <div class="duel-heroes">
          <div class="duel-captions">
            <TeamCaption
              team="A"
              :name="`${opponentCaption} A`"
              :is-first="firstTeam === 'A'"
            />
            <TeamCaption
              team="B"
              :name="`${opponentCaption} B`"
              :is-first="firstTeam === 'B'"
            />
          </div>
          <div class="hero-grid duel">
            <div v-for="hero in teamAHeroes" :key="hero" class="hero-card team-a">
              <img :src="heroImages[hero]" :alt="heroNames[hero]" />
              <div class="hero-name">{{ heroNames[hero] }}</div>
            </div>
            <div v-for="hero in teamBHeroes" :key="hero" class="hero-card team-b">
              <img :src="heroImages[hero]" :alt="heroNames[hero]" />
              <div class="hero-name">{{ heroNames[hero] }}</div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="draftType === 'team'">

        <div class="team-section">
          <TeamCaption
            team="A"
          :name="`${opponentCaption} A`"
          :is-first="firstTeam === 'A'"
        />
        <div class="hero-grid">
          <div v-for="hero in teamAHeroes" :key="hero" class="hero-card">
            <img :src="heroImages[hero]" :alt="heroNames[hero]" />
            <div class="hero-name">{{ heroNames[hero] }}</div>
          </div>
          </div>
        </div>

        <div class="team-section">
          <TeamCaption
            team="B"
            :name="`${opponentCaption} B`"
            :is-first="firstTeam === 'B'"
          />
          <div class="hero-grid">
            <div v-for="hero in teamBHeroes" :key="hero" class="hero-card">
              <img :src="heroImages[hero]" :alt="heroNames[hero]" />
              <div class="hero-name">{{ heroNames[hero] }}</div>
            </div>
          </div>
        </div>
      </template>

      <div class="map-section">
        <h2 class="section-title">Map</h2>
        <div class="map-card">
          <img :src="mapImages[selectedMap]" :alt="mapNames[selectedMap]" />
          <div class="map-name">{{ mapNames[selectedMap] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  --team-a-color: #4a90e2;
  --team-b-color: #e24a4a;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px;
}

.team-a {
  --team-color: var(--team-a-color);
}

.team-b {
  --team-color: var(--team-b-color);
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

.hero-grid {
  display: grid;
  gap: 0.75rem;
}

.hero-grid:not(.duel) {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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

.duel-heroes {
  grid-column: 1 / -1;
  margin-top: 1rem;
}

.duel-captions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.hero-grid.duel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.hero-card.team-a {
  border-left: 4px solid var(--team-a-color);
}

.hero-card.team-b {
  border-left: 4px solid var(--team-b-color);
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

  .section-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .duel-heroes {
    margin-top: 0.75rem;
  }

  .duel-captions {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
}
</style>
