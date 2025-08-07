<template>
  <div class="pool-container">
    <div class="pool-content">
      <header class="header">
        <h1 class="title">Available Sets</h1>

        <div class="controls">
          <div class="control-buttons">
            <button
              @click="toggleAllSets"
              class="control-btn"
            >
              {{ allSetsActive ? 'Deactivate All' : 'Activate All' }}
            </button>
          </div>

          <div class="active-sets-info">
            <span class="info-text">{{ activeSetsCount }} of {{ totalSetsCount }} sets active</span>
          </div>
        </div>
      </header>

      <div class="sets-container">
        <SetCard
          v-for="set in Object.values(SetCode)"
          :key="set"
          :set="set"
          :active="isSetActive(set)"
          @click="toggleSet(set)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SetCode } from '../consts'
import SetCard from '../components/SetCard.vue'
import { useActiveSets } from '../composables/useActiveSets'

const {
  isSetActive,
  toggleSet,
  toggleAllSets,
  activeSetsCount,
  totalSetsCount,
  allSetsActive,
} = useActiveSets()
</script>

<style scoped>
.pool-container {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 12px;
}

.pool-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin: 0 0 16px 0;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.active-sets-info {
  background: #e9ecef;
  padding: 8px 16px;
  border-radius: 20px;
}

.info-text {
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
}

.control-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-1px);
}

.control-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.sets-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 768px) {
  .pool-container {
    padding: 8px;
  }

  .title {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .control-buttons {
    gap: 6px;
  }

  .control-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }

  .control-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 200px;
  }

  .control-btn {
    width: 100%;
  }
}
</style>
