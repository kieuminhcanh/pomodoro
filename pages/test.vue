<template>
  <!-- Toolbar -->
  <div class="fixed top-5 left-1/2 -translate-x-1/2 flex gap-10 select-none z-50">
      <div class="flex gap-2">
        <UCheckbox v-model="state.run" label="Run" />        
      </div>
      <div class="flex gap-2">
        <UCheckbox v-model="state.dark" label="Dark" />        
      </div>
      <div class="flex gap-2">
        <UCheckbox v-model="state.showHour" label="Hour" />        
      </div>
      <div class="flex gap-2">
        <UCheckbox v-model="state.showMinute" label="Minute" />        
      </div>
      <div class="flex gap-2">
        <UCheckbox v-model="state.showSecond" label="Second" />        
      </div>
      <div class="flex gap-2">
        <UCheckbox v-model="state.test" label="Test" />        
      </div>      
      <div class="flex gap-2 text-gray-500">
        {{ now.toLocaleTimeString() }}
      </div>
    </div>
  <div class="flex items-center justify-center h-screen gap-5" :class="{'bg-white': !state.dark}">    
    <!-- Clock -->
    <div class="clock" :class="{ running: state.run }" :style="{ width: `${diameter}px`, height: `${diameter}px` }">
      <!-- Minute divisions -->
      <div v-for="minute in 60" :key="minute" class="divisions" :class="`rotate-${minute}`">
        <div class="w-1/2 bg-gray-500" :class="minute % 5 === 0 ? 'h-14' : 'h-5'"></div>
        <div v-if="minute % 5 === 0" class="w-10 text-center text-gray-500 font-semibold text-5xl"
          :class="`rotate-${60 - minute}`">{{ minute / 5 }}</div>
        <div v-if="minute % 5 === 0" class="absolute -top-14 text-center text-gray-700 font-thin text-4xl"
          :class="`rotate-${60 - minute}`">{{ minute }}</div>
      </div>
      <!-- Hour hand -->
      <div class="hands animate-spin-hour" v-if="state.showHour">
        <ClockHour :hours="now.getHours()"/>
      </div>
      <!-- Minute hand -->
      <div class="hands animate-spin-minute" v-if="state.showMinute">
        <ClockMinute :minutes="now.getMinutes()" />        
      </div>
      <!-- Second hand -->
      <div class="hands animate-spin-second" v-if="state.showSecond">
        <ClockSecond :seconds="now.getSeconds()" />        
      </div>

      <!-- Test divisions-->
      <div v-for="minute in 12" :key="minute" v-if="state.test" class="divisions bg-green-100  bg-opacity-50"
        :class="`rotate-${minute * 5}`">
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import { useNow } from '@vueuse/core'
import { ref } from 'vue'


  definePageMeta({
    layout: 'blank'
  })

  const radius = 450
  const diameter = radius * 2
  const state = reactive({
    run: true,
    test: false,
    showHour: true,
    showMinute: true,
    showSecond: true,
    dark: true
  })


  const now = useNow()
  const clock = ref({
    hours: now.value.getHours(),
    minutes: now.value.getMinutes(),
    seconds: now.value.getSeconds()
  })  
</script>

<style lang="scss" scoped>
  * {
    --seconds: v-bind('clock.seconds');
    --minutes: v-bind('clock.minutes');
    --hours: v-bind('clock.hours');
  }

  .clock {
    @apply relative rounded-full m-12 bg-opacity-5;
    // background: radial-gradient(circle, #4aff210f 0%, #00000000 50%);

    .hands {
      @apply absolute mx-auto left-0 right-0 h-full inline-flex flex-col items-center justify-center drop-shadow-lg;
    }

    .divisions {
      @apply absolute mx-auto left-0 right-0 w-1 h-full origin-center flex flex-col items-center gap-3 drop-shadow-lg;
    }
  }

  .animate-spin-second {
    --rotation-start: calc((var(--seconds) + 0.5) * 6deg);
    animation: rotate 60s infinite linear paused;
  }

  .animate-spin-minute {
    --rotation-start: calc(var(--minutes) * 6deg + var(--seconds) * 0.1deg);
    animation: rotate 3600s infinite linear paused;
  }

  .animate-spin-hour {
    --rotation-start: calc(var(--hours) * 30deg + var(--minutes) * 0.5deg);
    animation: rotate 43200s infinite linear paused;
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
