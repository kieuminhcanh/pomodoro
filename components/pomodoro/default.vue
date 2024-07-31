<template>
  <div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
    <div class="grid-cols-1">
      <div class="flex text-[700px]"
        :class=" { 'h-screen w-screen items-center justify-center pomodoro-timer': pomodoroStore.fullscreen?.isFullscreen } "
        ref="el" @click="pomodoroStore.fullscreen.toggle()">
        <div class="minutes">{{ pomodoroStore.minutes }}</div>
        <div>:</div>
        <div class="seconds">{{ pomodoroStore.seconds }}</div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 w-screen flex justify-center items-center py-8">
      <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
        <UButton v-if=" pomodoroStore.isReset " @click="pomodoroStore.setTimer()" class="w-24 h-24 flex justify-center"
          color="white" :ui=" { rounded: 'rounded-full' } ">
          <UIcon name=" i-heroicons-arrow-path" class="w-12 h-12" />
        </UButton>
        <UButton v-else @click=" !pomodoroStore.isActive ? pomodoroStore.start() : pomodoroStore.stop()"
          class="w-24 h-24 flex justify-center transition-colors duration-300 ease-in-out"
          :ui=" { rounded: 'rounded-full' } " :color=" !pomodoroStore.isActive ? 'primary' : 'red' ">
          <UIcon
            :name=" !pomodoroStore.isActive ? 'i-heroicons-play-solid' : !pomodoroStore.isReset ? 'i-heroicons-stop-solid' : 'i-heroicons-arrow-path' "
            class="w-12 h-12 transition duration-300 ease-in-out" :class=" { 'rotate-90': pomodoroStore.isActive } " />
        </UButton>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const pomodoroStore = usePomodoroStore()
  const el = ref<HTMLElement | null>( null )

  useHead( {
    bodyAttrs: {
      class: 'bg-gradient-to-t from-transparent from-20% via-gray-500/70 to-transparent to-80% '
    }
  } )
  

  onMounted( () => {
    pomodoroStore.setTimerElement( el.value )
  } )
</script>

<style></style>
