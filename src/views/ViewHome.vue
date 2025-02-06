<template>
  <div class="home">
    <h1>Unmatchmaker</h1>
    <router-link to="/draft" class="draft-link">Start Draft</router-link>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.draft-link {
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.draft-link:hover {
  background-color: #357abd;
}
</style>
