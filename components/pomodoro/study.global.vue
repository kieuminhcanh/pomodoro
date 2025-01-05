<template>
  <div class="relative w-64 h-64 rounded-full bg-white border-4 border-gray-300">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-bottom bg-red-500 z-30"
      :style="{ transform: `rotate(${secondsDegrees}deg)`, width: '1px', height: '45%' }"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-bottom bg-gray-700 z-20"
      :style="{ transform: `rotate(${minutesDegrees}deg)`, width: '2px', height: '40%' }"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-bottom bg-gray-900 z-10"
      :style="{ transform: `rotate(${hoursDegrees}deg)`, width: '3px', height: '30%' }"
    ></div>

    <div
      v-for="n in 12"
      :key="n"
      :style="{ transform: `rotate(${n * 30}deg)` }"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-500" style="top: -60px"></div>
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black z-40"></div>
  </div>
</template>

<script lang="ts" setup>
  const pomodoroStore = usePomodoroStore()
  const el = ref<HTMLElement | null>(null)


  useHead({
    bodyAttrs: {
      class: 'bg-gradient-to-t from-gray-800/20'
    }
  })

  import { onMounted, onUnmounted, ref } from 'vue'

const secondsDegrees = ref(0);
const minutesDegrees = ref(0);
const hoursDegrees = ref(0);

let interval: NodeJS.Timeout;

const setDate = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  secondsDegrees.value = ((seconds / 60) * 360) + 90; // +90 để kim bắt đầu từ vị trí 12h
  minutesDegrees.value = ((minutes / 60) * 360) + ((seconds/60)*6) + 90; // +6 độ cho mỗi giây
  hoursDegrees.value = ((hours / 12) * 360) + ((minutes/60)*30) + 90; // +30 độ cho mỗi phút
};

onMounted(() => {
  setDate();
  interval = setInterval(setDate, 1000); // Cập nhật mỗi giây
});

onUnmounted(() => {
  clearInterval(interval); // Dừng interval khi component bị unmount
});


  onMounted(() => {
    pomodoroStore.setTimerElement(el.value)
  })
</script>

<style></style>
