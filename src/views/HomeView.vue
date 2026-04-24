<template>
  <div class="home">
    <div v-if="loading" class="loading">Henter profil...</div>

    <div v-else-if="profile" class="profile">
      <h1>{{ profile.fullName }}</h1>
      <p class="title">{{ profile.title }}</p>
      <p class="bio">{{ profile.bio }}</p>

      <div class="links">
        <a v-if="profile.gitHubUrl" :href="profile.gitHubUrl" target="_blank" rel="noopener">GitHub</a>
        <a v-if="profile.linkedInUrl" :href="profile.linkedInUrl" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
      </div>
    </div>

    <div v-else class="empty">
      <p>Ingen profil oprettet endnu.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { profileApi } from '../services/api'

const profile = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await profileApi.get()
    profile.value = res.data
  } catch {
    profile.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home {
  padding-top: 2rem;
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
  max-width: 600px;
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
</style>
