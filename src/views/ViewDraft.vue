<script setup lang="ts">
import { ref } from 'vue'
import { useDraftPool } from '../composables/useDraftPool'
import { type HeroCode, type MapCode, heroImages, mapImages, heroNames, mapNames } from '../consts'

type DraftPhase = 'ban1' | 'ban2' | 'pick1' | 'pick2' | 'choice' | 'final' | 'complete'

const { availableHeroes, availableMaps } = useDraftPool()

// Update the phase type to include both choices
const currentPhase = ref<DraftPhase>('ban1')
const currentPlayer = ref<1 | 2>(1)

// Results
const player1Hero = ref<HeroCode | null>(null)
const player2Hero = ref<HeroCode | null>(null)
const bannedHeroes = ref<HeroCode[]>([])
const selectedMap = ref<MapCode | null>(null)
const player2Choice = ref<'map' | 'position' | ''>('')
const whoGoesFirst = ref<1 | 2 | null>(null)

const phaseText = {
  ban1: 'Player 1: Ban a hero',
  ban2: 'Player 2: Ban a hero',
  pick1: 'Player 1: Pick your hero',
  pick2: 'Player 2: Pick your hero',
  choice: 'Player 2: Choose map or position',
  final: 'Player 1: Choose the remaining option',
  complete: 'Draft Complete!',
}

const handleCardClick = (item: HeroCode) => {
  switch (currentPhase.value) {
    case 'ban1':
    case 'ban2':
      bannedHeroes.value.push(item)
      currentPhase.value = currentPhase.value === 'ban1' ? 'ban2' : 'pick1'
      currentPlayer.value = currentPlayer.value === 1 ? 2 : 1
      break

    case 'pick1':
      player1Hero.value = item
      currentPhase.value = 'pick2'
      currentPlayer.value = 2
      break

    case 'pick2':
      player2Hero.value = item
      currentPhase.value = 'choice'
      break
  }
}

const handleMapSelect = (map: MapCode) => {
  selectedMap.value = map
  if (currentPhase.value === 'choice') {
    player2Choice.value = 'map'
    currentPhase.value = 'final'
  } else {
    currentPhase.value = 'complete'
  }
}

const handlePositionSelect = (isGoingFirst: boolean) => {
  if (currentPhase.value === 'choice') {
    // Player 2 is choosing
    player2Choice.value = 'position'
    whoGoesFirst.value = isGoingFirst ? 2 : 1
    currentPhase.value = 'final'
  } else {
    // Player 1 is choosing
    whoGoesFirst.value = isGoingFirst ? 1 : 2
    currentPhase.value = 'complete'
  }
}
</script>

<template>
  <div class="container">
    <h1>Unmatchmaker</h1>

    <div class="status">
      <h2>{{ phaseText[currentPhase] }}</h2>
    </div>

    <div class="draft-area" v-if="currentPhase !== 'complete'">
      <div class="section">
        <h3>Heroes</h3>
        <div class="cards">
          <div
            v-for="hero in availableHeroes"
            :key="hero"
            class="card"
            :class="{
              'not-available':
                currentPhase === 'choice' ||
                currentPhase === 'final' ||
                bannedHeroes.includes(hero) ||
                hero === player1Hero ||
                hero === player2Hero,
              player1: hero === player1Hero,
              player2: hero === player2Hero,
              banned: bannedHeroes.includes(hero),
            }"
            @click="
              !bannedHeroes.includes(hero) &&
              hero !== player1Hero &&
              hero !== player2Hero &&
              currentPhase !== 'choice' &&
              currentPhase !== 'final' &&
              handleCardClick(hero)
            "
          >
            <div class="card-content">
              <img :src="heroImages[hero]" :alt="heroNames[hero]" />
              <div class="card-name">{{ heroNames[hero] }}</div>
            </div>
            <div class="card-status" v-if="hero === player1Hero">Player 1</div>
            <div class="card-status" v-if="hero === player2Hero">Player 2</div>
            <div class="card-status" v-if="bannedHeroes.includes(hero)">Banned</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Maps</h3>
        <div class="cards">
          <div
            v-for="map in availableMaps"
            :key="map"
            class="card map"
            :class="{
              'not-available':
                (currentPhase !== 'choice' && currentPhase !== 'final') || selectedMap,
            }"
            @click="
              (currentPhase === 'choice' || currentPhase === 'final') &&
              !selectedMap &&
              handleMapSelect(map)
            "
          >
            <div class="card-content">
              <img :src="mapImages[map]" :alt="mapNames[map]" />
              <div class="card-name">{{ mapNames[map] }}</div>
            </div>
            <div class="card-status" v-if="map === selectedMap">Selected</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Position</h3>
        <div class="cards">
          <div
            class="card position"
            :class="{
              'not-available':
                (currentPhase !== 'choice' && currentPhase !== 'final') || whoGoesFirst !== null,
            }"
            @click="!whoGoesFirst && handlePositionSelect(true)"
          >
            Go First
          </div>
          <div
            class="card position"
            :class="{
              'not-available':
                (currentPhase !== 'choice' && currentPhase !== 'final') || whoGoesFirst !== null,
            }"
            @click="!whoGoesFirst && handlePositionSelect(false)"
          >
            Go Second
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentPhase === 'complete' && player1Hero && player2Hero && selectedMap" class="results">
      <div class="result-cards">
        <div class="result-card">
          <div class="turn-order">{{ whoGoesFirst === 1 ? 'First' : 'Second' }} Turn</div>
          <h3>Player 1</h3>
          <div class="card-content">
            <img :src="heroImages[player1Hero]" :alt="heroNames[player1Hero]" />
            <div class="hero-name">{{ heroNames[player1Hero] }}</div>
          </div>
        </div>

        <div class="result-card">
          <div class="turn-order">{{ whoGoesFirst === 2 ? 'First' : 'Second' }} Turn</div>
          <h3>Player 2</h3>
          <div class="card-content">
            <img :src="heroImages[player2Hero]" :alt="heroNames[player2Hero]" />
            <div class="hero-name">{{ heroNames[player2Hero] }}</div>
          </div>
        </div>
      </div>

      <div class="result-card map-result">
        <h3>Map</h3>
        <div class="card-content">
          <img :src="mapImages[selectedMap]" :alt="mapNames[selectedMap]" />
          <div class="map-name">{{ mapNames[selectedMap] }}</div>
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
  padding: 8px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.status {
  text-align: center;
  margin: 16px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.status h2 {
  font-size: 1.1rem;
}

.draft-info {
  margin-bottom: 20px;
}

.section {
  margin-bottom: 24px;
}

.section h3 {
  margin-bottom: 12px;
  font-size: 1.2rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  padding: 8px 0;
  width: 100%;
}

.card {
  position: relative;
  border-radius: 8px;
  padding: 6px;
  height: 180px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  cursor: pointer;
  background-color: #ffffff;
  overflow: hidden;
  padding-bottom: 24px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.card img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 4px;
}

.card.map {
  height: 180px;
}

.card.map img {
  height: 120px;
}

.card.position {
  height: 60px;
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.card.position:hover:not(.not-available) {
  background-color: #218838;
}

.results {
  text-align: center;
  padding: 20px 0;
}

.results h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.results h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.result-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 12px auto;
  padding: 0 20px;
  max-width: 800px;
}

.result-card {
  background-color: #f5f5f5;
  padding: 28px 16px 16px;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-card img {
  width: 100%;
  max-width: 220px;
  height: auto;
  object-fit: contain;
  margin: 8px auto;
}

.hero-name,
.map-name {
  font-size: 1.2rem;
  margin-top: 6px;
  font-weight: 500;
  text-align: center;
}

.turn-order {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4a90e2;
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
}

.map-result {
  margin-top: 28px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }

  .status h2 {
    font-size: 1.3rem;
  }

  .cards {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }

  .card {
    height: 260px;
    padding: 8px;
    padding-bottom: 24px;
  }

  .card img {
    height: 200px;
  }

  .card.map {
    height: 240px;
  }

  .card.map img {
    height: 180px;
  }

  .results {
    padding: 24px 0;
  }

  .results h2 {
    font-size: 2rem;
    margin-bottom: 24px;
  }

  .results h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  .result-cards {
    grid-template-columns: 1fr 1fr;
    max-width: none;
    padding: 0 24px;
    margin: 0 auto;
    gap: 24px;
  }

  .result-card {
    flex: 1;
    max-width: 250px;
    margin: 0 auto;
    padding: 28px;
  }

  .result-card img {
    max-width: 240px;
  }

  .hero-name,
  .map-name {
    font-size: 1.3rem;
  }

  .turn-order {
    font-size: 1.1rem;
    padding: 6px 16px;
    top: -18px;
  }

  .map-result {
    max-width: 600px;
    margin: 32px auto 0;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .card {
    height: 300px;
  }

  .card img {
    height: 240px;
  }

  .card.map {
    height: 350px;
  }

  .card.map img {
    height: 300px;
  }
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card.not-available {
  opacity: 0.5;
  cursor: not-allowed;
}

.card.not-available:hover {
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-name {
  font-weight: 500;
  text-align: center;
  padding: 4px;
  color: #333;
  font-size: 0.8rem;
  word-break: break-word;
}

.card-status {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0.8rem;
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card.banned {
  background-color: #ffe5e5;
}

.card.player1 {
  background-color: #e5f6ff;
}

.card.player2 {
  background-color: #e5ffe8;
}

.card.map {
  background-color: #fff8e5;
}

.card.map.selected,
.card.position.selected {
  border: 2px solid #ffd700;
}
</style>

