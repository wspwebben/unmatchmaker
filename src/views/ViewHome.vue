<template>
  <div class="home">
    <h1>Unmatchmaker</h1>
    <div class="draft-links">
      <!-- <router-link to="/draft" class="draft-link">Start Draft</router-link>
      <router-link to="/team-draft" class="draft-link">Start Team Draft</router-link> -->
      <router-link to="/random-heroes" class="draft-link">Random Heroes</router-link>
      <router-link to="/random-maps" class="draft-link">Random Maps</router-link>
    </div>
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

.draft-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  text-align: center;
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
