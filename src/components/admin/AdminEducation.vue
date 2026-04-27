<template>
  <div>
    <div class="list-header">
      <h3>Uddannelse</h3>
      <button class="btn-add" @click="openCreate">+ Tilføj uddannelse</button>
    </div>

    <div v-if="showForm" class="form-box">
      <h4>{{ editingId ? 'Rediger uddannelse' : 'Ny uddannelse' }}</h4>

      <div class="field">
        <label>Uddannelsessted *</label>
        <input v-model="form.school" maxlength="200" />
      </div>
      <div class="row">
        <div class="field">
          <label>Grad *</label>
          <input v-model="form.degree" maxlength="100" placeholder="f.eks. Bachelor" />
        </div>
        <div class="field">
          <label>Fagområde *</label>
          <input v-model="form.fieldOfStudy" maxlength="100" />
        </div>
      </div>
      <div class="field">
        <label>Beskrivelse</label>
        <textarea v-model="form.description" rows="2" maxlength="1000"></textarea>
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

    <div v-else-if="items.length === 0 && !showForm" class="empty">Ingen uddannelse endnu.</div>

    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item">
        <div class="item-info">
          <strong>{{ item.degree }} i {{ item.fieldOfStudy }}</strong>
          <span class="item-sub">{{ item.school }} · {{ formatDate(item.startDate) }} – {{ item.endDate ? formatDate(item.endDate) : 'Nu' }}</span>
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
import { educationApi } from '../../services/api'

const items     = ref([])
const loading   = ref(true)
const showForm  = ref(false)
const saving    = ref(false)
const editingId = ref(null)
const formError = ref('')

const emptyForm = () => ({ school: '', degree: '', fieldOfStudy: '', description: '', startDate: '', endDate: '' })
const form = ref(emptyForm())

onMounted(load)

async function load() {
  loading.value = true
  try {
    const res = await educationApi.getAll()
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
    school:       item.school,
    degree:       item.degree,
    fieldOfStudy: item.fieldOfStudy,
    description:  item.description ?? '',
    startDate:    item.startDate?.substring(0, 10) ?? '',
    endDate:      item.endDate?.substring(0, 10) ?? ''
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
  if (!form.value.school.trim() || !form.value.degree.trim() || !form.value.fieldOfStudy.trim() || !form.value.startDate) {
    formError.value = 'Uddannelsessted, grad, fagområde og startdato er påkrævet.'
    return
  }

  const payload = {
    school:       form.value.school,
    degree:       form.value.degree,
    fieldOfStudy: form.value.fieldOfStudy,
    description:  form.value.description,
    startDate:    form.value.startDate,
    endDate:      form.value.endDate || null
  }

  saving.value = true
  formError.value = ''
  try {
    if (editingId.value) {
      await educationApi.update(editingId.value, payload)
    } else {
      await educationApi.create(payload)
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
  if (!confirm('Er du sikker på, at du vil slette denne uddannelse?')) return
  await educationApi.remove(id)
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
