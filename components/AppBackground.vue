<template>
  <Transition name="fade">
    <div v-if="settingsStore.background.type === 'color'" class="fixed top-0 right-0 bottom-0 left-0 "
      :class="backgroundColor">
    </div>
    <div v-else-if="settingsStore.background.type === 'image'"
      class="fixed top-0 right-0 bottom-0 left-0 bg-cover bg-no-repeat bg-center" :style="imageStyles"></div>
    <div v-else-if="settingsStore.background.type === 'video'" class="fixed top-0 right-0 bottom-0 left-0">
      <video :src="settingsStore.background.value" autoplay loop muted
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
      </video>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
  const settingsStore = useSettingsStore()

  const imageStyles = computed(() => {
    return {
      backgroundImage: `url(${settingsStore.background.value})`,
      transition: 'background-image 1s ease-in-out'
    }
  })

  const backgroundColor = computed(() => {
    return settingsStore.background.value ? `bg-gradient-to-b from-${settingsStore.background.value}-400 to-${settingsStore.background.value}-600` : 'bg-transparent'
  })

</script>
