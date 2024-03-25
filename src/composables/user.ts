import { useLocalStorage } from '@vueuse/core'
import type { EffectScope, Ref } from 'vue'
import type { UserSettings } from '~/types'
import { STORAGE_KEY_SETTINGS } from '~/constants'

export function useUserSettings() {
  const settingsStorage = useUserLocalStorage<UserSettings>(STORAGE_KEY_SETTINGS, () => getDefaultUserSettings())
  return settingsStorage
}

interface UseUserLocalStorageCache {
  scope: EffectScope
  value: Ref<Record<string, any>>
}

/**
 * Create reactive storage for the current user
 * @param key
 * @param initial
 */
export function useUserLocalStorage<T extends object>(key: string, initial: () => T): Ref<T> {
  // @ts-expect-error bind value to the function
  const map: Map<string, UseUserLocalStorageCache> = useUserLocalStorage._ = useUserLocalStorage._ || new Map()

  if (!map.has(key)) {
    const scope = effectScope(true)
    const value = scope.run(() => {
      const all = useLocalStorage<Record<string, T>>(key, {}, { deep: true })
      return computed(() => {
        const account = useUserStore().savedName
        const id = account ?? '[anonymous]'
        if (!all.value[id])
          all.value[id] = Object.assign(initial(), all.value[id] || {})

        return all.value[id]
      })
    })
    map.set(key, { scope, value: value! })
  }

  return map.get(key)!.value as Ref<T>
}

export function clearUserLocalStorage(account: string) {
  if (!account)
    account = useUserStore().savedName
  if (!account)
    return

  const id = account
  // @ts-expect-error bind value to the function
  const cacheMap = useUserLocalStorage._ as Map<string, UseUserLocalStorageCache> | undefined
  cacheMap?.forEach(({ value }) => {
    if (value.value[id])
      delete value.value[id]
  })
}

export function getDefaultUserSettings() {
  return {}
}
