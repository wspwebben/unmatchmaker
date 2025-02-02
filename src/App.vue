<script setup lang="ts">
import { heroes, maps, heroImages, mapImages } from './consts'
import { ref } from 'vue'

// Convert to arrays and shuffle initially, limiting to 7 heroes and 3 maps
const availableHeroes = ref(
  [...Object.values(heroes).flat()].sort(() => Math.random() - 0.5).slice(0, 7),
)
const availableMaps = ref(
  [...Object.values(maps).flat()].sort(() => Math.random() - 0.5).slice(0, 3),
)

// Update the phase type to include both choices
const currentPhase = ref<'ban1' | 'ban2' | 'pick1' | 'pick2' | 'choice' | 'final' | 'complete'>(
  'ban1',
)
const currentPlayer = ref<1 | 2>(1)

// Results
const player1Hero = ref<string>('')
const player2Hero = ref<string>('')
const bannedHeroes = ref<string[]>([])
const selectedMap = ref<string>('')
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

const handleCardClick = (item: string) => {
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

const handleMapSelect = (map: string) => {
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
              <img :src="heroImages[hero]" :alt="hero" />
              <div class="card-name">{{ hero }}</div>
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
              <img :src="mapImages[map]" :alt="map" />
              <div class="card-name">{{ map }}</div>
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

    <div v-if="currentPhase === 'complete'" class="results">
      <h2>Draft Results</h2>
      <div class="result-cards">
        <div class="result-card">
          <div class="turn-order">{{ whoGoesFirst === 1 ? 'First' : 'Second' }} Turn</div>
          <h3>Player 1</h3>
          <div class="card-content">
            <img :src="heroImages[player1Hero]" :alt="player1Hero" />
            <div class="hero-name">{{ player1Hero }}</div>
          </div>
        </div>

        <div class="result-card">
          <div class="turn-order">{{ whoGoesFirst === 2 ? 'First' : 'Second' }} Turn</div>
          <h3>Player 2</h3>
          <div class="card-content">
            <img :src="heroImages[player2Hero]" :alt="player2Hero" />
            <div class="hero-name">{{ player2Hero }}</div>
          </div>
        </div>
      </div>

      <div class="result-card map-result">
        <h3>Map</h3>
        <div class="card-content">
          <img :src="mapImages[selectedMap]" :alt="selectedMap" />
          <div class="map-name">{{ selectedMap }}</div>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.status {
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.draft-info {
  margin-bottom: 30px;
}

.section {
  margin-bottom: 30px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  overflow-x: auto;
  padding: 10px 0;
}

.cards.small .card {
  width: 100px;
  height: 100px;
  font-size: 0.9rem;
}

.card {
  position: relative;
  flex-shrink: 0;
  border-radius: 12px;
  padding: 8px;
  width: 220px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  cursor: pointer;
  background-color: #ffffff;
  overflow: hidden;
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
  height: 240px;
  object-fit: contain;
  margin-bottom: 4px;
}

.card-name {
  font-weight: 500;
  text-align: center;
  padding: 4px;
  color: #333;
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

.card.map,
.card.position {
  background-color: #fff8e5;
}

.card.map.selected,
.card.position.selected {
  border: 2px solid #ffd700;
}

.results {
  text-align: center;
  padding: 40px 0;
}

.result-cards {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 30px 0;
}

.result-card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  min-width: 320px;
  position: relative;
}

.turn-order {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4a90e2;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-weight: 500;
}

.hero-name {
  font-size: 1.4rem;
  margin-top: 10px;
  font-weight: 500;
}

.map-result {
  max-width: 600px;
  margin: 0 auto;
}

.map-name {
  font-size: 1.4rem;
  margin-top: 10px;
  font-weight: 500;
  color: #666;
}

h2,
h3 {
  color: #666;
  margin-bottom: 20px;
}

.position-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.card.position {
  background-color: #28a745;
  color: white;
  width: 200px;
  height: 60px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.card.position:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.card.position:active {
  background-color: #1e7e34;
  transform: translateY(0);
}

.position-result {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
}

.choices {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.choice-column {
  flex: 1;
}

.choice-column h3 {
  text-align: center;
}

.choice-column.map {
  flex: 2;
}

.choice-column.position {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.result-card img {
  width: 100%;
  height: 280px;
  object-fit: contain;
  margin: 12px 0;
}

.card.map {
  height: 350px;
  width: 500px;
}

.card.map img {
  height: 300px;
}
</style>
