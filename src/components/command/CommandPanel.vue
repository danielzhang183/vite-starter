<script setup lang="ts">
import type { CommandScope, QueryResult, QueryResultItem } from '~/types'

const emit = defineEmits<{
  (event: 'close'): void
}>()

const registry = useCommandStore()

const resultEl = ref<HTMLDivElement>()
const inputEl = ref<HTMLInputElement>()

const scopes = ref<CommandScope[]>([])
const input = ref('')

onMounted(() => {
  inputEl.value?.focus()
})

// const commandMode = computed(() => input.value.startsWith('>'))

// const query = computed(() => commandMode.value ? '' : input.value.trim())

const result = computed<QueryResult>(() => registry.query(scopes.value?.map(s => s.id).join('.'), input.value.slice(1).trim()))

const isMac = useIsMac()
const modifierKeyName = computed(() => isMac.value ? '⌘' : 'Ctrl')

const active = ref(0)
watch(result, (n, o) => {
  if (n.length !== o.length || !n.items.every((i, idx) => i === o.items[idx]))
    active.value = 0
})

function findItemEl(index: number) {
  return resultEl.value?.querySelector(`[data-index="${index}"]`) as HTMLDivElement
}
function onCommandActivate(item: QueryResultItem) {
  if (item.onActivate) {
    item.onActivate()
    emit('close')
  }
  else if (item.onComplete) {
    scopes.value.push(item.onComplete())
    input.value = '> '
  }
}
function onCommandComplete(item: QueryResultItem) {
  if (item.onComplete) {
    scopes.value.push(item.onComplete())
    input.value = '> '
  }
  else if (item.onActivate) {
    item.onActivate()
    emit('close')
  }
}
function intoView(index: number) {
  const el = findItemEl(index)
  if (el)
    el.scrollIntoView({ block: 'nearest' })
}
function setActive(index: number) {
  const len = result.value.length
  active.value = (index + len) % len
  intoView(active.value)
}

function onKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'p':
    case 'ArrowUp': {
      if (e.key === 'p' && !e.ctrlKey)
        break
      e.preventDefault()
      setActive(active.value - 1)
      break
    }
    case 'n':
    case 'ArrowDown': {
      if (e.key === 'n' && !e.ctrlKey)
        break
      e.preventDefault()
      setActive(active.value + 1)
      break
    }

    case 'Home': {
      e.preventDefault()
      active.value = 0
      intoView(active.value)
      break
    }

    case 'End': {
      e.preventDefault()
      setActive(result.value.length - 1)
      break
    }

    case 'Enter': {
      e.preventDefault()
      const cmd = result.value.items[active.value]
      if (cmd)
        onCommandActivate(cmd)
      break
    }

    case 'Tab': {
      e.preventDefault()
      const cmd = result.value.items[active.value]
      if (cmd)
        onCommandComplete(cmd)
      break
    }

    case 'Backspace': {
      if (input.value === '>' && scopes.value.length) {
        e.preventDefault()
        scopes.value.pop()
      }
      break
    }
  }
}

const loading = ref(false)
</script>

<template>
  <div flex="~ col" h-50vh max-h-120 max-w-180 w-50vw>
    <!-- Input -->
    <label flex="~ items-center" mx-3 my-1>
      <div i-ri:search-line mx-1 />

      <div v-for="scope in scopes" :key="scope.id" class="mx-1 flex items-center gap-2">
        <div class="text-sm">{{ scope.display }}</div>
        <span class="text-secondary">/</span>
      </div>

      <input
        ref="inputEl"
        v-model="input"
        class="flex-1 rounded bg-base p-2 focus:outline-none"
        placeholder="Search"
        @keydown="onKeydown"
      >

      <CommandKey name="Escape" />
    </label>

    <div class="w-full border-b-1 border-base" />

    <!-- Results -->
    <div ref="resultEl" class="mx-1 flex-1 overflow-y-auto">
      <template v-if="loading" />
      <template v-else-if="result.length">
        <template v-for="[scope, group] in result.grouped" :key="scope">
          <div class="mt-2 px-2 py-1 text-sm text-secondary">
            {{ scope }}
          </div>

          <template v-for="item in group" :key="item.index">
            <CommandItem
              v-if="item.type === 'command'"
              :index="item.index"
              :cmd="item.cmd"
              :active="active === item.index"
              @activate="onCommandActivate(item)"
            />
          </template>
        </template>
      </template>
      <div v-else class="p5 text-center text-secondary italic">
        {{
          input.trim().length
            ? '404 Not Found'
            : 'Search for items'
        }}
      </div>
    </div>

    <div class="w-full border-b-1 border-base" />

    <!-- Footer -->
    <div class="flex items-center px-3 py-1 text-xs">
      <div i-ri:lightbulb-flash-line /> Tip: Use
      <CommandKey :name="`${modifierKeyName}+K`" /> to search,
      <CommandKey :name="`${modifierKeyName}+/`" /> to activate command mode.
    </div>
  </div>
</template>
