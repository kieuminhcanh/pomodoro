<template>
  <div class="flex flex-col items-center justify-center h-screen gap-5 overflow-hidden">
    <!-- Toolbar -->
    <div class="flex gap-5">
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.run" min="50" max="200" />
        Run
      </div>
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.showHour" min="50" max="200" />
        Hour
      </div>
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.showMinute" min="50" max="200" />
        Minute
      </div>
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.showSecond" min="50" max="200" />
        Second
      </div>
      <div class="flex gap-2">
        {{ now.toLocaleTimeString() }}
      </div>
    </div>
    <!-- Clock -->
    <div class="relative rounded-full bg-white border-4 border-gray-300 m-12" :class="{ running: state.run }"
      :style="{ width: `${diameter}px`, height: `${diameter}px` }">
      <!-- Hour hand -->
      <div
        class="absolute mx-auto left-0 right-0 h-full z-10 inline-flex flex-col items-center justify-center drop-shadow-md animate-spin-hour"
        v-if="state.showHour">
        <div class="w-3 h-1/4 bg-blue-700 rounded-t-full">
          <div class="mx-auto w-2.5 h-1/4 bg-blue-700 -mt-7 rounded-t-md"></div>
        </div>
        <div class="w-4 h-4 rounded-full border-4 border-blue-700 outline outline-4 outline-blue-700"></div>
        <div class="w-3 h-1/4 bg-transparent"></div>
      </div>
      <!-- Minute hand -->
      <div
        class="absolute mx-auto left-0 right-0 h-full z-20 inline-flex flex-col items-center justify-center drop-shadow-md animate-spin-minute"
        v-if="state.showMinute">
        <div class="w-2 h-1/3 bg-blue-500 rounded-t-full">
          <div class="w-1.5 h-1/2 mx-auto -mt-16 bg-blue-500 rounded-t-md"></div>
        </div>
        <div class="w-3 h-3 rounded-full border-4 border-blue-500 outline outline-4 outline-blue-500"></div>
        <div class="w-2 h-1/3 bg-transparent"></div>
      </div>
      <!-- Second hand -->
      <div
        class="absolute mx-auto left-0 right-0 h-full z-30 inline-flex flex-col items-center justify-center animate-spin-second"
        v-if="state.showSecond">
        <div class="w-0.5 h-1/2 bg-red-500" style="  box-shadow: 1px 1px;"></div>
        <div class="w-4 h-4 rounded-full bg-red-500"></div>
        <div class="w-0.5 h-1/2">
          <div class="w-0.5 h-1/4 bg-red-500"></div>
        </div>
      </div>

      <!-- Minute divisions -->
      <div v-for="minute in 60" :key="minute"
        class="absolute mx-auto left-0 right-0 w-1 h-full origin-center flex flex-col items-center gap-3 "
        :class="`rotate-${minute}`">
        <div class="bg-gray-500" :class="minute % 5 === 0 ? 'w-1 h-10' : 'w-1/2 h-5'"></div>
        <div v-if="minute % 5 === 0" class="w-10 text-center text-gray-500 font-semibold text-3xl"
          :class="`rotate-${60 - minute}`">{{ minute / 5 }}</div>
        <div v-if="minute % 5 === 0" class="absolute -top-14 text-center text-gray-600 font-thin text-3xl"
          :class="`rotate-${60 - minute}`">{{ minute }}</div>
      </div>
      <!-- Test divisions-->
      <div v-for="minute in 12" :key="minute" v-if="state.test"
        class="absolute mx-auto left-0 right-0 w-1 h-full origin-center flex flex-col items-center gap-3 bg-green-100  bg-opacity-50"
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

  const radius = 250
  const diameter = radius * 2
  const state = reactive({
    run: true,
    test: false,
    showHour: true,
    showMinute: true,
    showSecond: true,
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
    .animate-spin-second, .animate-spin-minute, .animate-spin-hour {
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
