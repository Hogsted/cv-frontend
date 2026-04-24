<template>
  <div>
    <div class="list-header">
      <h3>Kompetencer</h3>
      <button class="btn-add" @click="openCreate">+ Tilføj kompetence</button>
    </div>

    <div v-if="showForm" class="form-box">
      <h4>{{ editingId ? 'Rediger kompetence' : 'Ny kompetence' }}</h4>

      <div class="field">
        <label>Navn *</label>
        <input v-model="form.name" maxlength="100" />
      </div>
      <div class="field">
        <label>Niveau *</label>
        <select v-model="form.level">
          <option value="Begynder">Begynder</option>
          <option value="Øvet">Øvet</option>
          <option value="Avanceret">Avanceret</option>
          <option value="Ekspert">Ekspert</option>
        </select>
      </div>

      <p v-if="formError" class="error">{{ formError }}</p>

      <div class="form-actions">
        <button class="btn-save" @click="save" :disabled="saving">
          {{ saving ? 'Gemmer...' : 'Gem' }}
        </button>
        <button class="btn-cancel" @click="closeForm">Annuller</button>
      </div>
    </div>

    <div v-if="loading" class="loading">Henter...</div>

    <div v-else-if="items.length === 0 && !showForm" class="empty">Ingen kompetencer endnu.</div>

    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-info">
          <strong>{{ item.name }}</strong>
          <span class="item-sub">{{ item.level }}</span>
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
import { skillsApi } from '../../services/api'

const items     = ref([])
const loading   = ref(true)
const showForm  = ref(false)
const saving    = ref(false)
const editingId = ref(null)
const formError = ref('')

const emptyForm = () => ({ name: '', level: 'Øvet' })
const form = ref(emptyForm())

onMounted(load)

async function load() {
  loading.value = true
  try {
    const res = await skillsApi.getAll()
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
  form.value = { name: item.name, level: item.level }
  editingId.value = item.id
  formError.value = ''
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingId.value = null
}

async function save() {
  if (!form.value.name.trim()) {
    formError.value = 'Navn er påkrævet.'
    return
  }

  saving.value = true
  formError.value = ''
  try {
    if (editingId.value) {
      await skillsApi.update(editingId.value, form.value)
    } else {
      await skillsApi.create(form.value)
    }
    closeForm()
    await load()
  } catch {
    formError.value = 'Noget gik galt.'
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  if (!confirm('Er du sikker på, at du vil slette denne kompetence?')) return
  await skillsApi.remove(id)
  await load()
}
</script>

<style scoped src="./admin.css"></style>
