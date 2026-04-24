<template>
  <div>
    <h2>Admin</h2>

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

    <div class="tab-content">
      <AdminProjects v-if="activeTab === 'projects'" />
      <AdminSkills   v-if="activeTab === 'skills'" />
      <AdminExperience v-if="activeTab === 'experience'" />
      <AdminEducation  v-if="activeTab === 'education'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminProjects   from '../components/admin/AdminProjects.vue'
import AdminSkills     from '../components/admin/AdminSkills.vue'
import AdminExperience from '../components/admin/AdminExperience.vue'
import AdminEducation  from '../components/admin/AdminEducation.vue'

const activeTab = ref('projects')

const tabs = [
  { key: 'projects',   label: 'Projekter' },
  { key: 'skills',     label: 'Kompetencer' },
  { key: 'experience', label: 'Erfaring' },
  { key: 'education',  label: 'Uddannelse' }
]
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 0.25rem;
  margin-top: 1.5rem;
  border-bottom: 1px solid #2a2a4a;
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
