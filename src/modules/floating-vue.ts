import FloatingVue from 'floating-vue'
import type { UserModule } from '../types'

export const install: UserModule = ({ app }) => {
  app.use(FloatingVue)
}
