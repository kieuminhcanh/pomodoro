<template>
  <div class="fixed md:left-16 bottom-16 w-screen md:w-auto">
    <div class="flex flex-row items-center justify-center">
      <div class="flex flex-col">
        <div class="flex flex-row">
          <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
            <UButton v-if="pomodoroStore.isReset" @click="pomodoroStore.setTimer()" icon=" i-heroicons-arrow-path" aria-label="Reset"
              class=" justify-center" color="white" :ui="{ rounded: 'rounded-full' }">

            </UButton>
            <UButton v-else @click=" !pomodoroStore.isActive ? pomodoroStore.start() : pomodoroStore.stop()" aria-label="Control timer"
              class="transition-colors duration-300 ease-in-out" size="lg"
              :icon="!pomodoroStore.isActive ? 'i-heroicons-play-solid' : !pomodoroStore.isReset ? 'i-heroicons-stop-solid' : 'i-heroicons-arrow-path'"
              variant="solid" :ui="{ rounded: 'rounded-full' }" color="white">
            </UButton>
          </Transition>
        </div>
      </div>
      <div class="flex flex-col ">
        <div class="flex text-5xl px-10" @click="pomodoroStore.fullscreen.toggle()">
          <div class="minutes">{{ pomodoroStore.minutes }}</div>
          <div>:</div>
          <div class="seconds">{{ pomodoroStore.seconds }}</div>
        </div>
        <UProgress :value="pomodoroStore.progress" size="xs" />
        <div class="flex justify-center h-12">
          <h3 class="capitalize">{{ pomodoroStore.title }}</h3>
        </div>
      </div>

    </div>

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

  onMounted(() => {
    pomodoroStore.setTimerElement(el.value)
  })
</script>

<style></style>
