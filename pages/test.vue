<template>  
  <div class="flex flex-col items-center justify-center h-screen gap-20">
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
    </div>
    <div class="relative rounded-full bg-white border-4 border-gray-300"
      :style="{ width: `${diameter}px`, height: `${diameter}px` }">
      <!-- Hour hand -->       
      <div class="absolute mx-auto left-0 right-0 h-full z-10 inline-flex flex-col items-center justify-center  drop-shadow-md"
        :class="{ 'animate-spin-hour': state.run }" v-if="state.showHour">
        <div class="w-3 h-1/4 bg-blue-700 rounded-t-full">
          <div class="mx-auto w-2.5 h-1/4 bg-blue-700 -mt-7 rounded-t-md"></div>
        </div>
        <div class="w-4 h-4 rounded-full border-4 border-blue-700 outline outline-4 outline-blue-700"></div>
        <div class="w-3 h-1/4 bg-transparent"></div>
      </div>    
      <!-- Minute hand -->
      <div class="absolute mx-auto left-0 right-0 h-full z-20 inline-flex flex-col items-center justify-center  drop-shadow-md"
        :class="{ 'animate-spin-minute': state.run }" v-if="state.showMinute">
        <div class="w-2 h-1/3 bg-blue-500 rounded-t-full">
          <div class="w-1.5 h-1/2 mx-auto -mt-16 bg-blue-500 rounded-t-md"></div>
        </div>
        <div class="w-3 h-3 rounded-full border-4 border-blue-500 outline outline-4 outline-blue-500"></div>
        <div class="w-2 h-1/3 bg-transparent"></div>
      </div>    
      <!-- Second hand -->
      <div class="absolute mx-auto left-0 right-0 h-full z-30 inline-flex flex-col items-center justify-center"  
        :class="{ 'animate-spin-second': state.run }" v-if="state.showSecond">
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
      <!-- <div v-for="minute in 12" :key="minute"
        class="absolute mx-auto left-0 right-0 w-1 h-full origin-center flex flex-col items-center gap-3 bg-green-100  bg-opacity-50"
        :class="`rotate-${minute * 5}`">                
      </div> -->
    </div>
  </div>

</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'


  definePageMeta({
    layout: 'blank'
  })

  const radius = 250
  const diameter = radius * 2
  const state = reactive({
    run: true,
    showHour: true,
    showMinute: true,
    showSecond: true
  })

  const secondsDegrees = ref(0)
  const minutesDegrees = ref(0)
  const hoursDegrees = ref(0)

  let interval: NodeJS.Timeout

  const setDate = () => {
    const now = new Date()
    const seconds = now.getSeconds()
    const minutes = now.getMinutes()
    const hours = now.getHours()

    secondsDegrees.value = ((seconds / 60) * 360) + 90 // +90 để kim bắt đầu từ vị trí 12h
    minutesDegrees.value = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90 // +6 độ cho mỗi giây
    hoursDegrees.value = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90 // +30 độ cho mỗi phút
  }

  onMounted(() => {
    setDate()
    interval = setInterval(setDate, 1000) // Cập nhật mỗi giây
  })

  onUnmounted(() => {
    clearInterval(interval) // Dừng interval khi component bị unmount
  })
</script>

<style lang="scss">
  .second-hand {
    width: 200px;
    height: 4px;
    /* Chiều cao phần thân */
    background-color: red;
    /* Màu kim giây */
    position: relative;
  }

  .second-hand::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border-top: 6px solid transparent;
    /* Điều chỉnh độ cao của chóp */
    border-bottom: 6px solid transparent;
    /* Điều chỉnh độ cao của chóp */
    border-left: 10px solid red;
    /* Điều chỉnh độ rộng của chóp */
  }

  .animate-spin-second {
    animation: rotate 60s infinite linear;
    transform-origin: center
  }

  .animate-spin-minute {
    animation: rotate 3600s linear infinite;
  }

  .animate-spin-hour {
    animation: rotate 43200s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
