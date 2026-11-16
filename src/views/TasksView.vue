<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasks.js'
import { useTaskFilters } from '../composables/useTaskFilters.js'
import TaskCard from '../components/TaskCard.vue'
import TaskForm from '../components/TaskForm.vue'
import { SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const store = useTasksStore()
const { search, status, priority, sortBy, filteredTasks, resetFilters } = useTaskFilters()
const modalOpen = ref(false)
const editingTask = ref(null)
function newTask() { editingTask.value = null; modalOpen.value = true }
function editTask(task) { editingTask.value = task; modalOpen.value = true }
function saveTask(form) {
  if (editingTask.value) { store.updateTask(editingTask.value.id, form); message.success('Task updated!') }
  else { store.addTask(form); message.success('Task created!') }
  modalOpen.value = false
  editingTask.value = null
}
function removeTask(id) { store.deleteTask(id); message.success('Task deleted') }
function removeCompleted() { store.clearCompleted(); message.success('Completed tasks cleared') }
</script>

<template>
  <div class="page-container">
    <div class="eyebrow">ORGANIZE YOUR DAY</div>
    <div class="page-title-row"><div><h1>My Tasks</h1><p class="page-subtitle">Manage and track everything you need to do.</p></div><a-button type="primary" size="large" @click="newTask"><PlusOutlined /> Add new task</a-button></div>
    <div class="tasks-toolbar">
      <a-input v-model:value="search" class="search-field" size="large" placeholder="Search your tasks..." allow-clear><template #prefix><SearchOutlined style="color:#9ca3b5" /></template></a-input>
      <a-select v-model:value="status" size="large" class="filter-select"><a-select-option value="all">All statuses</a-select-option><a-select-option value="pending">In progress</a-select-option><a-select-option value="completed">Completed</a-select-option></a-select>
      <a-select v-model:value="priority" size="large" class="filter-select"><a-select-option value="all">All priorities</a-select-option><a-select-option value="High">High priority</a-select-option><a-select-option value="Medium">Medium priority</a-select-option><a-select-option value="Low">Low priority</a-select-option></a-select>
      <a-select v-model:value="sortBy" size="large" class="filter-select"><a-select-option value="newest">Newest first</a-select-option><a-select-option value="oldest">Oldest first</a-select-option><a-select-option value="due">Due date</a-select-option></a-select>
    </div>
    <div class="tasks-list-wrap"><div class="list-heading"><div><h2>All tasks <span class="task-total">{{ filteredTasks.length }}</span></h2><span>Click the checkbox to mark a task complete</span></div><a-popconfirm v-if="store.completedTasks" title="Remove all completed tasks?" ok-text="Clear" @confirm="removeCompleted"><a-button type="text" danger><DeleteOutlined /> Clear completed</a-button></a-popconfirm></div>
      <div v-if="filteredTasks.length" class="tasks-list"><TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @toggle="store.toggleTask" @edit="editTask" @delete="removeTask" /></div>
      <div v-else class="empty-state"><a-empty description="No tasks found"><a-button @click="resetFilters">Reset filters</a-button></a-empty></div>
    </div>
    <TaskForm :open="modalOpen" :task="editingTask" @close="modalOpen = false" @save="saveTask" />
  </div>
</template>
