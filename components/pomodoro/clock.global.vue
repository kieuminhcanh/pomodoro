<template>
    <div class="relative w-64 h-64 rounded-full bg-white border-4 border-gray-300">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-28 bg-red-500 origin-bottom animate-spin-slow z-30"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-gray-700 origin-bottom animate-spin-medium z-20"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-14 bg-gray-900 origin-bottom animate-spin-fast z-10"></div>

    <div v-for="n in 12" :key="n" :style="{ transform: `rotate(${n * 30}deg)` }" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-500" style="top: -60px;"></div>
    </div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black z-40"></div>
  </div>

</template>

<script lang="ts" setup>
  const pomodoroStore = usePomodoroStore()
  const el = ref<HTMLElement | null>(null)


  useHead({
    bodyAttrs: {
      class: 'bg-gradient-to-t from-gray-800/20'
    }
  })

  onMounted(() => {
    pomodoroStore.setTimerElement(el.value)
  })
</script>

<style></style>
