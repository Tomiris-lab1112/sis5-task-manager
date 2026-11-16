<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from '../stores/tasks.js'
import StatCard from '../components/StatCard.vue'
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons-vue'

const router = useRouter()
const store = useTasksStore()
const upcoming = computed(() => store.tasks.filter(t => !t.completed).slice().sort((a,b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999')).slice(0, 4))
const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())
</script>

<template>
  <div class="page-container">
    <div class="eyebrow">{{ today }}</div>
    <div class="page-title-row"><div><h1>Good to see you! <span class="wave">✳</span></h1><p class="page-subtitle">Here's what's happening with your tasks today.</p></div></div>
    <section class="hero-panel"><div class="hero-copy"><span class="hero-kicker">YOUR PRODUCTIVITY SPACE</span><h2>Stay focused.<br />Get things done.</h2><p>A little progress every day adds up to big results. Keep your momentum going!</p><a-button class="hero-button" @click="router.push('/tasks')">View my tasks <ArrowRightOutlined /></a-button></div><div class="hero-art" aria-hidden="true"><div class="art-circle art-circle-one"></div><div class="art-circle art-circle-two"></div><div class="art-sheet"><div class="art-line long"></div><div class="art-entry"><CheckCircleFilled /> <i></i></div><div class="art-entry"><CheckCircleFilled /> <i></i></div><div class="art-entry light"><span>○</span><i></i></div></div></div></section>
    <div class="section-title"><h2>Overview</h2><span>Your tasks at a glance</span></div>
    <section class="stats-grid">
      <StatCard label="Total tasks" :value="store.totalTasks" type="all" hint="All your tasks" />
      <StatCard label="Completed" :value="store.completedTasks" type="completed" hint="Great work!" />
      <StatCard label="In progress" :value="store.pendingTasks" type="pending" hint="Keep it up" />
      <StatCard label="Completion rate" :value="`${store.completionRate}%`" type="rate" hint="Overall progress" />
    </section>
    <div class="bottom-grid">
      <section class="panel"><div class="panel-heading"><div><h2>Upcoming tasks</h2><p>Your next priorities</p></div><a-button type="link" @click="router.push('/tasks')">View all <ArrowRightOutlined /></a-button></div>
        <div v-if="upcoming.length" class="upcoming-list"><div v-for="task in upcoming" :key="task.id" class="upcoming-row"><span class="upcoming-dot" :class="task.priority.toLowerCase()"></span><div><strong>{{ task.title }}</strong><small>{{ task.category }} <span v-if="task.dueDate">· Due {{ task.dueDate }}</span></small></div><a-tag :color="task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'">{{ task.priority }}</a-tag></div></div>
        <a-empty v-else description="All caught up!" />
      </section>
      <section class="panel progress-panel"><div class="panel-heading"><div><h2>Weekly focus</h2><p>Keep up the momentum</p></div></div><div class="progress-center"><a-progress type="circle" :percent="store.completionRate" :size="148" :stroke-color="'#6558e8'" /><h3>You're making progress!</h3><p>{{ store.completedTasks }} of {{ store.totalTasks }} tasks completed</p></div></section>
    </div>
  </div>
</template>
