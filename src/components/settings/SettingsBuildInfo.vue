<script setup lang="ts">
</script>

<template>
  <VDropdown :distance="6">
    <button btn-icon title="Built Information">
      <div i-ph-info-duotone />
    </button>
    <template #popper>
      <div px5 py4 grid="~ gap-y-3 gap-x-2 cols-[max-content_1fr] items-center">
        <div i-ph-package-duotone text-xl />
        <div>Built info</div>
      </div>
      <div px5 py4 flex="~ items-center gap-y-3 gap-x-2">
        <div i-ph-microsoft-teams-logo-duotone mt-1 text-xl />
        <template v-for="team of teamMembers" :key="team.github">
          <a :href="`https://github.com/sponsors/${team.github}`" target="_blank" rounded-full transition duration-300 border="~ transparent" hover="scale-105 border-primary">
            <img :src="`/avatars/${team.github}-100x100.png`" :alt="team.display" h-7 w-7 rounded-full height="60" width="60">
          </a>
        </template>
      </div>
    </template>
  </VDropdown>
</template>
