<template>
  <div>
    <h2>Projekter</h2>

    <div v-if="projects.length === 0" class="empty">Ingen projekter endnu.</div>

    <div v-else class="grid">
      <div v-for="p in projects" :key="p.id" class="card">
        <h3>{{ p.title }}</h3>
        <p>{{ p.description }}</p>
        <div class="card-links">
          <a v-if="p.gitHubUrl" :href="p.gitHubUrl" target="_blank" rel="noopener">GitHub</a>
          <a v-if="p.liveUrl" :href="p.liveUrl" target="_blank" rel="noopener">Live</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import projects from '../data/projects.js'
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.card {
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 8px;
  padding: 1.25rem;
}

.card h3 {
  margin-bottom: 0.5rem;
  color: #fff;
}

.card p {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-links {
  display: flex;
  gap: 0.75rem;
}

.card-links a {
  color: #4fc3f7;
  font-size: 0.85rem;
  text-decoration: none;
}

.card-links a:hover {
  text-decoration: underline;
}
</style>
