<template>
  <div class="random-container">
    <div class="random-content">
      <header class="header">
        <h1 class="title">Random Maps</h1>
      </header>

      <ul class="results" v-if="randomItems.length > 0">
        <li
          v-for="map in randomItems"
          :key="map"
        >
        <MapCard
          :key="map"
          :map="map"
          :draft-step="undefined"
          :on-click="() => {}"
        />
        </li>
      </ul>
    </div>

    <div class="controls">
        <div class="controls-content">
          <div class="control-group">
            <label for="count" class="control-label">Count:</label>
            <input
              id="count"
              v-model.number="count"
              type="number"
              min="1"
              :max="maxCount"
              class="control-input"
            />
          </div>

          <button
            @click="generateRandomItems"
            class="generate-button"
          >
            Generate New
          </button>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useRandomGenerator } from '../composables/useRandomGenerator'
import { useAvailableItems } from '../composables/useAvailableItems'
import MapCard from '../components/draft/MapCard.vue'
import type { MapCode } from '../consts'

const { availableMaps } = useAvailableItems()

const {
  count,
  maxCount,
  randomItems,
  generateRandomItems
} = useRandomGenerator<MapCode>(availableMaps, 3)
</script>

<style scoped>
.random-container {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 20px;
}

.random-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.controls {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.controls-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.1rem;
}

.control-input {
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  width: 80px;
  text-align: center;
  transition: border-color 0.2s;
}

.control-input:focus {
  outline: none;
  border-color: #4a90e2;
}

.generate-button {
  background: #4a90e2;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.generate-button:hover {
  background: #357abd;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.generate-button:active {
  transform: translateY(0);
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0;
}

.results li {
  list-style: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .random-container {
    padding: 16px;
  }

  .title {
    font-size: 2rem;
  }

  .controls {
    padding: 20px;
  }

  .controls-content {
    flex-direction: column;
    gap: 16px;
  }

  .control-group {
    width: 100%;
    justify-content: center;
  }

  .generate-button {
    width: 100%;
    max-width: 200px;
  }

  .results {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.75rem;
  }

  .results {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
}
</style>
