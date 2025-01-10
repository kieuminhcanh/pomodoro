<template>
  <div class="animate-spin-second" :class="{'second-animation': isActive}" ref="el">
    <div class="h-full flex flex-col items-center justify-center relative">
      <div class="w-2 h-full hand rounded-full" :style="{
        boxShadow: `inset ${seconds < 30 ? '2px' : '-2px'} 0px 3px 1px #777777`,
        transition: `box-shadow 1s ease-in-out`
      }"></div>
      <div class="hand-arbor" @click="seconds++"></div>
      <div class="absolute top-0">{{ seconds }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Dayjs } from 'dayjs'
import type { Clock } from '~/pages/test.vue'

  const { bgColor, clock,isActive } = defineProps({
    bgColor: {
      type: String,
      default: '#334155'
    },
    clock: {
      type: Object as PropType<Dayjs | Clock>,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
  })

  const count = ref(0)
  // const seconds = ref(clock.second())
  const el = useTemplateRef<HTMLElement>('el')
  const seconds = computed(() => clock.seconds)
  watch(() => isActive, (value) => {    
    if (el.value) {
      el.value.style.setProperty('transform', `rotate(${seconds.value * 6}deg)`)
    }
  })


</script>


<style lang="scss" scoped>
  .animate-spin-second {
    --rotation-start: calc((v-bind('seconds')) * 6deg);       
  }

  .second-animation{
    animation: rotateseconds 60s linear infinite paused;
  }

  @keyframes rotateseconds {
    from {
      transform: rotate(calc(var(--rotation-start, 0deg)));
    }

    to {
      transform: rotate(calc(var(--rotation-start, 0deg) + 360deg));
    }
  }

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
