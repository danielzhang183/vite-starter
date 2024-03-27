<script setup lang="ts">
import screenfull from 'screenfull'

const isFullscreen = ref(false)

onMounted(() => {
  if (screenfull.isEnabled)
    screenfull.onchange(() => isFullscreen.value = !isFullscreen.value)
})

onUnmounted(() => screenfull.off('change', () => {}))

function toggleScreenFull() {
  if (screenfull.isEnabled)
    screenfull.toggle()
}
</script>

<template>
  <button btn-icon @click="toggleScreenFull">
    <div :class="[isFullscreen ? 'i-ph-arrows-in-duotone' : 'i-ph-arrows-out-duotone']" />
  </button>
</template>
