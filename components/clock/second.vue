<template>
  <div :style="{
    transition: 'linear 1s',
    transform: `rotate(${(seconds + count * 60) * 6}deg)`,
  }">

    <div class="h-full flex flex-col items-center justify-center relative">
      <div class="w-2 h-full hand rounded-full" :style="{
        boxShadow: `inset ${seconds < 30 ? '2px' : '-2px'} 0px 3px 1px #777777`,
        transition: `box-shadow 1s ease-in-out`
      }"></div>
      <div class="hand-arbor" @click="seconds++"></div>      
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs'

  const { bgColor, clock } = defineProps({
    bgColor: {
      type: String,
      default: '#334155'
    },
    clock: {
      type: Object as PropType<Dayjs>,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
  })

  const count = ref(0)
  const seconds = computed(() => clock.second())
  watch(seconds, (value, old) => {
    if (value === 0 && old === 59) {
      count.value++
    } if (value === 59 && old === 0) {
      count.value--      
    }
  })

</script>


<style lang="scss" scoped>
  .hand {
    --hand-color: v-bind('bgColor');
    clip-path: polygon(42% 0%, 58% 0%, 100% 65%, 0% 65%);
    background: v-bind('bgColor');
  }

  .hand-arbor {
    @apply absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full;
    background-color: v-bind('bgColor');
  }

</style>
