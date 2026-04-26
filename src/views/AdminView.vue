<template>
  <div>
    <h2>Admin</h2>

    <div class="admin-header">
      <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
      <button class="btn-logout" @click="logout">Log ud</button>
    </div>

    <div class="tab-content">
      <AdminProfile    v-if="activeTab === 'profile'" />
      <AdminProjects   v-if="activeTab === 'projects'" />
      <AdminSkills     v-if="activeTab === 'skills'" />
      <AdminExperience v-if="activeTab === 'experience'" />
      <AdminEducation  v-if="activeTab === 'education'" />
      <AdminMessages   v-if="activeTab === 'messages'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
import AdminProjects   from '../components/admin/AdminProjects.vue'
import AdminSkills     from '../components/admin/AdminSkills.vue'
import AdminExperience from '../components/admin/AdminExperience.vue'
import AdminEducation  from '../components/admin/AdminEducation.vue'
import AdminProfile    from '../components/admin/AdminProfile.vue'
import AdminMessages   from '../components/admin/AdminMessages.vue'

const activeTab = ref('profile')

const tabs = [
  { key: 'profile',    label: 'Profil' },
  { key: 'projects',   label: 'Projekter' },
  { key: 'skills',     label: 'Kompetencer' },
  { key: 'experience', label: 'Erfaring' },
  { key: 'education',  label: 'Uddannelse' },
  { key: 'messages',   label: 'Beskeder' }
]
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.5rem;
}

.btn-logout {
  background: none;
  border: 1px solid #555;
  color: #aaa;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  cursor: pointer;
  margin-bottom: 1px;
}

.btn-logout:hover { border-color: #ff8787; color: #ff8787; }

.tabs {
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid #2a2a4a;
  flex: 1;
}

.tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #aaa;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.6rem 1rem;
  margin-bottom: -1px;
  transition: color 0.2s;
}

.tab:hover { color: #fff; }

.tab.active {
  color: #fff;
  border-bottom-color: #4fc3f7;
}

.tab-content {
  padding-top: 1.5rem;
}
</style>
