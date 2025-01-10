<template>
  <div :style="{
    transition: 'linear 1s',
    transform: `rotate(${(hours + (count * 24)) * 30 + (minutes * 0.5)}deg)`,
  }">
    <div class="flex h-4/6 flex-col justify-center items-center relative">
      <div class="absolute top-7 w-4 h-2/5 hand-shadow"></div>
      <div class="hand" :style="{
        boxShadow: `inset ${hours < 6 ? '5px' : '-5px'} 0px 3px 1px #777777`,
        transition: `box-shadow 1s ease-in-out`
      }">
        <div class="light" :style="{ backgroundColor: color }"></div>
      </div>

      <div class="hand-arbor"></div>      
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs'

  const { color, bgColor, clock } = defineProps({
    color: {
      type: String,
      default: '#4bff21'
    },
    bgColor: {
      type: String,
      default: '#334155'
    },
    clock: {
      type: Object as PropType<Dayjs>,
      required: true
    }
  })

  const count = ref(0)
  const seconds = computed(() => clock.second())
  const minutes = computed(() => clock.minute())
  const hours = computed(() => clock.hour())

  watch(hours, (value, old) => {
    if (value === 0 && old === 23) {
      count.value++
    } if (value === 23 && old === 0) {
      count.value--      
    }
  })


</script>

<style lang="scss" scoped>
  .hand {
    @apply w-4 h-full;
    position: relative;
    clip-path: polygon(45% 0, 55% 0, 100% 3%, 100% 50%, 0 50%, 0 3%);
    background-color: v-bind('bgColor');
  }

  .light {
    @apply absolute top-7 left-1/2 -translate-x-1/2 w-2 h-2/5 rounded-full brightness-200;
    box-shadow: 0px 0px 3px 2px #000000
  }

  .hand-shadow {
    --hand-color: v-bind('color');
    box-shadow: 0 0 80px 0px var(--hand-color);
  }

  .hand-arbor {
    @apply absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full;
    background-color: v-bind('bgColor');
  }

</style>
