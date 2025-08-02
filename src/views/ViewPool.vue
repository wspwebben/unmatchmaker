<template>
  <div class="pool-container">
    <div class="pool-content">
      <header class="header">
        <h1 class="title">Pool</h1>
        <p class="subtitle">All available sets for testing images</p>
      </header>

      <div class="sets-grid">
        <div
          v-for="setCode in Object.values(SetCode)"
          :key="setCode"
          class="set-card"
        >
          <div class="set-image-container">
            <img
              :src="setImages[setCode]"
              :alt="setNames[setCode]"
              class="set-image"
              @error="handleImageError"
            />
          </div>
          <div class="set-info">
            <h3 class="set-name">{{ setNames[setCode] }}</h3>
            <div class="set-stats">
              <span class="stat">
                {{ setContents[setCode].heroes.length }} Heroes
              </span>
              <span class="stat">
                {{ setContents[setCode].maps.length }} Maps
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SetCode, setNames, setImages, setContents } from '../consts'

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  const container = img.parentElement
  if (container) {
    container.innerHTML = '<div class="image-error">Image not found</div>'
  }
}
</script>

<style scoped>
.pool-container {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 20px;
}

.pool-content {
  max-width: 1400px;
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

.subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin: 0;
}

.sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 0;
}

.set-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.set-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.set-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.set-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-error {
  color: #6c757d;
  font-size: 1rem;
  text-align: center;
  padding: 20px;
}

.set-info {
  padding: 20px;
}

.set-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.set-stats {
  display: flex;
  gap: 16px;
}

.stat {
  background: #e9ecef;
  color: #495057;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 768px) {
  .pool-container {
    padding: 16px;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .sets-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }

  .set-image-container {
    height: 160px;
  }

  .set-info {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.75rem;
  }

  .sets-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .set-image-container {
    height: 140px;
  }
}
</style>
