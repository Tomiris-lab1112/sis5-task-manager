<script setup>
import { computed } from 'vue'
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons-vue'

const props = defineProps({ task: { type: Object, required: true } })
const emit = defineEmits(['toggle', 'edit', 'delete'])
const priorityColor = computed(() => ({ High: 'red', Medium: 'orange', Low: 'green' })[props.task.priority])
const formattedDate = computed(() => {
  if (!props.task.dueDate) return ''
  const [y, m, d] = props.task.dueDate.split('-')
  return `${d}.${m}.${y}`
})
</script>

<template>
  <div class="task-card" :class="{ 'task-done': task.completed }">
    <a-checkbox :checked="task.completed" class="task-checkbox" @change="emit('toggle', task.id)" />
    <div class="task-content">
      <div class="task-head">
        <h3>{{ task.title }}</h3>
        <a-tag :color="priorityColor">{{ task.priority }}</a-tag>
      </div>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      <div class="task-meta">
        <span class="category-pill">{{ task.category }}</span>
        <span v-if="task.dueDate" class="task-date"><CalendarOutlined /> {{ formattedDate }}</span>
        <span v-if="task.completed" class="completed-label">✓ Completed</span>
      </div>
    </div>
    <div class="task-actions">
      <a-button type="text" aria-label="Edit task" @click="emit('edit', task)"><EditOutlined /></a-button>
      <a-popconfirm title="Delete this task?" ok-text="Delete" cancel-text="Cancel" @confirm="emit('delete', task.id)">
        <a-button type="text" danger aria-label="Delete task"><DeleteOutlined /></a-button>
      </a-popconfirm>
    </div>
  </div>
</template>
