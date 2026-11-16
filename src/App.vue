<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppstoreOutlined, CheckSquareOutlined, InfoCircleOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons-vue'
import TaskForm from './components/TaskForm.vue'
import { useTasksStore } from './stores/tasks.js'
import { message } from 'ant-design-vue'

const router = useRouter()
const store = useTasksStore()
const formOpen = ref(false)
const mobileOpen = ref(false)
function saveNewTask(input) {
  store.addTask(input)
  formOpen.value = false
  message.success('Task created!')
  router.push('/tasks')
}
</script>

<template>
  <a-config-provider :theme="{ token: { colorPrimary: '#6558e8', borderRadius: 10, fontFamily: 'Inter, system-ui, sans-serif' } }">
    <div class="shell">
      <aside class="sidebar" :class="{ 'sidebar-open': mobileOpen }">
        <div class="brand"><span class="brand-mark">✓</span><span>task<span class="brand-emphasis">flow</span><small>MY WORKSPACE</small></span></div>
        <div class="menu-label">WORKSPACE</div>
        <nav class="nav-items">
          <router-link to="/" class="nav-item" @click="mobileOpen = false"><AppstoreOutlined /> Dashboard</router-link>
          <router-link to="/tasks" class="nav-item" @click="mobileOpen = false"><CheckSquareOutlined /> My Tasks <span class="nav-count">{{ store.pendingTasks }}</span></router-link>
        </nav>
        <div class="menu-label about-label">GENERAL</div>
        <nav class="nav-items"><router-link to="/about" class="nav-item" @click="mobileOpen = false"><InfoCircleOutlined /> About project</router-link></nav>
        <div class="sidebar-bottom"><div class="profile-avatar">T</div><div><strong>My workspace</strong><small>Vue 3 · SIS 5 Project</small></div></div>
      </aside>
      <div v-if="mobileOpen" class="sidebar-overlay" @click="mobileOpen = false"></div>
      <div class="main-area">
        <header class="topbar">
          <a-button type="text" class="mobile-menu" @click="mobileOpen = !mobileOpen"><MenuOutlined /></a-button>
          <span class="topbar-crumb">Workspace <span>/</span> <strong>{{ $route.name === 'tasks' ? 'My Tasks' : $route.name === 'about' ? 'About' : 'Dashboard' }}</strong></span>
          <a-button type="primary" class="header-add" @click="formOpen = true"><PlusOutlined /> New Task</a-button>
        </header>
        <main class="page-body"><router-view /></main>
      </div>
    </div>
    <TaskForm :open="formOpen" @close="formOpen = false" @save="saveNewTask" />
  </a-config-provider>
</template>
