export function useIsMac() {
  return computed(() => navigator?.platform?.includes('Mac') ?? false)
}
