<template>
  <div class="video-background">
    <div class="overlay" :style="{ background: backgroundColor }"></div>
    <video autoplay muted loop :poster="backgroundSrc" :style="{ background: backgroundColor }" :src="videoSrc" />
  </div>
</template>

<script setup lang="ts">

import { watch } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  backgroundType: String,
  videoSrc: String,
  backgroundSrc: String,
  videoOverlay: String,
  backgroundColor: String
})


const videoSrc = computed(() => props.backgroundType === 'video' ? props.videoSrc : '')
const backgroundSrc = computed(() => props.backgroundType === 'image' ? props.backgroundSrc : '')
const backgroundColor = computed(() => props.backgroundType === 'color'
  ? `linear-gradient(180deg,rgb(255 255 255/0%),rgb(0 0 0/80%)),${props.backgroundColor}`
  : `linear-gradient(to top,rgba(0, 0, 0, 0.8), transparent)`
)

watch(() => props.backgroundType, (value: any) => {
  console.log(value)

})

</script>
<style scoped>
.video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    object-fit: cover;
  }
}
</style>
