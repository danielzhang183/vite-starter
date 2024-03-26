<script setup lang="ts">
import type { ResolvedCommand } from '~/types'

defineProps<{
  cmd: ResolvedCommand
  index: number
  active?: boolean
}>()

const emit = defineEmits<{
  (event: 'active'): void
}>()
</script>

<template>
  <div
    class="my-1 flex cursor-pointer scroll-m-10 items-center rounded-lg hover:bg-active px-3 py-2 transition-all duration-65 ease-in-out"
    :class="{ 'bg-active': active }"
    :data-index="index"
    @click="emit('active')"
  >
    <div v-if="cmd.icon" me-2 :class="cmd.icon" />

    <div class="flex flex-1 items-baseline gap-2">
      <div :class="{ 'font-medium': active }">
        {{ cmd.name }}
      </div>
      <div v-if="cmd.description" class="text-xs text-secondary">
        {{ cmd.description }}
      </div>
    </div>

    <div
      v-if="cmd.onComplete"
      class="flex items-center gap-1 transition-all duration-65 ease-in-out"
      :class="active ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-xs text-secondary">
        Complete
      </div>
      <CommandKey name="Tab" />
    </div>
    <div
      v-if="cmd.onActivate"
      class="flex items-center gap-1 transition-all duration-65 ease-in-out"
      :class="active ? 'opacity-100' : 'opacity-0'"
    >
      <div class="text-xs text-secondary">
        Activate
      </div>
      <CommandKey name="Enter" />
    </div>
  </div>
</template>
