<template>
  <div>
    <div class="list-header">
      <h3>Profil</h3>
    </div>

    <div v-if="loading" class="loading">Henter fra Azure, kan tage op til 10 sekunder...</div>

    <div v-else class="form-box">
      <div class="field">
        <label>Fulde navn *</label>
        <input v-model="form.fullName" maxlength="100" />
      </div>
      <div class="field">
        <label>Titel *</label>
        <input v-model="form.title" maxlength="100" />
      </div>
      <div class="field">
        <label>Bio *</label>
        <textarea v-model="form.bio" rows="5" maxlength="2000"></textarea>
      </div>
      <div class="field">
        <label>Email *</label>
        <input v-model="form.email" type="email" maxlength="200" />
      </div>
      <div class="field">
        <label>GitHub URL</label>
        <input v-model="form.gitHubUrl" maxlength="300" />
      </div>
      <div class="field">
        <label>LinkedIn URL</label>
        <input v-model="form.linkedInUrl" maxlength="300" />
      </div>

      <p v-if="formError" class="error">{{ formError }}</p>
      <p v-if="saved" style="color: #69db7c; font-size: 0.85rem;">Profil gemt!</p>

      <div class="form-actions">
        <button class="btn-save" @click="save" :disabled="saving">
          {{ saving ? 'Gemmer...' : 'Gem profil' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { profileApi } from '../../services/api'

const loading = ref(true)
const saving  = ref(false)
const saved   = ref(false)
const formError = ref('')
const profileId = ref(null)

const form = ref({
  fullName: '', title: '', bio: '', email: '', gitHubUrl: '', linkedInUrl: ''
})

onMounted(async () => {
  try {
    const res = await profileApi.get()
    profileId.value = res.data.id
    form.value = {
      fullName:    res.data.fullName,
      title:       res.data.title,
      bio:         res.data.bio,
      email:       res.data.email,
      gitHubUrl:   res.data.gitHubUrl ?? '',
      linkedInUrl: res.data.linkedInUrl ?? ''
    }
  } catch {
    // Ingen profil endnu — vis tomt formular
  } finally {
    loading.value = false
  }
})

async function save() {
  if (!form.value.fullName.trim() || !form.value.title.trim() || !form.value.bio.trim() || !form.value.email.trim()) {
    formError.value = 'Navn, titel, bio og email er påkrævet.'
    return
  }

  saving.value = true
  formError.value = ''
  saved.value = false
  try {
    const payload = {
      fullName:    form.value.fullName,
      title:       form.value.title,
      bio:         form.value.bio,
      email:       form.value.email,
      gitHubUrl:   form.value.gitHubUrl || null,
      linkedInUrl: form.value.linkedInUrl || null
    }
    if (profileId.value) {
      await profileApi.update(profileId.value, payload)
    } else {
      const res = await profileApi.create(payload)
      profileId.value = res.data.id
    }
    saved.value = true
  } catch {
    formError.value = 'Noget gik galt.'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped src="./admin.css"></style>
