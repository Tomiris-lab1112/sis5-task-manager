import { defineStore } from 'pinia'

const STORAGE_KEY = 'sis5-taskflow-tasks-v1'
const demoTasks = [
  { id: 1, title: 'Finish Vue 3 assignment', description: 'Review components and Composition API.', category: 'Study', priority: 'High', completed: false, dueDate: '2026-11-20', createdAt: '2026-11-10T09:00:00.000Z' },
  { id: 2, title: 'Review Pinia store', description: 'Practice state, getters, and actions.', category: 'Study', priority: 'Medium', completed: true, dueDate: '2026-11-18', createdAt: '2026-11-10T10:00:00.000Z' },
  { id: 3, title: 'Prepare project presentation', description: 'Explain the architecture and demo CRUD operations.', category: 'Personal', priority: 'High', completed: false, dueDate: '2026-11-23', createdAt: '2026-11-11T11:00:00.000Z' },
  { id: 4, title: 'Organize weekly schedule', description: 'Plan upcoming priorities.', category: 'Work', priority: 'Low', completed: false, dueDate: '', createdAt: '2026-11-12T12:00:00.000Z' },
]

function readTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (error) {
    console.warn('Could not load saved tasks:', error)
  }
  return demoTasks.map(task => ({ ...task }))
}

export const useTasksStore = defineStore('tasks', {
  // Pinia state: shared reactive variables (Lecture 6: state management).
  state: () => ({ tasks: readTasks() }),
  getters: {
    totalTasks: state => state.tasks.length,
    completedTasks: state => state.tasks.filter(task => task.completed).length,
    pendingTasks: state => state.tasks.filter(task => !task.completed).length,
    completionRate: state => state.tasks.length
      ? Math.round((state.tasks.filter(task => task.completed).length / state.tasks.length) * 100)
      : 0,
  },
  actions: {
    persist() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks)) }
      catch (error) { console.warn('Could not save tasks:', error) }
    },
    addTask(input) {
      const nextId = Math.max(0, ...this.tasks.map(task => Number(task.id) || 0)) + 1
      this.tasks.unshift({
        id: nextId,
        title: input.title.trim(),
        description: (input.description || '').trim(),
        category: input.category || 'Personal',
        priority: input.priority || 'Medium',
        dueDate: input.dueDate || '',
        completed: false,
        createdAt: new Date().toISOString(),
      })
      this.persist()
    },
    updateTask(id, changes) {
      const task = this.tasks.find(item => item.id === id)
      if (!task) return
      Object.assign(task, {
        title: changes.title.trim(),
        description: (changes.description || '').trim(),
        category: changes.category,
        priority: changes.priority,
        dueDate: changes.dueDate || '',
      })
      this.persist()
    },
    toggleTask(id) {
      const task = this.tasks.find(item => item.id === id)
      if (!task) return
      task.completed = !task.completed
      this.persist()
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(item => item.id !== id)
      this.persist()
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(item => !item.completed)
      this.persist()
    },
  },
})
