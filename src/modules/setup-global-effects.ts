import type { UserModule } from '~/types'

export const install: UserModule = () => {
  const userSettings = useUserSettings()
  const html = document.documentElement

  watchEffect(() => {
    Object.entries(userSettings.value.themeColors || {}).forEach(([k, v]) => html.style.setProperty(k, v))
  })
}
