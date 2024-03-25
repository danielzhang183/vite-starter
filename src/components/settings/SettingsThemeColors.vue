<script setup lang="ts">
import type { ThemeColors } from '~/types'

const themes = Object.values(
  import.meta.glob<{ default: [string, ThemeColors][] }>('~/constants/themes.json', { eager: true }),
)[0].default

const settings = useUserSettings()

const currentTheme = ref(
  settings.value.themeColors?.['--theme-color-name'] || themes[0][1]['--theme-color-name'],
)

function updateTheme(theme: ThemeColors) {
  currentTheme.value = theme['--theme-color-name']
  settings.value.themeColors = theme
}
</script>

<template>
  <VDropdown :distance="6">
    <button btn-icon>
      <div class="i-ph-palette-duotone" />
    </button>

    <template #popper>
      <div w-28 flex="~ row wrap gap-4" p-4>
        <div
          v-for="[key, theme] in themes"
          :key="key"
          :style="{
            'background': key,
            '--local-ring-color': key,
          }"
          :class="currentTheme === theme['--theme-color-name'] ? 'ring-2' : 'scale-120'"
          :title="theme['--theme-color-name']"
          ring="offset-2 $local-ring-color $c-bg-base" h-4 w-4 cursor-pointer rounded-full transition-all
          @click="updateTheme(theme)"
        />
      </div>
    </template>
  </VDropdown>
</template>
