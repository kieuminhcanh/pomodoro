<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-100"
  >
    <component :is=" pomodoroStyle " class="z-10" />
  </transition>
</template>

<script lang="ts" setup>
  const settingsStore = useSettingsStore()
  const pomodoroStyle = computed( () => `pomodoro-${ settingsStore.style }` )
</script>

<style></style>
