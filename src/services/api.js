import axios from 'axios'
import router from '../router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 2000

api.interceptors.response.use(null, async error => {
  const config = error.config
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    router.push('/login')
    return Promise.reject(error)
  }
  const retryableStatus = [500, 502, 503, 504].includes(error.response?.status)
  if ((retryableStatus || !error.response) && config.method === 'get') {
    config._retryCount = (config._retryCount ?? 0) + 1
    if (config._retryCount <= MAX_RETRIES) {
      await new Promise(r => setTimeout(r, RETRY_DELAY_MS * config._retryCount))
      return api(config)
    }
  }
  return Promise.reject(error)
})

export const authApi = {
  login: (data) => api.post('/auth/login', data)
}

export const profileApi = {
  get: ()           => api.get('/profile'),
  create: (data)    => api.post('/profile', data),
  update: (id, data) => api.put(`/profile/${id}`, data)
}

export const projectsApi = {
  getAll: ()        => api.get('/projects'),
  get: (id)         => api.get(`/projects/${id}`),
  create: (data)    => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  remove: (id)      => api.delete(`/projects/${id}`)
}

export const skillsApi = {
  getAll: ()        => api.get('/skills'),
  get: (id)         => api.get(`/skills/${id}`),
  create: (data)    => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  remove: (id)      => api.delete(`/skills/${id}`)
}

export const experienceApi = {
  getAll: ()        => api.get('/experiences'),
  get: (id)         => api.get(`/experiences/${id}`),
  create: (data)    => api.post('/experiences', data),
  update: (id, data) => api.put(`/experiences/${id}`, data),
  remove: (id)      => api.delete(`/experiences/${id}`)
}

export const educationApi = {
  getAll: ()        => api.get('/education'),
  get: (id)         => api.get(`/education/${id}`),
  create: (data)    => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  remove: (id)      => api.delete(`/education/${id}`)
}

export const contactApi = {
  send: (data)  => api.post('/contactmessages', data),
  getAll: ()    => api.get('/contactmessages'),
  markRead: (id) => api.patch(`/contactmessages/${id}/read`),
  remove: (id)  => api.delete(`/contactmessages/${id}`)
}
