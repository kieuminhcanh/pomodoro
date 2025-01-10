<template>
  <!-- Toolbar -->
  <div class="fixed top-5 left-1/2 -translate-x-1/2 flex items-center gap-10 select-none z-10">
    <div class="flex gap-2">
      <UButton
        :icon="isActive ? 'i-material-symbols-light:check-box' : 'i-material-symbols-light:check-box-outline-blank'"
        @click="isActive ? pause() : resume()" variant="outline">Run</UButton>
        <UButton
        :icon="state.test ? 'i-material-symbols-light:check-box' : 'i-material-symbols-light:check-box-outline-blank'"
        @click="state.test = !state.test" variant="outline">Test</UButton>
    </div>
    <div class="flex gap-2">
      <UCheckbox v-model="state.dark" label="Dark" />
    </div>
    <div class="flex items-center gap-2">
      <UButtonGroup>
        <UButton @click="updateClock('hour', -1)">-</UButton>
        <UButton
          :icon="state.showHour ? 'i-material-symbols-light:check-box' : 'i-material-symbols-light:check-box-outline-blank'"
          @click="state.showHour = !state.showHour" variant="outline">Hour</UButton>
        <UButton @click="updateClock('hour', 1)">+</UButton>
      </UButtonGroup>
    </div>
    <div class="flex items-center gap-2">
      <UButtonGroup>
        <UButton @click="updateClock('minute', -1)">-</UButton>
        <UButton
          :icon="state.showMinute ? 'i-material-symbols-light:check-box' : 'i-material-symbols-light:check-box-outline-blank'"
          @click="state.showMinute = !state.showMinute" variant="outline">Minute</UButton>
        <UButton @click="updateClock('minute', 1)">+</UButton>
      </UButtonGroup>
    </div>
    <div class="flex  items-center gap-2">
      <UButtonGroup>
        <UButton @click="updateClock('second', -1)">-</UButton>
        <UButton
          :icon="state.showSecond ? 'i-material-symbols-light:check-box' : 'i-material-symbols-light:check-box-outline-blank'"
          @click="state.showSecond = !state.showSecond" variant="outline">Second</UButton>
        <UButton @click="updateClock('second', 1)">+</UButton>
        <UButton @click="pause(); now= now.set('second', 0)">10</UButton>
        <UButton @click="pause(); now= now.set('second', 60)">70</UButton>
      </UButtonGroup>
    </div>
   
    <div class="flex gap-2 text-gray-500">
      {{ now.format('HH:mm:ss') }}
    </div>
  </div>
  <div class="flex items-center justify-center h-screen gap-5 overflow-auto" :class="{ 'bg-white': !state.dark }">
    <!-- Clock -->
    <div class="clock" :class="{ running: isActive }" :style="{ width: `${diameter}px`, height: `${diameter}px` }">
      <!-- Minute divisions -->
      <div v-for="minute in 60" :key="minute" class="clock-divisions" :class="`rotate-${minute}`">
        <div class="w-1/2 bg-gray-500" :class="minute % 5 === 0 ? 'h-14' : 'h-5'"></div>
        <div v-if="minute % 5 === 0" class="w-10 text-center text-gray-500 font-semibold text-5xl"
          :class="`rotate-${60 - minute}`">{{ minute / 5 }}</div>
        <div v-if="minute % 5 === 0" class="absolute -top-14 text-center text-gray-700 font-thin text-4xl"
          :class="`rotate-${60 - minute}`">{{ minute }}</div>
      </div>
      <!-- Hour hand -->
      <ClockHour :clock="now" class="clock-hands" v-if="state.showHour" />
      <!-- Minute hand -->
      <ClockMinute :clock="now" class="clock-hands" v-if="state.showMinute" />
      <!-- Second hand -->
      <ClockSecond class="clock-hands" :clock="now" :isActive="isActive"   v-if="state.showSecond" />
      <!-- Test divisions-->
      <div v-for="minute in 12" :key="minute" v-if="state.test" class="clock-divisions bg-green-100 bg-opacity-5 z-auto"
        :class="`rotate-${minute * 5}`">
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import type { ManipulateType } from 'dayjs'

  definePageMeta({
    layout: 'blank'
  })

  export interface Clock {
    hours: number
    minutes: number
    seconds: number
  }

  export type ClockUnit = keyof Clock

  const radius = 450
  const diameter = radius * 2
  const state = reactive({
    test: false,
    showHour: true,
    showMinute: true,
    showSecond: true,
    dark: true
  })

  const now = ref(useNuxtApp().$dayjs())

  const clock = reactive<Clock>({
    hours: now.value.hour(),
    minutes: now.value.minute(),
    seconds: now.value.second()
  })

  const { pause, resume, isActive } = useIntervalFn(() => {
    now.value = now.value.add(1, 'second')
  }, 1000, {
    immediate: true
  })

  function updateClock(unit: ManipulateType = 'second', increment = 1) {    
    now.value = now.value.add(increment, unit)
    clock.hours = now.value.hour()
    clock.minutes = now.value.minute()
    clock.seconds = now.value.second()        
  }

</script>

<style lang="scss">
  .clock {
    @apply relative rounded-full m-12 bg-opacity-5;
    background: radial-gradient(circle, #4aff211f 0%, #00000000 30%);

    &-hands {
      @apply absolute mx-auto left-0 right-0 h-full inline-flex flex-col items-center justify-center drop-shadow-lg;
    }

    &-divisions {
      @apply absolute mx-auto left-0 right-0 w-1 h-full origin-center flex flex-col items-center gap-3 drop-shadow-lg;
    }
  }

  .running {

    .animate-spin-second,
    .animate-spin-minute,
    .animate-spin-hour {
      animation-play-state: running;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(calc(var(--rotation-start, 0deg)));
    }

    to {
      transform: rotate(calc(var(--rotation-start, 0deg) + 360deg));
    }
  }
</style>
