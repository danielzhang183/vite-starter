<script setup lang="ts">
import screenfull from 'screenfull'

const isFullscreen = ref(false)

function toggleScreenFull() {
  if (screenfull.isEnabled) {
    screenfull.toggle()
    isFullscreen.value = screenfull.isFullscreen
  }
}
</script>

<template>
  <button btn-icon @click="toggleScreenFull">
    <div :class="[isFullscreen ? 'i-ph-arrows-in-duotone' : 'i-ph-arrows-out-duotone']" />
  </button>
</template>
