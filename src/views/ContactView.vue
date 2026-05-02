<template>
  <div>
    <h2>Kontakt</h2>

    <p class="contact-info">
      Du kan kontakte mig igennem formulen her, på
      <a href="mailto:gustavhogsted@gmail.com">gustavhogsted@gmail.com</a>
      eller på <a href="tel:+4553643620">+45 53643620</a>
    </p>

    <form @submit.prevent="submit" class="contact-form">
      <div class="field">
        <label>Navn</label>
        <input v-model="form.name" type="text" required maxlength="100" />
      </div>

      <div class="field">
        <label>Email</label>
        <input v-model="form.email" type="email" required maxlength="200" />
      </div>

      <div class="field">
        <label>Emne</label>
        <input v-model="form.subject" type="text" required maxlength="200" />
      </div>

      <div class="field">
        <label>Besked</label>
        <textarea v-model="form.message" rows="5" required maxlength="2000"></textarea>
      </div>

      <button type="submit" :disabled="sending">
        {{ sending ? 'Sender...' : 'Send besked' }}
      </button>

      <p v-if="success" class="success">Besked sendt!</p>
      <p v-if="error" class="error">Noget gik galt. Prøv igen.</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { contactApi } from '../services/api'

const form = ref({ name: '', email: '', subject: '', message: '' })
const sending = ref(false)
const success = ref(false)
const error = ref(false)

async function submit() {
  sending.value = true
  success.value = false
  error.value = false

  try {
    await contactApi.send(form.value)
    success.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact-info {
  color: #aaa;
  margin-bottom: 1.5rem;
}

.contact-info a {
  color: #4fc3f7;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.contact-form {
  max-width: 550px;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

label {
  font-size: 0.85rem;
  color: #aaa;
}

input, textarea {
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #4fc3f7;
}

textarea {
  resize: vertical;
}

button {
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success { color: #69db7c; margin: 0; }
.error   { color: #ff8787; margin: 0; }
</style>
