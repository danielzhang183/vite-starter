export const commandPanelInput = ref('')
export const isCommandPanelOpen = ref(false)

export function openCommandPanel(isCommandMode = false) {
  commandPanelInput.value = isCommandMode ? '> ' : ''
  isCommandPanelOpen.value = true
}

export function closeCommandPanel() {
  isCommandPanelOpen.value = false
}

export function toggleCommandPanel() {
  isCommandPanelOpen.value = !isCommandPanelOpen.value
}
