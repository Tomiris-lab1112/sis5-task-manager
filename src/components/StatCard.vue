<script setup>
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined, RiseOutlined } from '@ant-design/icons-vue'
defineProps({ label: String, value: [Number, String], type: { type: String, default: 'all' }, hint: String })
const icons = { all: UnorderedListOutlined, completed: CheckCircleOutlined, pending: ClockCircleOutlined, rate: RiseOutlined }
</script>
<template>
  <div class="stat-card" :class="`stat-${type}`">
    <div class="stat-icon"><component :is="icons[type]" /></div>
    <p class="stat-label">{{ label }}</p>
    <h3>{{ value }}</h3>
    <span class="stat-hint">{{ hint }}</span>
  </div>
</template>
