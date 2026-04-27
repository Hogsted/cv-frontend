<template>
  <div>
    <h2>Kompetencer</h2>

    <div v-if="loading" class="loading">Henter fra Azure, kan tage op til 10 sekunder...</div>

    <div v-else-if="skills.length === 0" class="empty">Ingen kompetencer endnu.</div>

    <div v-else class="skills-list">
      <div v-for="s in sortedSkills" :key="s.id" class="skill-item">
        <span class="skill-name">{{ s.name }}</span>
        <span class="skill-level" :class="levelClass(s.level)">{{ s.level }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { skillsApi } from '../services/api'

const skills = ref([])
const loading = ref(true)

const levelOrder = { Ekspert: 0, Avanceret: 1, Øvet: 2, Begynder: 3 }

const sortedSkills = computed(() =>
  [...skills.value].sort((a, b) => (levelOrder[a.level] ?? 4) - (levelOrder[b.level] ?? 4))
)

onMounted(async () => {
  try {
    const res = await skillsApi.getAll()
    skills.value = res.data
  } finally {
    loading.value = false
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
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  max-width: 500px;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 6px;
  padding: 0.75rem 1rem;
}

.skill-name {
  font-weight: 500;
}

.skill-level {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.level-expert      { background: #1a472a; color: #69db7c; }
.level-advanced    { background: #1c3a5e; color: #4fc3f7; }
.level-intermediate{ background: #3d2b00; color: #ffd43b; }
.level-beginner    { background: #3b1f1f; color: #ff8787; }
</style>
