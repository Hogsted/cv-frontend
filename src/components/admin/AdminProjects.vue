<template>
  <div>
    <div class="list-header">
      <h3>Projekter</h3>
      <button class="btn-add" @click="openCreate">+ Tilføj projekt</button>
    </div>

    <div v-if="showForm" class="form-box">
      <h4>{{ editingId ? 'Rediger projekt' : 'Nyt projekt' }}</h4>

      <div class="field">
        <label>Titel *</label>
        <input v-model="form.title" maxlength="100" />
      </div>
      <div class="field">
        <label>Beskrivelse *</label>
        <textarea v-model="form.description" rows="3" maxlength="1000"></textarea>
      </div>
      <div class="field">
        <label>GitHub URL</label>
        <input v-model="form.gitHubUrl" type="url" />
      </div>
      <div class="field">
        <label>Live URL</label>
        <input v-model="form.liveUrl" type="url" />
      </div>

      <p v-if="formError" class="error">{{ formError }}</p>

      <div class="form-actions">
        <button class="btn-save" @click="save" :disabled="saving">
          {{ saving ? 'Gemmer...' : 'Gem' }}
        </button>
        <button class="btn-cancel" @click="closeForm">Annuller</button>
      </div>
    </div>

    <div v-if="loading" class="loading">Henter fra Azure, kan tage op til 10 sekunder...</div>

    <div v-else-if="items.length === 0 && !showForm" class="empty">Ingen projekter endnu.</div>

    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-info">
          <strong>{{ item.title }}</strong>
          <span class="item-sub">{{ item.description }}</span>
        </div>
        <div class="item-actions">
          <button class="btn-edit" @click="openEdit(item)">Rediger</button>
          <button class="btn-delete" @click="remove(item.id)">Slet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { projectsApi } from '../../services/api'

const items     = ref([])
const loading   = ref(true)
const showForm  = ref(false)
const saving    = ref(false)
const editingId = ref(null)
const formError = ref('')

const emptyForm = () => ({ title: '', description: '', gitHubUrl: '', liveUrl: '' })
const form = ref(emptyForm())

onMounted(load)

async function load() {
  loading.value = true
  try {
    const res = await projectsApi.getAll()
    items.value = res.data
  } finally {
    loading.value = false
  }
}

function openCreate() {
  form.value = emptyForm()
  editingId.value = null
  formError.value = ''
  showForm.value = true
}

function openEdit(item) {
  form.value = { title: item.title, description: item.description, gitHubUrl: item.gitHubUrl ?? '', liveUrl: item.liveUrl ?? '' }
  editingId.value = item.id
  formError.value = ''
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingId.value = null
}

async function save() {
  if (!form.value.title.trim() || !form.value.description.trim()) {
    formError.value = 'Titel og beskrivelse er påkrævet.'
    return
  }

  const payload = {
    title: form.value.title,
    description: form.value.description,
    gitHubUrl: form.value.gitHubUrl || null,
    liveUrl: form.value.liveUrl || null
  }

  saving.value = true
  formError.value = ''
  try {
    if (editingId.value) {
      await projectsApi.update(editingId.value, payload)
    } else {
      await projectsApi.create(payload)
    }
    closeForm()
    await load()
  } catch {
    formError.value = 'Noget gik galt. Tjek at URL-felter er gyldige.'
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Er du sikker på, at du vil slette dette projekt?')) return
  await projectsApi.remove(id)
  await load()
}
</script>

<style scoped src="./admin.css"></style>
