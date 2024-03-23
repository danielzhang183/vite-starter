import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'floating-vue/dist/style.css'
import './styles/main.css'
import './styles/default-theme.css'
import './styles/vars.css'
import './styles/dropdown.css'
import type { UserModule } from './types'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
})

app.use(router)
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.({ app, router }))
app.mount('#app')
