<script setup lang="ts" name="TheNav">

</script>

<template>
  <nav px-4 py-3 text-lg border="b base" flex="~ items-center gap-2">
    <div flex="~ items-center">
      <div i-carbon-campsite text-primary text-2xl />
      <div ml-1 text-xl>
        Vite
        <sup class="text-xs italic">template</sup>
      </div>
    </div>
    <div flex-auto />

    <button btn-icon @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon />
    </button>

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
