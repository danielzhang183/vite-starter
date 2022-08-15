<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()

watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-pedestrian inline-block />
    </div>
    <p>
      Hi, {{ props.name }}
    </p>

    <p text-sm opacity-75>
      <em>Dynamic Route</em>
    </p>

    <template v-if="user.otherNames.length">
      <p text-sm mt-4>
        <span opacity-75>Also known as:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      </p>
    </template>

    <div>
      <button
        btn m="3 t6" text-sm
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
