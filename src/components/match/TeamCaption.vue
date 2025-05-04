<script setup lang="ts">
interface Props {
  team: 'A' | 'B'
  name: string
  isFirst?: boolean
}

defineProps<Props>()
</script>

<template>
  <h2 class="team-title" :class="`team-${team.toLowerCase()}`">
    <span class="team-name" :class="team">{{ name }}</span>
    <span v-if="isFirst">
      (First)
    </span>
  </h2>
</template>

<style scoped>
.team-title {
  text-align: center;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.team-name {
  font-weight: 600;
}

.team-a .team-name {
  color: var(--team-a-color);
}

.team-b .team-name {
  color: var(--team-b-color);
}

@media (max-width: 640px) {
  .team-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
