import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/tasks.js'

// Reusable Composition API logic: search, filter and sort tasks.
export function useTaskFilters() {
  const store = useTasksStore()
  const { tasks } = storeToRefs(store)
  const search = ref('')
  const status = ref('all')
  const priority = ref('all')
  const sortBy = ref('newest')

  const filteredTasks = computed(() => {
    const needle = search.value.trim().toLowerCase()
    return tasks.value
      .filter(task => !needle || `${task.title} ${task.description} ${task.category}`.toLowerCase().includes(needle))
      .filter(task => status.value === 'all' || (status.value === 'completed' ? task.completed : !task.completed))
      .filter(task => priority.value === 'all' || task.priority === priority.value)
      .sort((a, b) => {
        if (sortBy.value === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
        if (sortBy.value === 'due') return (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31')
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
  })

  function resetFilters() {
    search.value = ''
    status.value = 'all'
    priority.value = 'all'
    sortBy.value = 'newest'
  }

  return { search, status, priority, sortBy, filteredTasks, resetFilters }
}
