# TaskFlow - SIS 5 (JS Framework Vue)

A complete task management app built with **Vue 3 + Pinia + Ant Design Vue + Vue Router + reusable composables**.

## How to run (VS Code / PowerShell)

1. Extract this project and open the **sis5-task-manager** folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run:

```powershell
npm install
npm run dev
```

4. Open the localhost URL printed by Vite, usually `http://localhost:5173/`.

To test a production build:

```powershell
npm run build
npm run preview
```

## Features

- Add new tasks, edit tasks, delete tasks, toggle completed status
- Task title validation; optional description, category, priority, due date
- Search tasks; filter by completion status and priority; sort by date
- Dashboard with totals and completion percentage
- Save task data in browser `localStorage` (no backend required)
- Dashboard, Tasks, and About pages using Vue Router
- Responsive interface built with Ant Design Vue

## SIS 5 requirements checklist

| Requirement in SIS 5 PDF | Implemented in |
|---|---|
| Vue 3 | `src/main.js`, all `.vue` components (Composition API / script setup) |
| Variables store using Pinia | `src/stores/tasks.js` (`state`, `getters`, `actions`) |
| Use Ant Design Vue | `src/main.js`, forms, buttons, modal, tags, progress, confirmation |
| Project components should use composables | `src/composables/useTaskFilters.js` imported in `TasksView.vue` |


## Main files

```text
src/
  components/
    StatCard.vue
    TaskCard.vue
    TaskForm.vue
  composables/
    useTaskFilters.js
  router/
    index.js
  stores/
    tasks.js
  views/
    DashboardView.vue
    TasksView.vue
    AboutView.vue
  App.vue
  main.js
  style.css
```

