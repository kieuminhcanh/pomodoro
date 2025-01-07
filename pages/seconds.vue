<template>
  <div class="flex flex-col justify-center items-center h-screen relative">
    <div class="w-2 h-full bg-white hand"></div>    
    <div class="absolute top-1/2 -translate-y-1/2 w-5 h-5 border-2 outline outline-4 bg-red-500 rounded-full"></div>    
  </div>
</template>

<script lang="ts" setup>

  definePageMeta({
    layout: 'blank'
  })

</script>

<style lang="scss">
.hand{
  clip-path: polygon(20% 0%, 80% 0%, 100% 65%, 0% 65%);
}
</style>
