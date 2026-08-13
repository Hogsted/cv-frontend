<template>
  <div>
    <h2>Uddannelse</h2>

    <div v-if="educations.length === 0" class="empty">Ingen uddannelse endnu.</div>

    <div v-else class="timeline">
      <div v-for="e in educations" :key="e.id" class="entry">
        <div class="entry-header">
          <div>
            <h3>{{ e.degree }} i {{ e.fieldOfStudy }}</h3>
            <span class="school">{{ e.school }}</span>
          </div>
          <span class="dates">
            {{ formatDate(e.startDate) }} — {{ e.endDate ? formatDate(e.endDate) : 'Nu' }}
          </span>
        </div>
        <p v-if="e.description">{{ e.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import educations from '../data/educations.js'

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
  border-left: 3px solid #a78bfa;
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

.school {
  color: #a78bfa;
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
