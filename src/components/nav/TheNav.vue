<script setup lang="ts" name="TheNav">

</script>

<template>
  <nav px-4 py-3 text-lg border="b base" flex="~ items-center gap-2">
    <div flex="~ items-center">
      <div i-carbon-campsite text-2xl text-primary />
      <div ml-1 text-xl>
        Vite
        <sup class="text-xs italic opacity-75">Opinionated Template</sup>
      </div>
    </div>

    <div flex-auto />

    <SettingsScreenFull />

    <button btn-icon title="Theme Toggle" @click="toggleDark">
      <div i-ph-sun-duotone dark:i-ph-moon-duotone />
    </button>

    <SettingsThemeColors />

    <SettingsBuildInfo />

    <a
      btn-icon
      rel="noreferrer"
      href="https://github.com/danielzhang183/vite-starter"
      target="_blank"
      title="GitHub"
    >
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
