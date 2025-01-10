<template>
  <div :style="animate">
    <div class="h-full flex flex-col items-center justify-center relative">
      <div class="w-3 h-full hand rounded-full" :style="{backgroundColor: bgColor}">
        <div class="w-full h-2/3" :style="{
        boxShadow: `inset ${seconds < 30 ? '4px 0 2px 0' : '-4px 0 2px 0'} #999999`,
        transition: `box-shadow 2s linear`
      }"></div>
      </div>
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
  const angle = computed(() => seconds.value * 6 + count.value * 360)

  const animate = computed(() => ({
    transitionTimingFunction: 'linear',
    transitionDuration: '1s',
    transform: `rotate(${angle.value}deg)`
  }))

  const shadowPosition = computed(() => {
    switch (seconds.value) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return '5px 7px 10px 0px'
      default:
        return '0px 0px 0px 0px'
    }
    // const lightSourceAngle = 300 // Góc của nguồn sáng (10 giờ)
    // let shadowAngle = lightSourceAngle - angle.value
    // shadowAngle = (shadowAngle % 360 + 360) % 360 // Chuẩn hóa góc về 0-360
    // const shadowAngleRad = shadowAngle * Math.PI / 180
    // let offsetX = Math.cos(shadowAngleRad) * 2 // Điều chỉnh giá trị 3 để thay đổi độ dài bóng đổ
    // let offsetY = Math.sin(shadowAngleRad) * 2
    // return `${offsetX}px ${offsetY}px`
  })

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
