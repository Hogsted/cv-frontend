<template>
  <div class="skills-page">
    <div class="page-header">
      <h1>Kompetencer</h1>
      <p class="subtitle">Teknologier og værktøjer jeg arbejder med.</p>
    </div>

    <div class="layout">
      <div class="main-col">
        <section v-for="section in sections" :key="section.key" class="section">
          <h2 class="section-title">
            <svg v-if="section.key === 'primary'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
            </svg>
            <svg v-else-if="section.key === 'frontend'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            {{ section.label }}
          </h2>

          <div class="skill-grid">
            <div v-for="s in section.items" :key="s.id" class="skill-card">
              <div class="skill-icon" :style="{ color: skillColor(s.name), borderColor: skillColor(s.name), background: `color-mix(in srgb, ${skillColor(s.name)} 15%, transparent)` }">
                <svg v-if="s.name === 'C# / .NET'" viewBox="0 0 24 24">
                  <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" fill="currentColor" opacity="0.15" />
                  <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" fill="none" stroke="currentColor" stroke-width="1.5" />
                  <text x="12" y="15.5" font-size="7" font-weight="700" text-anchor="middle" fill="currentColor">C#</text>
                </svg>
                <svg v-else-if="s.name === 'Vue.js'" viewBox="0 0 24 24">
                  <path d="M2 4h4l6 10.5L18 4h4L12 21 2 4z" fill="currentColor" />
                  <path d="M7.5 4h3L12 8.5 13.5 4h3L12 12.5 7.5 4z" fill="#0f0f1a" />
                </svg>
                <svg v-else-if="s.name === 'JavaScript'" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
                  <text x="12" y="16.5" font-size="8" font-weight="700" text-anchor="middle" fill="#1a1a2e">JS</text>
                </svg>
                <svg v-else-if="s.name === 'SQL'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.7-4 3-9 3s-9-1.3-9-3" />
                  <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
                </svg>
                <svg v-else-if="s.name === 'HTML / CSS'" viewBox="0 0 24 24">
                  <path d="M4 2l1.6 18L12 22l6.4-2L20 2H4z" fill="currentColor" />
                  <text x="12" y="16" font-size="8" font-weight="700" text-anchor="middle" fill="#1a1a2e">5</text>
                </svg>
                <svg v-else-if="s.name === 'Git'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
                <svg v-else-if="s.name === 'Docker'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="10" width="4" height="4" /><rect x="8" y="10" width="4" height="4" />
                  <rect x="13" y="10" width="4" height="4" /><rect x="8" y="5" width="4" height="4" />
                  <path d="M2 14c0 4 4 6 10 6 6 0 9-3 10-7-1 0-2-1-2-1s-1 1-3 1" />
                </svg>
                <svg v-else-if="s.name === 'Python'" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="#3776ab" />
                  <path d="M2 22L22 2v16a4 4 0 0 1-4 4H2z" fill="#ffd43b" />
                  <text x="12" y="16" font-size="6.5" font-weight="700" text-anchor="middle" fill="#fff">Py</text>
                </svg>
              </div>

              <div class="skill-body">
                <div class="skill-top">
                  <span class="skill-name">{{ s.name }}</span>
                  <span class="skill-level" :class="levelClass(s.level)">{{ s.level }}</span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" :style="{ width: `${percentFor(s.level)}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside class="sidebar">
        <div class="side-card">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Kompetenceoverblik
          </h3>
          <p class="side-subtitle">Et hurtigt overblik over mit kompetenceniveau.</p>

          <div class="stats-row">
            <div class="stat">
              <span class="stat-number stat-advanced">{{ levelCounts.Avanceret }}</span>
              <span class="stat-label">Avanceret</span>
            </div>
            <div class="stat">
              <span class="stat-number stat-intermediate">{{ levelCounts.Øvet }}</span>
              <span class="stat-label">Øvet</span>
            </div>
            <div class="stat">
              <span class="stat-number stat-beginner">{{ levelCounts.Begynder }}</span>
              <span class="stat-label">Begynder</span>
            </div>
          </div>

          <div class="segmented-bar">
            <div class="segment seg-advanced" :style="{ width: `${(levelCounts.Avanceret / totalCount) * 100}%` }"></div>
            <div class="segment seg-intermediate" :style="{ width: `${(levelCounts.Øvet / totalCount) * 100}%` }"></div>
            <div class="segment seg-beginner" :style="{ width: `${(levelCounts.Begynder / totalCount) * 100}%` }"></div>
          </div>
        </div>

        <div class="side-card">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
            </svg>
            Fokusområder lige nu
          </h3>
          <ul class="focus-list">
            <li v-for="item in focusAreas" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="side-card">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
            </svg>
            Jeg arbejder med
          </h3>
          <div class="tag-row">
            <span v-for="tag in workTags" :key="tag" class="work-tag">{{ tag }}</span>
          </div>
        </div>

        <div class="side-card">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18h6" /><path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
            </svg>
            Altid nysgerrig på mere
          </h3>
          <p class="side-text">Jeg lærer løbende nye teknologier og forbedrer mine færdigheder.</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import skills from '../data/skills.js'

const focusAreas = [
  'Videreudvikling af .NET kompetencer',
  'Større forståelse af Vue.js',
  'DevOps og cloud-infrastruktur'
]

const workTags = ['Webudvikling', 'Backend', 'APIs', 'Databaser', 'DevOps']

const SKILL_COLORS = {
  'C# / .NET': '#a78bfa',
  'Vue.js': '#42b883',
  'JavaScript': '#f0db4f',
  'SQL': '#4fc3f7',
  'HTML / CSS': '#ff7043',
  'Git': '#f05033',
  'Docker': '#2496ed',
  'Python': '#3776ab'
}

const SECTION_LABELS = {
  primary: 'Primære teknologier',
  frontend: 'Frontend',
  tools: 'Andre værktøjer'
}

const sections = computed(() =>
  Object.entries(SECTION_LABELS)
    .map(([key, label]) => ({ key, label, items: skills.filter(s => s.category === key) }))
    .filter(section => section.items.length > 0)
)

const levelCounts = computed(() => {
  const counts = { Avanceret: 0, Øvet: 0, Begynder: 0 }
  skills.forEach(s => {
    if (counts[s.level] !== undefined) counts[s.level]++
  })
  return counts
})

const totalCount = computed(() =>
  levelCounts.value.Avanceret + levelCounts.value.Øvet + levelCounts.value.Begynder
)

function skillColor(name) {
  return SKILL_COLORS[name] || '#4fc3f7'
}

function levelClass(level) {
  const map = {
    Ekspert: 'level-expert',
    Avanceret: 'level-advanced',
    Øvet: 'level-intermediate',
    Begynder: 'level-beginner'
  }
  return map[level] ?? 'level-beginner'
}

function percentFor(level) {
  const map = { Ekspert: 95, Avanceret: 75, Øvet: 55, Begynder: 30 }
  return map[level] ?? 30
}
</script>

<style scoped>
.skills-page {
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

.layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2.5rem;
  align-items: start;
}

.section {
  margin-bottom: 2.25rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.05rem;
  color: #4fc3f7;
  margin-bottom: 1rem;
}

.section-title::after {
  display: none;
}

.section-title svg {
  width: 18px;
  height: 18px;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.skill-card {
  display: flex;
  gap: 1rem;
  background: #12121f;
  border: 1px solid #22223a;
  border-radius: 12px;
  padding: 1.1rem;
}

.skill-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon svg {
  width: 26px;
  height: 26px;
}

.skill-body {
  flex: 1;
  min-width: 0;
}

.skill-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.skill-name {
  font-weight: 600;
}

.skill-level {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  white-space: nowrap;
}

.level-expert       { background: #1a472a; color: #69db7c; }
.level-advanced      { background: #1c3a5e; color: #4fc3f7; }
.level-intermediate { background: #3d2b00; color: #ffd43b; }
.level-beginner      { background: #3b1f1f; color: #ff8787; }

.progress-track {
  height: 6px;
  background: #22223a;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4fc3f7;
  border-radius: 3px;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.side-card {
  background: #12121f;
  border: 1px solid #22223a;
  border-radius: 12px;
  padding: 1.4rem;
}

.side-card h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.side-card h3 svg {
  width: 17px;
  height: 17px;
  color: #4fc3f7;
  flex-shrink: 0;
}

.side-subtitle,
.side-text {
  color: #999;
  font-size: 0.85rem;
  line-height: 1.6;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  margin: 1.25rem 0 0.85rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.2rem;
}

.stat-advanced     { color: #4fc3f7; }
.stat-intermediate { color: #ffd43b; }
.stat-beginner      { color: #ff8787; }

.segmented-bar {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: #22223a;
}

.seg-advanced     { background: #4fc3f7; }
.seg-intermediate { background: #ffd43b; }
.seg-beginner      { background: #ff8787; }

.focus-list {
  list-style: none;
  padding: 0;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.focus-list li {
  color: #ccc;
  font-size: 0.88rem;
  padding-left: 1rem;
  position: relative;
}

.focus-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4fc3f7;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.work-tag {
  background: #1a1a2e;
  border: 1px solid #2a2a44;
  color: #bbb;
  border-radius: 6px;
  padding: 0.35rem 0.7rem;
  font-size: 0.78rem;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
