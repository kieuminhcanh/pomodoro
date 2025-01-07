<template>
  <div class="flex h-4/6 flex-col justify-center items-center relative">
    <div class="absolute top-7 w-4 h-2/5 hand-shadow"></div>
    <div class="w-4 h-full hand">
      <div class="absolute top-7 left-1/2 -translate-x-1/2 w-2 h-2/5 rounded-full brightness-200"
        :style="{ backgroundColor: color }"></div>
    </div>
    <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 outline outline-4 outline-blue-400 rounded-full"></div>
  </div>
</template>

<script lang="ts" setup>
  const { color, bgColor } = defineProps({
    color: {
      type: String,
      default: '#4bff21'
    },
    bgColor: {
      type: String,
      default: '#334155'
    }
  })
</script>

<style lang="scss" scoped>
  .hand {
    position: relative;
    clip-path: polygon(45% 0, 55% 0, 100% 3%, 100% 50%, 0 50%, 0 3%);
    background-color: v-bind('bgColor');
  }

  .hand-shadow {
    --hand-color: v-bind('color');
    box-shadow: 0 0 80px 0px var(--hand-color);
  }
</style>
