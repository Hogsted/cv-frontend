<template>
  <div>
    <h2>Erfaring</h2>

    <div v-if="loading" class="loading">Henter fra Azure, kan tage op til 10 sekunder...</div>

    <div v-else-if="experiences.length === 0" class="empty">Ingen erfaring endnu.</div>

    <div v-else class="timeline">
      <div v-for="e in experiences" :key="e.id" class="entry">
        <div class="entry-header">
          <div>
            <h3>{{ e.role }}</h3>
            <span class="company">{{ e.company }}</span>
          </div>
          <span class="dates">
            {{ formatDate(e.startDate) }} — {{ e.endDate ? formatDate(e.endDate) : 'Nu' }}
          </span>
        </div>
        <p>{{ e.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { experienceApi } from '../services/api'

const experiences = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await experienceApi.getAll()
    experiences.value = res.data
  } finally {
    loading.value = false
  }
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('da-DK', { year: 'numeric', month: 'short' })
}
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.entry {
  background: #16213e;
  border-left: 3px solid #4fc3f7;
  border-radius: 0 8px 8px 0;
  padding: 1.25rem;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.entry h3 {
  margin: 0 0 0.2rem;
}

.company {
  color: #4fc3f7;
  font-size: 0.9rem;
}

.dates {
  color: #888;
  font-size: 0.85rem;
  white-space: nowrap;
}

.entry p {
  color: #aaa;
  line-height: 1.6;
  margin: 0;
}
</style>
