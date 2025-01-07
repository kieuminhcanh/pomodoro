<template>
  <div class="flex flex-col justify-center items-center h-screen relative">
    <div class="w-2 h-full hand rounded-full transition-all duration-1000 from-slate-500 to-transparent"
      :class="seconds < 30 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'"></div>
    <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 outline outline-2 outline-red-400 bg-cyan-300 rounded-full">
    </div>
  </div>  
</template>

<script lang="ts" setup>
  const { bgColor, seconds } = defineProps({
    bgColor: {
      type: String,
      default: '#334155'
    },
    seconds: {
      type: Number,
      default: 0
    },
  })
</script>


<style lang="scss" scoped>
  .hand {
    --hand-color: v-bind('bgColor');    
    clip-path: polygon(20% 0%, 80% 0%, 100% 65%, 0% 65%);
    background-color: v-bind('bgColor');
  }
</style>
