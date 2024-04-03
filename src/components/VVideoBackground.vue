<template>

  <div class="video-background" ref="el">
    <div class="overlay" :style="overlayStyles"></div>
    <video v-if="isVideo" loop muted autoplay :src="props.videoSrc" poster="/images/1.jpg" ref="elVideo">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">

import { watch, ref } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  backgroundType: String,
  videoSrc: String,
  backgroundSrc: String,
  videoOverlay: String,
  backgroundColor: String
})

const el = ref<HTMLElement | null>()
const elVideo = ref<HTMLVideoElement | null>()



const isVideo = computed(() => props.backgroundType === 'video')
// @ts-ignore
const isImage = computed(() => props.backgroundType === 'image')
const isColor = computed(() => props.backgroundType === 'color')

const overlayStyles = computed(() => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: isColor.value ? `radial-gradient(${props.backgroundColor}, #0000004d)`
    : isImage.value ? `linear-gradient(to bottom left, rgba(225, 225, 225, 0), rgba(0,0,0, 0.9)), url(${props.backgroundSrc})`
      : `linear-gradient(to bottom,rgba(225, 225, 225, 0),rgba(0,0,0, 0.9))`,
  // backdropFilter: isVideo.value ? 'blur(1px)' : 'none'

}))

watch(() => props, (value) => {
  console.log(value)

  el.value?.classList.add('fade-transition')
  setTimeout(() => {
    if (isVideo.value) {
      elVideo.value!.play()
    }
    el.value?.classList.remove('fade-transition')
  }, 1500)
}, {
  deep: true
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
    transform: translateX(calc((100% - 100vw) / 2));
    overflow-x: hidden;
    z-index: -1;
  }
}

.fade-transition {
  animation: fadeIn 1.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
