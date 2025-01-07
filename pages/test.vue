<template>
  <div class="flex flex-col items-center justify-center h-screen gap-5 overflow-hidden">
    <!-- Toolbar -->
    <div class="flex gap-5">
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.run" />
        Run
      </div>
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.showHour" />
        Hour
      </div>
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.showMinute" />
        Minute
      </div>
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.showSecond" />
        Second
      </div>
      <div class="flex gap-2">
        <input type="checkbox" v-model="state.test" />
        Test
      </div>
      <div class="flex gap-2">
        {{ now.toLocaleTimeString() }}
      </div>
    </div>
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
        <ClockHour/> 
      </div>
      <!-- Minute hand -->
      <div class="hands animate-spin-minute" v-if="state.showMinute">
        <ClockMinute/>
        <!-- <div class="w-2 h-1/3 bg-blue-500 rounded-t-full">
          <div class="w-1.5 h-1/2 mx-auto -mt-16 bg-blue-500 rounded-t-md"></div>
        </div>
        <div class="w-3 h-3 rounded-full border-4 border-blue-500 outline outline-4 outline-blue-500"></div>
        <div class="w-2 h-1/3 bg-transparent"></div> -->
      </div>
      <!-- Second hand -->
      <div class="hands animate-spin-second" v-if="state.showSecond">
        <ClockSecond :seconds="now.getSeconds()"/>
        <!-- <div class="w-0.5 h-1/2 bg-red-500" style="  box-shadow: 1px 1px;"></div>
        <div class="w-4 h-4 rounded-full bg-red-500"></div>
        <div class="w-0.5 h-1/2">
          <div class="w-0.5 h-1/4 bg-red-500"></div>
        </div> -->
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
    background: radial-gradient(circle, #4aff212f 0%, #00000000 50%);

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
