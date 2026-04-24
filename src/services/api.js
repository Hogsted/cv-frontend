import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

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
  send: (data) => api.post('/contactmessages', data)
}
