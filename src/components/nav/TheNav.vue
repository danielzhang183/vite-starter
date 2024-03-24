<script setup lang="ts" name="TheNav">

</script>

<template>
  <nav px-4 py-3 text-lg border="b base" flex="~ items-center gap-2">
    <div flex="~ items-center">
      <div i-carbon-campsite text-primary text-2xl />
      <div ml-1 text-xl>
        Vite
        <sup class="text-xs italic opacity-75">Opinionated Template</sup>
      </div>
    </div>
    <div flex-auto />

    <button btn-icon title="Theme Toggle" @click="toggleDark">
      <div i-ph-sun-duotone dark:i-ph-moon-duotone />
    </button>

    <VDropdown :distance="6">
      <button
        btn-icon
        title="Built Information"
      >
        <div i-ph-info-duotone />
      </button>
      <template #popper>
        <div px5 py4 grid="~ gap-y-3 gap-x-2 cols-[max-content_1fr] items-center">
          <div i-ph-package-duotone text-xl />
          <div>Built info</div>
        </div>
      </template>
    </VDropdown>

    <a
      btn-icon inline-flex items-center
      rel="noreferrer"
      href="https://github.com/danielzhang183/vite-starter"
      target="_blank"
      title="GitHub"
    >
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
