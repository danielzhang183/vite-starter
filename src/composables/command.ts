import type { CommandProvider } from '~/types'

export function useCommand(cmd: CommandProvider) {
  const registry = useCommandStore()

  const register = () => registry.register(cmd)
  const cleanup = () => registry.remove(cmd)

  register()
  onActivated(register)
  onDeactivated(cleanup)
  tryOnScopeDispose(cleanup)
}

export function provideGlobalCommands() {
  useCommand({
    scope: 'Preferences',

    name: () => 'Toggle dark mode',
    icon: () => isDark ? 'i-ph-sun-duotone' : 'i-ph-moon-duotone',

    onActivate() {
      isDark.value = !isDark.value
    },
  })
}
