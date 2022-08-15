import { UserModule } from './../types';
import { createPinia } from 'pinia'

export const install: UserModule = ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
}
