<template>
  <div class="set-section" :class="{ 'inactive': !active }" @click="$emit('click')">
    <div class="set-header">
      <div class="set-info">
        <img :src="setImages[set]" :alt="setNames[set]" class="set-image" />
        <h2 class="set-title">{{ setNames[set] }}</h2>
      </div>

      <div class="lists-container">
        <div class="list-section">
          <span class="list-title">Heroes:</span>
          <span class="heroes-list">
            <span
              v-for="hero in setContents[set].heroes"
              :key="hero"
              class="hero-item"
            >
              {{ heroNames[hero] }}
            </span>
          </span>
        </div>

        <div v-if="setContents[set].maps.length > 0" class="list-section">
          <span class="list-title">Maps:</span>
          <span class="maps-list">
            <span
              v-for="map in setContents[set].maps"
              :key="map"
              class="map-item"
            >
              {{ mapNames[map] }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type SetCode, setNames, setImages, setContents } from '../consts'
import { heroNames } from '../consts'
import { mapNames } from '../consts'

defineProps<{
  set: SetCode
  active: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.set-section {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  cursor: pointer;
}

.set-section:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.set-section.inactive {
  opacity: 0.6;
  background: #f8f9fa;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.set-section.inactive:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.set-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 16px;
  background: #f8f9fa;
}

.set-section.inactive .set-header {
  background: #e9ecef;
}

.set-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.set-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.set-section.inactive .set-image {
  opacity: 0.7;
  border-color: #adb5bd;
}

.set-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  white-space: nowrap;
}

.set-section.inactive .set-title {
  color: #6c757d;
}

.lists-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.list-section {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.list-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #6c757d;
  flex-shrink: 0;
}

.set-section.inactive .list-title {
  color: #adb5bd;
}

.heroes-list,
.maps-list {
  display: inline;
}

.hero-item,
.map-item {
  font-size: 0.8rem;
  color: #495057;
}

.set-section.inactive .hero-item,
.set-section.inactive .map-item {
  color: #6c757d;
}

.hero-item:not(:last-child)::after,
.map-item:not(:last-child)::after {
  content: ',';
  display: inline-block;
  margin-right: 4px;
  color: #6c757d;
}

@media (max-width: 768px) {
  .set-header {
    padding: 10px 12px;
    gap: 12px;
  }

  .set-info {
    gap: 10px;
  }

  .set-image {
    width: 35px;
    height: 35px;
  }

  .set-title {
    font-size: 1rem;
  }

  .list-title {
    font-size: 0.75rem;
  }

  .hero-item,
  .map-item {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .set-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 10px;
  }

  .set-info {
    gap: 8px;
  }

  .set-image {
    width: 30px;
    height: 30px;
  }

  .set-title {
    font-size: 0.9rem;
  }

  .lists-container {
    gap: 3px;
  }

  .list-section {
    gap: 6px;
  }
}
</style>
