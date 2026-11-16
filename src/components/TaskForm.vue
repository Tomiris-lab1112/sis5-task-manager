<script setup>
import { reactive, watch } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({ open: Boolean, task: { type: Object, default: null } })
const emit = defineEmits(['close', 'save'])
const initial = () => ({ title: '', description: '', category: 'Study', priority: 'Medium', dueDate: '' })
const form = reactive(initial())

watch(() => [props.open, props.task], () => {
  Object.assign(form, initial(), props.task || {})
}, { immediate: true })

function submit() {
  if (!form.title.trim()) {
    message.warning('Please enter a task title.')
    return
  }
  if (form.title.trim().length > 100) {
    message.warning('Title must be 100 characters or fewer.')
    return
  }
  emit('save', { ...form, title: form.title.trim() })
}
</script>

<template>
  <a-modal :open="open" :title="task ? 'Edit task' : 'Create new task'" :footer="null" :destroy-on-close="true" @cancel="emit('close')">
    <p class="modal-hint">{{ task ? 'Update the details of your task.' : 'Add something you want to get done.' }}</p>
    <a-form layout="vertical" @finish="submit">
      <a-form-item label="Task title" required>
        <a-input v-model:value="form.title" placeholder="e.g. Complete Vue assignment" :maxlength="100" show-count />
      </a-form-item>
      <a-form-item label="Description">
        <a-textarea v-model:value="form.description" placeholder="Add a few details (optional)" :rows="3" :maxlength="500" />
      </a-form-item>
      <div class="form-grid">
        <a-form-item label="Category">
          <a-select v-model:value="form.category">
            <a-select-option value="Study">Study</a-select-option>
            <a-select-option value="Work">Work</a-select-option>
            <a-select-option value="Personal">Personal</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Priority">
          <a-select v-model:value="form.priority">
            <a-select-option value="High">High</a-select-option>
            <a-select-option value="Medium">Medium</a-select-option>
            <a-select-option value="Low">Low</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <a-form-item label="Due date (optional)">
        <a-input v-model:value="form.dueDate" type="date" />
      </a-form-item>
      <div class="modal-actions">
        <a-button @click="emit('close')">Cancel</a-button>
        <a-button type="primary" html-type="submit">{{ task ? 'Save changes' : 'Add task' }}</a-button>
      </div>
    </a-form>
  </a-modal>
</template>
