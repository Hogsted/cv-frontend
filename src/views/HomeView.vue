<template>
  <div class="home">
    <div v-if="loading" class="loading">Henter fra Azure, kan tage op til 10 sekunder...</div>

    <div v-else-if="profile" class="layout">
      <div class="profile">
        <h1>{{ profile.fullName }}</h1>
        <p class="title">{{ profile.title }}</p>
        <p class="bio">{{ profile.bio }}</p>

        <div class="links">
          <a v-if="profile.gitHubUrl" :href="profile.gitHubUrl" target="_blank" rel="noopener">GitHub</a>
          <a v-if="profile.linkedInUrl" :href="profile.linkedInUrl" target="_blank" rel="noopener">LinkedIn</a>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>
      </div>

      <div class="skills-panel">
        <h3>Top 3 Kompetencer</h3>
        <div v-if="skillsLoading" class="loading">Henter fra Azure, kan tage op til 10 sekunder...</div>
        <div v-else class="skills-list">
          <div v-for="s in sortedSkills" :key="s.id" class="skill-item">
            <span class="skill-name">{{ s.name }}</span>
            <span class="skill-level" :class="levelClass(s.level)">{{ s.level }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty">
      <p>Ingen profil oprettet endnu.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { profileApi, skillsApi } from '../services/api'

const profile = ref(null)
const loading = ref(true)
const skills = ref([])
const skillsLoading = ref(true)

const levelOrder = { Ekspert: 0, Avanceret: 1, Øvet: 2, Begynder: 3 }

const sortedSkills = computed(() =>
  skills.value
    .filter(s => s.isFeatured)
    .sort((a, b) => (levelOrder[a.level] ?? 4) - (levelOrder[b.level] ?? 4))
)

onMounted(async () => {
  try {
    const res = await profileApi.get()
    profile.value = res.data
  } catch {
    profile.value = null
  } finally {
    loading.value = false
  }

  try {
    const res = await skillsApi.getAll()
    skills.value = res.data
  } finally {
    skillsLoading.value = false
  }
})

function levelClass(level) {
  const map = {
    Ekspert: 'level-expert',
    Avanceret: 'level-advanced',
    Øvet: 'level-intermediate',
    Begynder: 'level-beginner'
  }
  return map[level] ?? 'level-beginner'
}
</script>

<style scoped>
.home {
  padding-top: 2rem;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 3rem;
  align-items: start;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
}

.title {
  font-size: 1.25rem;
  color: #4fc3f7;
  margin-bottom: 1.5rem;
}

.bio {
  line-height: 1.7;
  color: #ccc;
  margin-bottom: 1.5rem;
}

.links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.links a {
  color: #4fc3f7;
  text-decoration: none;
  padding: 0.4rem 1rem;
  border: 1px solid #4fc3f7;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.links a:hover {
  background: #4fc3f7;
  color: #1a1a2e;
}

.skills-panel h3 {
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 6px;
  padding: 0.6rem 0.9rem;
}

.skill-name {
  font-size: 0.9rem;
  font-weight: 500;
}

.skill-level {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.level-expert      { background: #1a472a; color: #69db7c; }
.level-advanced    { background: #1c3a5e; color: #4fc3f7; }
.level-intermediate{ background: #3d2b00; color: #ffd43b; }
.level-beginner    { background: #3b1f1f; color: #ff8787; }

@media (max-width: 700px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
