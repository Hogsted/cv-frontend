<template>
  <div class="projects-page">
    <div class="page-header">
      <h1>Projekter<span class="dot">.</span></h1>
      <p class="subtitle">Udvalgte softwareprojekter, jeg har bygget og arbejdet med.</p>
    </div>

    <div class="filters">
      <button
        v-for="f in filters"
        :key="f"
        class="filter-pill"
        :class="{ active: activeFilter === f }"
        @click="activeFilter = f"
      >
        {{ f }}
      </button>
    </div>

    <div v-if="filteredProjects.length === 0" class="empty">Ingen projekter i denne kategori endnu.</div>

    <div v-else class="grid">
      <div v-for="p in filteredProjects" :key="p.id" class="card">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16,18 22,12 16,6" />
            <polyline points="8,6 2,12 8,18" />
          </svg>
        </div>

        <h3>{{ p.title }}</h3>
        <p class="description">{{ p.description }}</p>

        <div v-if="p.tags.length" class="tags">
          <span v-for="tag in p.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div class="card-links">
          <a :href="p.gitHubUrl" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
            </svg>
            GitHub
          </a>
          <a v-if="p.liveUrl" :href="p.liveUrl" target="_blank" rel="noopener">
            Live
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import projects from '../data/projects.js'

const filters = ['Alle', 'C#/.NET', 'Frontend', 'Backend', 'API']
const activeFilter = ref('Alle')

const filteredProjects = computed(() =>
  activeFilter.value === 'Alle'
    ? projects
    : projects.filter(p => p.categories.includes(activeFilter.value))
)
</script>

<style scoped>
.projects-page {
  padding-top: 1rem;
}

.page-header h1 {
  font-size: 2.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: baseline;
}

.page-header .dot {
  color: #4fc3f7;
}

.subtitle {
  color: #999;
  margin-top: 0.5rem;
  margin-bottom: 1.75rem;
}

.filters {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filter-pill {
  background: #12121f;
  border: 1px solid #2a2a44;
  color: #ccc;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.filter-pill:hover {
  color: #fff;
}

.filter-pill.active {
  border-color: #4fc3f7;
  color: #4fc3f7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.card {
  background: #12121f;
  border: 1px solid #22223a;
  border-radius: 12px;
  padding: 1.5rem;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #234a63;
  background: rgba(79, 195, 247, 0.08);
  color: #4fc3f7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.card-icon svg {
  width: 18px;
  height: 18px;
}

.card h3 {
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1.05rem;
}

.card .description {
  color: #999;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tag {
  background: #1a1a2e;
  border: 1px solid #2a2a44;
  color: #bbb;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
}

.card-links {
  display: flex;
  gap: 1.25rem;
}

.card-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #4fc3f7;
  font-size: 0.85rem;
  text-decoration: none;
}

.card-links a svg {
  width: 14px;
  height: 14px;
}

.card-links a:hover {
  text-decoration: underline;
}
</style>
