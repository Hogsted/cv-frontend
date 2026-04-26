<template>
  <div>
    <div class="list-header">
      <h3>Beskeder</h3>
    </div>

    <div v-if="loading" class="loading">Henter...</div>

    <div v-else-if="items.length === 0" class="empty">Ingen beskeder endnu.</div>

    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item message-item" :class="{ unread: !item.isRead }">
        <div class="item-info">
          <div class="message-header">
            <strong>{{ item.name }}</strong>
            <span class="item-sub">{{ item.email }}</span>
            <span class="item-sub">{{ formatDate(item.sentAt) }}</span>
          </div>
          <span class="message-subject">{{ item.subject }}</span>
          <p class="message-body">{{ item.message }}</p>
        </div>
        <div class="item-actions">
          <button v-if="!item.isRead" class="btn-edit" @click="markRead(item)">Markér læst</button>
          <button class="btn-delete" @click="remove(item.id)">Slet</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { contactApi } from '../../services/api'

const items   = ref([])
const loading = ref(true)

onMounted(load)

async function load() {
  loading.value = true
  try {
    const res = await contactApi.getAll()
    items.value = res.data
  } finally {
    loading.value = false
  }
}

async function markRead(item) {
  await contactApi.markRead(item.id)
  item.isRead = true
}

async function remove(id) {
  if (!confirm('Slet denne besked?')) return
  await contactApi.remove(id)
  items.value = items.value.filter(i => i.id !== id)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('da-DK', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
</script>

<style scoped src="./admin.css"></style>

<style scoped>
.message-item {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.message-item .item-actions {
  align-self: flex-end;
}

.message-header {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  flex-wrap: wrap;
}

.message-subject {
  font-size: 0.85rem;
  color: #4fc3f7;
}

.message-body {
  font-size: 0.85rem;
  color: #ccc;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
}

.unread {
  border-color: #4fc3f7;
}
</style>
