<template>
  <div class="flex h-5/6 flex-col justify-center items-center relative">
    <div class="absolute top-7 w-4 h-2/5 hand-shadow"></div>
    <div class="hand" :style="{
      boxShadow: `inset ${minutes < 30 ? '5px' : '-5px'} 0px 3px 1px #777777`,
      transition: `box-shadow 1s ease-in-out`
    }">
      <div class="light" :style="{ backgroundColor: color }"></div>
    </div>
    <div class="hand-arbor"></div>
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
    },
    minutes: {
      type: Number,
      default: 0
    },
  })
</script>

<style lang="scss" scoped>
  .hand {
    @apply w-4 h-full;
    position: relative;
    clip-path: polygon(45% 0, 55% 0, 100% 3%, 100% 50%, 0 50%, 0 3%);
    background: v-bind('bgColor');

  }

  .hand-shadow {
    --hand-color: v-bind('color');
    box-shadow: 0 0 80px 0px var(--hand-color);
  }

  .light {
    @apply absolute top-10 left-1/2 -translate-x-1/2 w-2 h-2/5 rounded-full brightness-200;
    box-shadow: 0px 0px 3px 2px #000000
  }

  .hand-arbor {
    @apply absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full;
    background-color: v-bind('bgColor');
  }
</style>
