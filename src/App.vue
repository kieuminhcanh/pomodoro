<template>
  <VApp>
    <VNavigationDrawer v-model="drawer" location="right" temporary width="500">
      <VToolbar color="transparent">
        <!-- <VToolbarTitle>Ken</VToolbarTitle> -->
        <VSpacer></VSpacer>
        <VBtn icon @click="drawer = !drawer">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VToolbar>

      <VCard>
        <VCardTitle class="text-h4 mb-5">Pomodoro</VCardTitle>
        <VCardText>
          <VSheet class="text-center mb-10">
            <v-btn-toggle variant="outlined" mandatory v-model="settings.type"
              @update:modelValue="$event => onChange($event)" :disabled="isActive">
              <v-btn value="popular">Popular</v-btn>
              <v-btn value="medium">Medium</v-btn>
              <v-btn value="extended">Extended</v-btn>
              <v-btn value="custom">Custom</v-btn>
            </v-btn-toggle>
          </VSheet>
          <v-slider v-model.number="settings.pomodoro" :step="1" :max="100" :min="1" thumb-label="always"
            :disabled="isActive" @update:modelValue="onChangeSlider">
            <template v-slot:prepend>
              <VSheet width="100">Timer</VSheet>
            </template>
          </v-slider>

          <v-slider v-model.number="settings.break" :step="1" :max="100" :min="1" thumb-label="always"
            :disabled="isActive" @update:modelValue="onChangeSlider">
            <template v-slot:thumb-label="{ modelValue }">
              {{ modelValue }}
            </template>
            <template v-slot:prepend>
              <VSheet width="100">Break</VSheet>
            </template>
          </v-slider>
          <v-slider v-model.number="settings.longBreak" :step="1" :max="100" :min="1" thumb-label="always"
            :disabled="isActive" @update:modelValue="onChangeSlider">
            <template v-slot:thumb-label="{ modelValue }">
              {{ modelValue }}
            </template>
            <template v-slot:prepend>
              <VSheet width="100">Long Break</VSheet>
            </template>
          </v-slider>
        </VCardText>
        <VCardTitle class="text-h4 my-5">Sounds</VCardTitle>
        <VCardText>

          <VRow align="center">
            <VCol cols="auto">
              <VSheet width="100" class="text-body-1">End timer</VSheet>
            </VCol>
            <VCol><v-btn-toggle mandatory v-model:modelValue="settings.soundTimer" variant="outlined">
                <v-btn width="100" value="timer-1">Sound 1</v-btn>
                <v-btn width="100" value="timer-2">Sound 2</v-btn>
                <VBtn width="100" value="mute" icon="mdi-volume-off"></VBtn>
              </v-btn-toggle>
            </VCol>
            <VCol cols="auto">
              <VSheet width="100" class="text-body-1">End Break</VSheet>
            </VCol>
            <VCol><v-btn-toggle mandatory v-model:modelValue="settings.soundBreak" variant="outlined">
                <v-btn width="100" value="break-1">Sound 1</v-btn>
                <v-btn width="100" value="break-2">Sound 2</v-btn>
                <VBtn width="100" value="mute" icon="mdi-volume-off"></VBtn>
              </v-btn-toggle>
            </VCol>


          </VRow>
        </VCardText>
        <VCardTitle class="text-h4 my-5">Background</VCardTitle>

        <VCardText>
          <VSheet class="text-center mb-10">
            <v-btn-toggle mandatory variant="outlined" v-model="settings.backgroundType">
              <v-btn value="video">Video</v-btn>
              <v-btn value="image">Image</v-btn>
              <v-btn value="color">Color</v-btn>
            </v-btn-toggle>
          </VSheet>
          <v-color-picker width="100%" v-model="settings.backgroundColor" mode="hex" :modes="['hex']" showSwatches
            v-if="settings.backgroundType === 'color'">
          </v-color-picker>
        </VCardText>


        <VCardTitle class="text-h4 my-5">Auto</VCardTitle>
        <VListItem title="Auto fullscreen when start">
          <template v-slot:append>
            <VSwitch v-model="settings.autoFullscreen" hideDetails></VSwitch>
          </template>
        </VListItem>
        <VListItem title="Auto start breaks">
          <template v-slot:append>
            <VSwitch v-model="settings.autobreaks" hideDetails></VSwitch>
          </template>
        </VListItem>
        <VListItem title="Auto start next cycle">
          <template v-slot:append>
            <VSwitch v-model="settings.autoNextCycle" hideDetails></VSwitch>
          </template>
        </VListItem>
        <VCardTitle class="text-h4 my-5">Notifications</VCardTitle>
        <VListItem title="Notify on completion">

          <template v-slot:append>
            <VSwitch v-model="settings.notifications" @update:modelValue="$event => onChangeNotifications($event)"
              hideDetails></VSwitch>
          </template>
        </VListItem>
      </VCard>
    </VNavigationDrawer>
    <VMain>
      <VVideoBackground :backgroundType="settings.backgroundType" :videoSrc="video.videoSrc"
        :backgroundSrc="video.backgroundSrc" :backgroundColor="settings.backgroundColor" />
      <VCard class="h-screen">
        <VToolbar color="transparent">
          <VToolbarTitle>Ken</VToolbarTitle>
          <VSpacer></VSpacer>
          <VBtn icon @click="toggleFullscreen">
            <VIcon>mdi-fullscreen</VIcon>
          </VBtn>
          <VBtn icon @click="drawer = !drawer">
            <VIcon>mdi-menu</VIcon>
          </VBtn>
        </VToolbar>
        <VSheet color="transparent" :height="height - 64" class="d-flex flex-column justfy-space-between">
          <VCol class="d-flex justify-center flex-wrap">
            <template v-if="smAndUp">
              <VBtn size="x-large" minWidth="200" rounded="pill" variant="tonal">
                {{ cycles.pomodoro }} pomodoros
              </VBtn>
              <VBtn size="x-large" minWidth="200" rounded="pill" variant="tonal" class="mx-2">{{ cycles.break }}
                breaks
              </VBtn>
            </template>
            <template v-else>
              <VBtn size="x-large" variant="tonal" icon="mdi-timer"></VBtn>
              <VBtn size="x-large" variant="tonal" icon="mdi-bell-sleep" class="mx-2"></VBtn>
            </template>
          </VCol>
          <VCol class="d-flex align-center justify-center clock" ref="el">
            <VScaleTransition leaveAbsolute>
              <VCard v-if="!isFullscreen" @click="toggleFullscreen" width="100%">
                <VRow class="flex-nowrap" noGutters :style="fontSize">
                  <VCol class="text-end">{{ min }}</VCol>
                  <VCol cols="auto">:</VCol>
                  <VCol>{{ sec }}</VCol>
                </VRow>
              </VCard>
              <VCard v-else @click="toggleFullscreen" width="100%">
                <VRow class="flex-nowrap" noGutters style="font-size: 30vw;z-index: 10;"
                  :class="{ break: session === 'break' }">
                  <VCol class="text-end">{{ min }}</VCol>
                  <VCol cols="auto">:</VCol>
                  <VCol>{{ sec }}</VCol>
                </VRow>
              </VCard>
            </VScaleTransition>
          </VCol>
          <VCol class="d-flex align-end justify-center ">
            <VSheet v-if="mdAndUp">
              <VBtn variant="tonal" rounded="pill" size="80" icon="mdi-music" class="mr-2"></VBtn>
              <VFadeTransition leaveAbsolute>
                <VBtn variant="tonal" rounded="pill" size="100" v-if="!isActive" @click="start">Start</VBtn>
                <VBtn variant="tonal" color="error" rounded="pill" size="100" v-else @click="stop">Stop</VBtn>
              </VFadeTransition>
              <VBtn variant="tonal" rounded="pill" size="80" icon="mdi-format-list-checks" class="ml-2"></VBtn>
            </VSheet>
            <VToolbar color="transparent" elevation="6" rounded="pill" v-else>
              <VSpacer />
              <VBtn stacked prependIcon="mdi-music" class="mr-2"></VBtn>
              <VFadeTransition leaveAbsolute>
                <VBtn stacked v-if="!isActive" @click="startPomodoro" color="primary">Start</VBtn>
                <VBtn stacked color="error" v-else @click="endPomodoro">Stop</VBtn>
              </VFadeTransition>
              <VBtn stacked prependIcon="mdi-format-list-checks" class="ml-2"></VBtn>
              <VSpacer />
            </VToolbar>
          </VCol>
        </VSheet>
      </VCard>

    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useSound } from '@vueuse/sound'
import { useFullscreen, useIntervalFn, useWebNotification, useStorage } from "@vueuse/core"
import { useDisplay } from "vuetify"
import { onMounted } from "vue"
// @ts-ignore
import VVideoBackground from './components/VVideoBackground.vue'

useTitle('Pomodoro Timer')
const el = ref<HTMLElement | null>(null)

const { isFullscreen, toggle } = useFullscreen(el)

const { height, mdAndUp, smAndUp } = useDisplay()

declare interface Setting {
  type: 'popular' | 'medium' | 'extended' | 'custom'
  backgroundType: 'video' | 'image' | 'color'
  pomodoro: number
  break: number
  longBreak: number
  autoNextCycle: boolean
  autobreaks: boolean
  notifications: boolean
  autoFullscreen: boolean
  soundTimer: 'timer-1' | 'timer-2' | 'mute'
  soundBreak: 'break-1' | 'break-2' | 'mute'
  backgroundColor: string
  [key: string]: any
}

const video = {
  videoSrc: '/video/1.mp4',
  backgroundSrc: '/images/1.jpg',
}

const settings = useStorage<Setting>('settings', {
  type: 'custom',
  backgroundType: 'video',
  backgroundColor: 'red',
  pomodoro: 5,
  break: 3,
  longBreak: 10,
  autoNextCycle: true,
  autobreaks: true,
  notifications: false,
  soundTimer: 'timer-1',
  soundBreak: 'break-1',
  autoFullscreen: true,
}, localStorage, {
  mergeDefaults: true
})

// @ts-ignore
const test = (value: any) => {
  console.log(value)
}

const cycles = ref({
  pomodoro: 0,
  break: 0,
  longBreak: 0,
})




const sounds = useSound('/sounds/sounds.mp3', {
  sprite: {
    'timer-1': [0, 1000],
    'timer-2': [1001, 1000],
    'break-1': [2001, 2000],
    'break-2': [4001, 1000],
  }
})
const onChangeSlider = () => {
  settings.value.type = 'custom'
}

const session = ref<'' | 'pomodoro' | 'break'>('')

import { useTitle } from '@vueuse/core'


const countdown = ref(0)


const minute = ref(import.meta.env.DEV ? 1 : 60)

const drawer = ref(false)
const { pause, resume, isActive } = useIntervalFn(
  () => {
    if (countdown.value === 0) {
      switch (session.value) {
        case 'pomodoro':
          endPomodoro()
          break
        case 'break':
          endBreak()
          break
      }
      return
    }
    if (countdown.value < 4 && session.value === 'pomodoro') {
      // @ts-ignore
      sounds.play({ id: settings.value.soundTimer, })
      resume()
    }

    countdown.value--
  },
  1000,
  {
    immediate: false,
  }
)



const min = computed(() =>
  Math.floor(countdown.value / 60)
    .toString()
    .padStart(2, "0")
)
const sec = computed(() => (countdown.value % 60).toString().padStart(2, "0"))
const time = computed(() => `${min.value}:${sec.value}`)

const fontSize = computed(() => ({
  fontSize: smAndUp.value ? "15vw" : "30vw",
}))

const startPomodoro = () => {
  if (countdown.value === 0) {
    countdown.value = settings.value.pomodoro * minute.value
  }
  session.value = 'pomodoro'
  resume()
}




const endPomodoro = () => {
  cycles.value.pomodoro++
  pause()
  if (settings.value.autobreaks)
    startBreak()
}

const startBreak = () => {
  session.value = 'break'
  countdown.value = settings.value.break * minute.value
  resume()
}

const endBreak = () => {
  // timeout.play()
  // @ts-ignore
  sounds.play({ id: settings.value.soundBreak })
  cycles.value.break++
  session.value = ''
  pause()
  if (settings.value.autoNextCycle) {
    startPomodoro()
  }
}

const start = () => {
  if (settings.value.autoFullscreen) {
    toggle()
  }

  countdown.value = settings.value.pomodoro * minute.value
  startPomodoro()
}

const stop = () => {
  countdown.value = settings.value.pomodoro * minute.value
  pause()
}

const toggleFullscreen = () => {
  toggle()
}

const title = computed(() => {
  switch (session.value) {
    case 'pomodoro':
      return `Pomodoro ${cycles.value.pomodoro + 1} timer: ${time.value}`
    case 'break':
      return `Break ${cycles.value.break + 1} timer: ${time.value}`
    default:
      return 'Pomodoro timer'
  }
})

useTitle(title)

const onChange = (focusType: string) => {

  switch (focusType) {
    case 'popular':
      settings.value.pomodoro = 25
      settings.value.break = 5
      settings.value.longBreak = 15
      break
    case 'medium':
      settings.value.pomodoro = 40
      settings.value.break = 8
      settings.value.longBreak = 20
      break
    case 'extended':
      settings.value.pomodoro = 60
      settings.value.break = 10
      settings.value.longBreak = 30
      break
  }
}

const { show } = useWebNotification({ title: 'Pomodoro Timer', body: 'A Time Management Life Hack' })

const onChangeNotifications = (value: any) => {
  if (value) {
    show()
  }
}

onMounted(() => {
  countdown.value = settings.value.pomodoro
})
</script>

<style lang="scss">
@use './styles/settings.scss' as settings;

.clock {
  font-family: settings.$heading-font-family;
  user-select: none;

  .break {
    animation: animate 2.0s linear infinite;
  }
}

@keyframes animate {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>
