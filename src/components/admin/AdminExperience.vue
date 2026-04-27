<template>
  <div>
    <div class="list-header">
      <h3>Erfaring</h3>
      <button class="btn-add" @click="openCreate">+ Tilføj erfaring</button>
    </div>

    <div v-if="showForm" class="form-box">
      <h4>{{ editingId ? 'Rediger erfaring' : 'Ny erfaring' }}</h4>

      <div class="row">
        <div class="field">
          <label>Virksomhed *</label>
          <input v-model="form.company" maxlength="100" />
        </div>
        <div class="field">
          <label>Rolle *</label>
          <input v-model="form.role" maxlength="100" />
        </div>
      </div>
      <div class="field">
        <label>Beskrivelse *</label>
        <textarea v-model="form.description" rows="3" maxlength="2000"></textarea>
      </div>
      <div class="row">
        <div class="field">
          <label>Startdato *</label>
          <input v-model="form.startDate" type="date" />
        </div>
        <div class="field">
          <label>Slutdato (blank = nu)</label>
          <input v-model="form.endDate" type="date" />
        </div>
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

    <div v-else-if="items.length === 0 && !showForm" class="empty">Ingen erfaring endnu.</div>

    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-info">
          <strong>{{ item.role }} — {{ item.company }}</strong>
          <span class="item-sub">{{ formatDate(item.startDate) }} – {{ item.endDate ? formatDate(item.endDate) : 'Nu' }}</span>
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
import { experienceApi } from '../../services/api'

const items     = ref([])
const loading   = ref(true)
const showForm  = ref(false)
const saving    = ref(false)
const editingId = ref(null)
const formError = ref('')

const emptyForm = () => ({ company: '', role: '', description: '', startDate: '', endDate: '' })
const form = ref(emptyForm())

onMounted(load)

async function load() {
  loading.value = true
  try {
    const res = await experienceApi.getAll()
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
  form.value = {
    company:     item.company,
    role:        item.role,
    description: item.description,
    startDate:   item.startDate?.substring(0, 10) ?? '',
    endDate:     item.endDate?.substring(0, 10) ?? ''
  }
  editingId.value = item.id
  formError.value = ''
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingId.value = null
}

async function save() {
  if (!form.value.company.trim() || !form.value.role.trim() || !form.value.description.trim() || !form.value.startDate) {
    formError.value = 'Virksomhed, rolle, beskrivelse og startdato er påkrævet.'
    return
  }

  const payload = {
    company:     form.value.company,
    role:        form.value.role,
    description: form.value.description,
    startDate:   form.value.startDate,
    endDate:     form.value.endDate || null
  }

  saving.value = true
  formError.value = ''
  try {
    if (editingId.value) {
      await experienceApi.update(editingId.value, payload)
    } else {
      await experienceApi.create(payload)
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
  if (!confirm('Er du sikker på, at du vil slette denne erfaring?')) return
  await experienceApi.remove(id)
  await load()
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('da-DK', { year: 'numeric', month: 'short' })
}
</script>

<style scoped src="./admin.css"></style>
<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
</style>
