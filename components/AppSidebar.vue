<script setup lang="ts">

const settingsStore = useSettingsStore()
const pomodoroStore = usePomodoroStore()
const { drawer } = storeToRefs(settingsStore)
const { pomodoro } = storeToRefs(pomodoroStore)
const isDev = import.meta.env.DEV

const config = useRuntimeConfig()
const baseURL = config.app.baseURL.slice(0, -1) // Nuxt 3 sẽ tự động đưa app.baseURL vào runtimeConfig

const stylesImport = import.meta.glob('@/components/pomodoro/*.vue')

const pomodoroStyles = Object.entries(stylesImport).map(([key]) => key.split('/')?.pop()?.split('.')?.shift())

const musicImport = import.meta.glob('@/public/music/*.mp3')

const playlist = Object.entries(musicImport).map(([key]) => key.split('public').pop()).map(src => baseURL + src)

const imagesImport = import.meta.glob('@/public/images/*-thumbnail.jpg')

const images = Object.entries(imagesImport).map(([key]) => key.split('public').pop()).map(src => baseURL + src)

const videosImport = import.meta.glob('@/public/videos/*.mp4')

const videos = Object.entries(videosImport).map(([key]) => key.split('public').pop()).map(src => baseURL + src)




function testNotification(value: boolean) {
  console.log(value)

  if (value) {
    useWebNotification().ensurePermissions().then((result) => {
      if (result) {
        useWebNotification({ title: 'Pomodoro Timer', body: 'Work in Sprints, Win the Marathon' })
      } else {
        settingsStore.allowNotification = false
      }
    })
  }
}

const dev = ref({
  timer: 4
})
</script>

<template>
  <USlideover v-model="drawer" :overlay="false"
    class="overflow-y-auto scrollbar scrollbar-thumb-blue-600 scrollbar-thumb-rounded" role="Navigation">
    <UCard>
      <template #header>
        <div class="flex flex-row items-center justify-between">
          <h3>Settings</h3>
          <UButton icon="i-heroicons-x-mark" @click="settingsStore.toggleDrawer()"
            aria-label="Close navigation drawer" />
        </div>
      </template>


      <div class="text-center">
        <UButtonGroup orientation="horizontal" class="justify-center">

          <UButton class="capitalize" v-for="preset in ['popular', 'medium', 'extended', 'Custom']" :key="preset"
            :label="preset" @click="pomodoroStore.setPomodoro(preset)"
            :variant="pomodoro.preset === preset ? 'solid' : 'outline'" :disabled="pomodoroStore.isActive"
            :aria-label="`Pomodoro preset ${preset}`" />
        </UButtonGroup>
      </div>

      <div class="grid grid-flow-row gap-4 my-6">
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Timer
          </div>
          <div class="grow">
            <URange v-model="pomodoro.timer" :max="100" @change="pomodoro.preset = 'Custom'"
              :disabled="pomodoroStore.isActive"></URange>
          </div>
          <div class="flex-none w-16 text-right">
            {{ pomodoro.timer }} mins
          </div>
        </div>

        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Break
          </div>
          <div class="grow">
            <URange v-model="pomodoro.break" :max="60" @change="pomodoro.preset = 'Custom'"
              :disabled="pomodoroStore.isActive"></URange>
          </div>
          <div class="flex-none w-16 text-right">
            {{ pomodoro.break }} mins
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Cycles
          </div>
          <div class="grow">
            <URange v-model="pomodoro.cycles" :max="10" @change="pomodoro.preset = 'Custom'"
              :disabled="pomodoroStore.isActive"></URange>
          </div>
          <div class="flex-none w-16 text-right">
            {{ pomodoro.cycles }} mins
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Long break
          </div>
          <div class="grow">
            <URange v-model="pomodoro.longBreak" :max="90" @change="pomodoro.preset = 'Custom'"
              :disabled="pomodoroStore.isActive"></URange>
          </div>
          <div class="flex-none w-16 text-right">
            {{ pomodoro.longBreak }} mins
          </div>
        </div>
      </div>

      <UDivider class="my-6" />

      <div class="grid grid-flow-row gap-4">
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Theme</div>
          <div class="grow">
            <ColorPicker :ui="{ strategy: 'fixed' }" />
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Skin</div>
          <div class="grow flex gap-4">
            <div v-for="style in pomodoroStyles" :key="style">
              <UButton class="justify-center capitalize" @click="settingsStore.setPomodoroStyle(style)"
                :aria-label="`Pomodoro style ${style}`" :variant="settingsStore.style === style ? 'solid' : 'outline'">
                {{
                  style }}
              </UButton>
            </div>
          </div>
        </div>

        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Background</div>
          <div class="grow  grid-flow-row gap-4">
            <ColorSelect :colors="['sky', 'cyan', 'violet', 'slate', 'neutral']"
              @update:model-value="$event => settingsStore.setBackground({ type: 'color', value: $event.value })" />
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Image</div>
          <div class="grow">
            <div class="grid grid-cols-3 gap-4">
              <div v-for="image in images" :key="image" class="h-full aspect-square">
                <img class="object-cover h-16 w-full rounded-lg" :src="image" alt="Background image"
                  @click="settingsStore.setBackground({ type: 'image', value: image.replace('-thumbnail', '') })"
                  :class="{ 'ring-2 ring-blue-500': settingsStore.background.value === image.replace('-thumbnail', '') }" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Video</div>
          <div class="grow">
            <div class="grid grid-cols-3 gap-4">
              <div v-for="video in videos" :key="video" class="h-full aspect-square">
                <img class="object-cover h-16 w-full rounded-lg" :src="video.replace('.mp4', '-thumbnail.png')"
                  alt="Background video" @click="settingsStore.setBackground({ type: 'video', value: video })"
                  :class="{ 'ring-2 ring-blue-500': settingsStore.background.value === video }" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex-none w-28">Music</div>
          <div class="grow  grid-flow-row gap-4">
            <div class="grid grid-cols-4 gap-4">
              <UButton class="justify-center" @click="settingsStore.setMusic('')"
                :variant="settingsStore.music === '' ? 'solid' : 'outline'" icon="i-heroicons-speaker-x-mark"
                aria-label="Mute music"></UButton>
              <UButton class="justify-center" v-for="(music, index) in playlist" :key="music" aria-label="Sound"
                @click="settingsStore.setMusic(music)" :variant="settingsStore.music === music ? 'solid' : 'outline'">
                {{
                  index
                  +
                  1 }}
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <UDivider class="my-6" />

      <div class="grid grid-flow-row gap-4">
        <div class="flex flex-row items-center">
          <div class="grow">Fullscreen on Start</div>
          <div class="flex-none grid-flow-row gap-4">
            <UToggle v-model="settingsStore.fullscreen" />
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div class="grow">Notification</div>
          <div class="flex-none grid-flow-row gap-4">
            <UToggle v-model="settingsStore.allowNotification" @change="testNotification" />
          </div>
        </div>
      </div>

      <template v-if="isDev">
        <UDivider class="my-6" />
        <h3 class="text-2xl mb-6">Dev Mode</h3>
        <div class="grid grid-flow-row gap-4">
          <div class="flex flex-row items-center">
            <div class="flex-none w-28">Set timer</div>
            <div class="grow">
              <UButtonGroup class="flex" orientation="horizontal">
                <UInput class="grow" placeholder="Seconds" v-model="dev.timer" />
                <UButton icon="i-heroicons-paper-airplane" aria-label="Set seconds"
                  @click="pomodoroStore.setTimer(dev.timer ? dev.timer / 60 : undefined)" />
              </UButtonGroup>
            </div>
          </div>
        </div>
      </template>
    </UCard>


  </USlideover>
</template>
