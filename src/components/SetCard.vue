<template>
  <div
    class="set-card"
    :class="{ 'active': active }"
    @click="$emit('click')"
  >
    <div class="set-image-container">
      <SetImage
        class="set-image"
        :set="set"
      />
    </div>
    <div class="set-info">
      <h3 class="set-name">{{ setNames[set] }}</h3>
      <div class="set-stats">
        <span class="stat">
          {{ setContents[set].heroes.length }} Heroes
        </span>
        <span class="stat">
          {{ setContents[set].maps.length }} Maps
        </span>
      </div>
    </div>
    <div class="set-overlay">
      <div class="set-status" :class="{ 'status-active': active, 'status-inactive': !active }">
        <span>{{ active ? 'Active' : 'Inactive' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SetCode, setNames, setContents } from '../consts'
import SetImage from './SetImage.vue'

defineProps<{
  set: SetCode
  active: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.set-card {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 2px solid transparent;
  min-height: 80px;
}

.set-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.set-card.active {
  border-color: #10b981;
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.25);
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.set-card.active:hover {
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.3);
  transform: translateY(-4px);
}

.set-image-container {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.set-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.set-card:hover .set-image {
  transform: scale(1.05);
}

.set-info {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.set-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
  line-height: 1.3;
  letter-spacing: -0.025em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.set-card.active .set-name {
  color: #065f46;
}

.set-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.set-card.active .stat {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border-color: #10b981;
}

.set-card:hover .stat {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.set-overlay {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 10;
}

.set-status {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  color: var(--status-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.set-card:hover .set-status {
  transform: scale(1.05);
}

.status-active {
  --status-color: #10b981;
}

.status-inactive {
  --status-color: #ef4444;
}

/* Responsive design */
@media (max-width: 768px) {
  .set-card {
    min-height: 70px;
  }

  .set-image-container {
    width: 70px;
    height: 70px;
  }

  .set-info {
    padding: 12px 16px;
  }

  .set-name {
    font-size: 1rem;
    margin-bottom: 6px;
  }

  .stat {
    font-size: 0.75rem;
    padding: 3px 10px;
  }

  .set-status {
    font-size: 0.7rem;
    padding: 4px 10px;
  }
}

@media (max-width: 480px) {
  .set-card {
    min-height: 60px;
  }

  .set-image-container {
    width: 60px;
    height: 60px;
  }

  .set-info {
    padding: 10px 12px;
  }

  .set-name {
    font-size: 0.9rem;
    margin-bottom: 4px;
  }

  .set-stats {
    gap: 6px;
  }

  .stat {
    font-size: 0.7rem;
    padding: 2px 8px;
  }
}
</style>
