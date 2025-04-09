<script setup lang="ts">
defineProps<{
  position: 1 | 2
  onClick: () => void
}>()
</script>

<template>
  <button class="choice-button" @click="onClick">
    Go {{ position === 1 ? 'First' : 'Second' }}
  </button>
</template>

<style scoped>
.choice-button {
  padding: 12px 24px;
  font-size: 1rem;
  background-color: var(--team-a-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.choice-button:hover {
  opacity: 0.9;
}
</style>
