<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Pomodoro Timer` : 'Pomodoro Timer'
    },
    bodyAttrs: {
      class: 'bg-white dark:bg-gray-950'
    }
  })


  onMounted(() => {
    usePomodoroStore().reset()
  })


</script>
