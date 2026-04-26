<template>
  <div class="login-wrap">
    <div class="login-box">
      <h2>Admin login</h2>

      <div class="field">
        <label>Brugernavn</label>
        <input v-model="form.username" @keyup.enter="login" />
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="form.password" type="password" @keyup.enter="login" />
      </div>

      <p v-if="error" class="error">Forkert brugernavn eller password.</p>

      <button class="btn-login" @click="login" :disabled="loading">
        {{ loading ? 'Logger ind...' : 'Log ind' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '../services/api'

const router = useRouter()
const form    = ref({ username: '', password: '' })
const error   = ref(false)
const loading = ref(false)

async function login() {
  error.value = false
  loading.value = true
  try {
    const res = await authApi.login(form.value)
    localStorage.setItem('token', res.data.token)
    router.push('/admin')
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 6rem;
}

.login-box {
  background: #16213e;
  border: 1px solid #2a2a4a;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  margin: 0 0 0.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

label {
  font-size: 0.8rem;
  color: #aaa;
}

input {
  background: #0f0f1a;
  border: 1px solid #2a2a4a;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  color: #fff;
  font-size: 0.9rem;
}

input:focus {
  outline: none;
  border-color: #4fc3f7;
}

.btn-login {
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  padding: 0.6rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-login:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-login:not(:disabled):hover { opacity: 0.85; }

.error {
  color: #ff8787;
  font-size: 0.85rem;
  margin: 0;
}
</style>
