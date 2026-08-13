<template>
  <div class="experience-page">
    <div class="page-header">
      <h1>Erfaring</h1>
      <p class="subtitle">Steder jeg har arbejdet, og hvad jeg har lært undervejs.</p>
    </div>

    <div v-if="experiences.length === 0" class="empty">Ingen erfaring endnu.</div>

    <div v-else class="timeline">
      <div v-for="e in experiences" :key="e.id" class="entry">
        <div class="entry-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>

        <div class="entry-body">
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
  </div>
</template>

<script setup>
import experiences from '../data/experiences.js'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('da-DK', { year: 'numeric', month: 'short' })
}
</script>

<style scoped>
.experience-page {
  padding-top: 1rem;
}

.page-header h1 {
  font-size: 2.75rem;
  font-weight: 700;
}

.subtitle {
  color: #999;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.entry {
  display: flex;
  gap: 1.25rem;
  background: #12121f;
  border: 1px solid #22223a;
  border-radius: 12px;
  padding: 1.5rem;
}

.entry-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #234a63;
  background: rgba(79, 195, 247, 0.08);
  color: #4fc3f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.entry-icon svg {
  width: 20px;
  height: 20px;
}

.entry-body {
  flex: 1;
  min-width: 0;
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
  font-size: 1.1rem;
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

@media (max-width: 600px) {
  .entry {
    flex-direction: column;
  }
}
</style>
