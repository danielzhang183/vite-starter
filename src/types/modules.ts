import type { App } from 'vue'
import type { Router } from 'vue-router/auto'

interface Context {
  app: App<Element>
  router: Router
}

export type UserModule = (ctx: Context) => void
