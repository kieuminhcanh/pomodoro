<template>
  <VApp>
    <VNavigationDrawer v-model="drawer" location="right" temporary width="500" permanent disableResizeWatcher
      disableRouteWatcher touchless>
      <VToolbar color="transparent">
        <!-- <VToolbarTitle>Ken</VToolbarTitle> -->
        <VSpacer></VSpacer>
        <VBtn icon @click="drawer = !drawer">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VToolbar>

      <VCard class="pb-16 overflow-y-auto" :height="$vuetify.display.height - 64">
        <VCardTitle class="text-h4 mb-5">Pomodoro</VCardTitle>
        <VDivider />
        <VCardText>
          <VSheet class="text-center mb-10">
            <VBtnToggle variant="outlined" mandatory v-model="settings.type" color="primary"
              @update:modelValue="$event => onChange($event)" :disabled="isActive">
              <VBtn value="popular">Popular</VBtn>
              <VBtn value="medium">Medium</VBtn>
              <VBtn value="extended">Extended</VBtn>
              <VBtn value="custom">Custom</VBtn>
            </VBtnToggle>
          </VSheet>
          <VSlider v-model="settings.timer" :step="1" :max="100" :min="1" thumbLabel="always" color="primary"
            :disabled="isActive" @update:modelValue="onChangeSlider('timer')">
            <template v-slot:prepend>
              <VSheet width="100">Timer</VSheet>
            </template>
          </VSlider>

          <VSlider v-model="settings.break" :step="1" :max="100" :min="1" thumbLabel="always" color="primary"
            :disabled="isActive" @update:modelValue="onChangeSlider()">
            <template v-slot:thumb-label="{ modelValue }">
              {{ modelValue }}
            </template>
            <template v-slot:prepend>
              <VSheet width="100">Break</VSheet>
            </template>
          </VSlider>
          <VSlider v-model.number="settings.times" :step="1" :max="5" :min="0" thumbLabel="always" color="primary"
            :disabled="isActive" @update:modelValue="onChangeSlider()">
            <template v-slot:thumb-label="{ modelValue }">
              {{ modelValue }}
            </template>
            <template v-slot:prepend>
              <VSheet width="100">Times</VSheet>
            </template>
          </VSlider>
          <VSlider v-model.number="settings.longBreak" :step="1" :max="100" :min="1" thumbLabel="always" color="primary"
            :disabled="isActive || settings.times === 0" @update:modelValue="onChangeSlider()">
            <template v-slot:thumb-label="{ modelValue }">
              {{ modelValue }}
            </template>
            <template #prepend>
              <VSheet width="100">Long Break</VSheet>
            </template>
            <template #append>
              <VBtn size="small" @click="settings.times = 0" variant="text"
                :icon="settings.times > 0 ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline'"></VBtn>
            </template>
          </VSlider>
        </VCardText>
        <VCardTitle class="text-h4 my-5">Sounds</VCardTitle>
        <VCardText>
          <VSelect variant="underlined" :items="soundTimerItems" v-model="settings.soundTimer">
            <template #item="{ props, index }">
              <VListItem v-bind="props" :title="`Sound ${index + 1}`"></VListItem>
            </template>
            <template #prepend>
              <VSheet width="100" class="text-body-1">End timer</VSheet>
            </template>
            <template #append>

              <VIcon :key="`icon-${settings.soundTimer}`"
                :icon="settings.soundTimer === 'mute' ? 'mdi-volume-off' : 'mdi-volume-high'"
                @click="settings.soundTimer = 'mute'"></VIcon>

            </template>
          </VSelect>
          <VSelect variant="underlined" :items="soundBreakItems" v-model="settings.soundBreak" width="100">
            <template #item="{ props, index }">
              <VListItem v-bind="props" :title="`Sound ${index + 1}`"></VListItem>
            </template>
            <template #prepend>
              <VSheet width="100" class="text-body-1">End Break</VSheet>
            </template>
            <template #append>

              <VIcon :key="`icon-${settings.soundBreak}`"
                :icon="settings.soundBreak === 'mute' ? 'mdi-volume-off' : 'mdi-volume-high'"
                @click="settings.soundBreak = 'mute'"></VIcon>

            </template>
          </VSelect>

        </VCardText>
        <VCardTitle class="text-h4 my-5">Background</VCardTitle>
        <VCardText>
          <VRow align="center" justify="space-between">
            <VCol cols="auto">
              <VSheet width="120">Type</VSheet>
            </VCol>
            <VCol cols="auto">
              <VBtnToggle mandatory variant="outlined" v-model="settings.backgroundType" color="primary">
                <VBtn value="video">Video</VBtn>
                <VBtn value="image">Image</VBtn>
                <VBtn value="color">Color</VBtn>
              </VBtnToggle>
            </VCol>
            <VCol cols="12">
              <VExpandTransition>
                <VItemGroup v-if="settings.backgroundType === 'video'" v-model="settings.videoSrc" mandatory>
                  <VRow>
                    <VCol v-for="(src, index) in videoItems" :key="index" cols="4">
                      <VItem v-slot="{ isSelected, toggle }" :value="src">
                        <VImg :src="src.replace('.mp4', '-thumbnail.png')" class="text-right pa-2" cover aspectRatio="1"
                          @click="toggle">
                          <VBtn variant="tonal" :class="{ 'text-primary': isSelected }"
                            :icon="isSelected ? 'mdi-check-circle' : 'mdi-check-circle-outline'"></VBtn>
                        </VImg>
                      </VItem>
                    </VCol>
                  </VRow>
                </VItemGroup>
                <VItemGroup v-if="settings.backgroundType === 'image'" v-model="settings.backgroundSrc" mandatory>
                  <VRow>
                    <VCol v-for="(src, index) in imageItems" :key="index" cols="4">
                      <VItem v-slot="{ isSelected, toggle }" :value="src">
                        <VImg :src="src" class="text-right pa-2" cover @click="toggle" aspectRatio="1">
                          <VBtn variant="tonal" :class="{ 'text-primary': isSelected }"
                            :icon="isSelected ? 'mdi-check-circle' : 'mdi-check-circle-outline'"></VBtn>
                        </VImg>
                      </VItem>
                    </VCol>
                  </VRow>
                </VItemGroup>

                <VColorPicker width="100%" v-model="settings.backgroundColor" mode="hex" :modes="['hex']" hideCanvas
                  hideInputs showSwatches hideSliders v-if="settings.backgroundType === 'color'">
                </VColorPicker>
              </VExpandTransition>
            </VCol>
            <VCol cols="12">
              <VSelect variant="underlined" :items="soundNoiseItems" v-model="settings.soundNoise"
                @update:modelValue="playMusic">
                <template #item="{ props, index }">
                  <VListItem v-bind="props" :title="`Sound ${index + 1}`"></VListItem>
                </template>
                <template #prepend>
                  <VSheet width="200" class="text-body-1">Background sound</VSheet>
                </template>
                <template #append>

                  <VIcon :key="`icon-${settings.soundTimer}`"
                    :icon="settings.soundNoise === 'mute' ? 'mdi-volume-off' : 'mdi-volume-high'" @click="muteMusic()">
                  </VIcon>

                </template>
              </VSelect>
            </VCol>
          </VRow>
        </VCardText>


        <VCardTitle class="text-h4 my-5">Auto</VCardTitle>
        <VListItem title="Auto fullscreen when start">
          <template v-slot:append>
            <VSwitch v-model="settings.autoFullscreen" hideDetails color="primary"></VSwitch>
          </template>
        </VListItem>
        <VListItem title="Auto start breaks">
          <template v-slot:append>
            <VSwitch v-model="settings.autobreaks" hideDetails color="primary"></VSwitch>
          </template>
        </VListItem>
        <VListItem title="Auto start next cycle">
          <template v-slot:append>
            <VSwitch v-model="settings.autoNextCycle" hideDetails color="primary"></VSwitch>
          </template>
        </VListItem>
        <VCardTitle class="text-h4 my-5">Notifications</VCardTitle>
        <VListItem title="Notify on completion">

          <template v-slot:append>
            <VSwitch v-model="settings.notifications" @update:modelValue="$event => onChangeNotifications($event)"
              color="primary" hideDetails></VSwitch>
          </template>
        </VListItem>
      </VCard>
    </VNavigationDrawer>
    <VAppBar :density="$vuetify.display.mdAndUp ? 'comfortable' : 'compact'" location="top" color="transparent" extended
      flat>
      <template #prepend>
        <template v-if="$vuetify.display.smAndDown">
          <VSlideYReverseTransition leaveAbsolute>
            <VBtn :stacked="!$vuetify.display.xs" :icon="$vuetify.display.xs" v-if="cycles.pomodoro > 0"
              :key="cycles.pomodoro">
              <VBadge :color="session === 'timer' ? 'primary' : ''" :content="cycles.pomodoro" location="top left">
                <VIcon>mdi-timer-check</VIcon>
              </VBadge>
            </VBtn>
          </VSlideYReverseTransition>
          <VSlideYReverseTransition leaveAbsolute>
            <VBtn :stacked="!$vuetify.display.xs" :icon="$vuetify.display.xs" v-if="cycles.break > 0"
              :key="cycles.break">
              <VBadge :color="session === 'break' ? 'primary' : ''" :content="cycles.break" location="top left">
                <VIcon>mdi-coffee</VIcon>
              </VBadge>
            </VBtn>
          </VSlideYReverseTransition>
          <VSlideYReverseTransition leaveAbsolute>
            <VBtn :stacked="!$vuetify.display.xs" :icon="$vuetify.display.xs" v-if="cycles.longBreak > 0"
              :key="cycles.longBreak">
              <VBadge :color="session === 'long' ? 'primary' : ''" :content="cycles.longBreak" location="top left">
                <VIcon>mdi-sleep</VIcon>
              </VBadge>
            </VBtn>
          </VSlideYReverseTransition>
        </template>
      </template>
      <template #append>
        <VBtn :stacked="!$vuetify.display.xs" :icon="$vuetify.display.xs" @click="toggleFullscreen">
          <VIcon>mdi-fullscreen</VIcon>
        </VBtn>
        <VBtn :stacked="!$vuetify.display.xs" :icon="$vuetify.display.xs" @click="drawer = !drawer">
          <VIcon>mdi-cog-outline</VIcon>
        </VBtn>
      </template>
      <template #extension>
        <VSheet class="h-100 w-100 d-flex justify-center">
          <VSlideYReverseTransition>
            <VSheet v-if="$vuetify.display.mdAndUp">
              <VScrollYReverseTransition leaveAbsolute>
                <VBtn size="x-large" minWidth="200" rounded="pill" variant="tonal" :key="`pomodoro-${cycles.pomodoro}`"
                  :color="session === 'timer' ? 'primary' : ''" :active="session === 'timer'" class="mr-1">
                  <span class="mr-1">{{ cycles.pomodoro }}</span>
                  pomodoros
                </VBtn>
              </VScrollYReverseTransition>
              <VScrollYReverseTransition leaveAbsolute>
                <VBtn size="x-large" minWidth="200" rounded="pill" variant="tonal" class="ml-1"
                  :color="session === 'break' ? 'primary' : ''" :active="session === 'break'"
                  :key="`break-${cycles.break}`">
                  <span class="mr-1">{{ cycles.break }}</span>
                  breaks
                </VBtn>
              </VScrollYReverseTransition>
              <VScrollYReverseTransition leaveAbsolute>
                <VBtn size="x-large" minWidth="200" rounded="pill" variant="tonal" class="ml-1"
                  :color="session === 'long' ? 'primary' : ''" :active="session === 'long'"
                  :key="`long-${cycles.longBreak}`">
                  <span class="mr-1">{{ cycles.longBreak }}</span>
                  long breaks
                </VBtn>
              </VScrollYReverseTransition>
            </VSheet>
          </VSlideYReverseTransition>
        </VSheet>
      </template>
    </VAppBar>

    <VMain>

      <VBtn icon="mdi-test-tube" @click="test" position="fixed" style="right: 100px; top: 100px;z-index: 1000;"> </VBtn>

      <VVideoBackground :backgroundType="settings.backgroundType" :videoSrc="settings.videoSrc"
        :backgroundSrc="settings.backgroundSrc" :backgroundColor="settings.backgroundColor" />
      <VRow class="fill-height" align="center" justify="center" noGutters>

        <VCol cols="12" class="clock d-flex flex-column align-stretch justify-center" ref="el">
          <VScaleTransition leaveAbsolute>
            <VCard v-if="!isFullscreen" @click="toggleFullscreen">
              <VRow class="flex-nowrap" noGutters :style="fontSize"
                :class="{ break: session === 'break', long: session === 'long' }">
                <VCol class="text-end">{{ min }}</VCol>
                <VCol cols="auto">:</VCol>
                <VCol>{{ sec }}</VCol>
              </VRow>
            </VCard>
            <VCard v-else @click="toggleFullscreen">
              <VRow class="flex-nowrap" noGutters style="font-size: 30vw;z-index: 10;"
                :class="{ break: session === 'break', long: session === 'long' }">
                <VCol class="text-end">{{ min }}</VCol>
                <VCol cols="auto">:</VCol>
                <VCol>{{ sec }}</VCol>
              </VRow>
            </VCard>
          </VScaleTransition>
        </VCol>
        <!-- <VCol class="d-flex align-end justify-center ">
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
                <VBtn stacked v-if="!isActive" @click="start" color="primary">Start</VBtn>
                <VBtn stacked color="error" v-else @click="stop">Stop</VBtn>
              </VFadeTransition>
              <VBtn stacked prependIcon="mdi-format-list-checks" class="ml-2"></VBtn>
              <VSpacer />
            </VToolbar>
          </VCol> -->
      </VRow>

    </VMain>
    <VFooter app color="transparent" class="d-flex align-center justify-center">


      <VFadeTransition leaveAbsolute>
        <VBtn v-if="!isActive" olor="primary" variant="tonal" icon size="100" :loading="loading" @click="start">
          <VIcon>mdi-play</VIcon>
        </VBtn>
        <VBtn v-else color="error" variant="tonal" icon size="100" :loading="loading" @click="stop">
          <VIcon>mdi-stop</VIcon>
        </VBtn>
      </VFadeTransition>

    </VFooter>

  </VApp>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useFullscreen, useIntervalFn, useStorage } from "@vueuse/core"
import { useDisplay } from "vuetify"
import { onMounted } from "vue"
// @ts-ignore
import VVideoBackground from './components/VVideoBackground.vue'
// @ts-ignore
import { Howl, Howler } from 'howler'
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,

} from '@tauri-apps/plugin-notification'


useTitle('Pomodoro Timer')
const el = ref<HTMLElement | null>(null)

const { isFullscreen, toggle } = useFullscreen(el)
const loading = ref(false)

const display = useDisplay()


function onLoading() {
  loading.value = true
  setTimeout(() => (loading.value = false), 500)
}

const videoItems = Object.keys(import.meta.glob('../public/video/*.mp4')).map((key) => key.slice(9))
const imageItems = Object.keys(import.meta.glob('../public/images/*.*')).map((key) => key.slice(9))
const soundBreakItems = Object.keys(import.meta.glob('../public/sounds/breaks/*.mp3')).map((key) => key.slice(9))
const soundTimerItems = Object.keys(import.meta.glob('../public/sounds/timers/*.mp3')).map((key) => key.slice(9))
const soundNoiseItems = Object.keys(import.meta.glob('../public/music/noises/*.mp3')).map((key) => key.slice(9))

declare interface Setting {
  type: 'popular' | 'medium' | 'extended' | 'custom'
  backgroundType: 'video' | 'image' | 'color'
  timer: number
  break: number
  longBreak: number
  autoNextCycle: boolean
  autobreaks: boolean
  notifications: boolean
  autoFullscreen: boolean
  backgroundColor: string
  [key: string]: any
}

const settings = useStorage<Setting>('settings', {

  "type": "custom",
  "backgroundType": "image",
  "videoSrc": "/video/3.mp4",
  "backgroundSrc": "/images/1.jpg",
  "backgroundColor": "#7B1FA2",
  "timer": 5,
  "times": 4,
  "break": 3,
  "longBreak": 10,
  "autoNextCycle": true,
  "autobreaks": true,
  "notifications": false,
  "soundTimer": "/sounds/timers/1.mp3",
  "soundBreak": "/sounds/breaks/1.mp3",
  "music": "1",
  "autoFullscreen": false,
  "soundNoise": "mute",
  "background": "video",
  "pomodoro": 5
}, localStorage, {
  mergeDefaults: true
})

const playMusic = () => {
  stopMusic()
  playSound(settings.value.soundNoise, {
    loop: true,
    fade: true
  })
}

const muteMusic = () => {
  settings.value.soundNoise = 'mute'
  stopMusic()
}

const stopMusic = () => {
  Howler.unload()
}

const cycles = ref({
  pomodoro: 0,
  break: 0,
  longBreak: 0,
})

const onChangeSlider = (timer: string = '') => {
  settings.value.type = 'custom'
  if (timer === 'timer') {
    countdown.value = settings.value.timer * minute.value
  }
}

const session = ref<'timer' | 'break' | 'long' | ''>('')

import { useTitle } from '@vueuse/core'

const countdown = ref(0)


const minute = ref(import.meta.env.PROD ? 60 : 1)

const drawer = ref(false)
const { pause, resume, isActive, } = useIntervalFn(
  () => {
    if (countdown.value === 0) {
      switch (session.value) {
        case 'timer':
          endTimer()
          break
        case 'break':
          endBreak()
          break
        case 'long':
          endLong()
          break
      }
      return
    }
    if (countdown.value < 4 && session.value === 'timer') {
      playSound(settings.value.soundTimer)
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
  fontSize: display.smAndUp.value ? "15vw" : "30vw",
}))

const startTimer = () => {
  if (countdown.value === 0) {
    countdown.value = settings.value.timer * minute.value
  }
  session.value = 'timer'
  resume()
}

const endTimer = () => {
  cycles.value.pomodoro++
  pause()
  if (settings.value.autobreaks)
    (settings.value.times > 0 && cycles.value.pomodoro % settings.value.times === 0) ? startLongBreak() : startBreak()

}

const startBreak = () => {
  session.value = 'break'
  countdown.value = settings.value.break * minute.value
  resume()
}

const endBreak = () => {
  playSound(settings.value.soundBreak)
  cycles.value.break++
  session.value = ''
  pause()
  if (settings.value.autoNextCycle) {
    startTimer()
  }
}

const startLongBreak = () => {
  session.value = 'long'
  countdown.value = settings.value.longBreak * minute.value
  resume()
}

const endLong = () => {
  cycles.value.longBreak++
  session.value = ''
  pause()
  if (settings.value.autoNextCycle) {
    startTimer()
  }
}

const playSound = (value: string, options: any = {}) => {
  if (value === 'mute') {
    return
  }

  var sound = new Howl({
    src: [value],
    ...options,
    ...{
      onload: () => {
        if (options.fade) {
          sound.fade(0, 1, 2000)
        }
      }
    }
  })

  sound.play()


}

const start = () => {
  onLoading()

  if (settings.value.autoFullscreen) {
    toggle()
  }
  if (settings.value.music) {
    playMusic()
  }

  countdown.value = settings.value.timer * minute.value
  startTimer()
}

const stop = () => {
  onLoading()
  countdown.value = settings.value.timer * minute.value
  stopMusic()
  pause()
}


const toggleFullscreen = () => {
  toggle()
}

const title = computed(() => {
  switch (session.value) {
    case 'timer':
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
      settings.value.timer = countdown.value = 25
      settings.value.break = 5
      settings.value.times = 4
      settings.value.longBreak = 15
      break
    case 'medium':
      settings.value.timer = countdown.value = 40
      settings.value.break = 8
      settings.value.times = 4
      settings.value.longBreak = 20
      break
    case 'extended':
      settings.value.timer = countdown.value = 60
      settings.value.break = 10
      settings.value.times = 4
      settings.value.longBreak = 30
      break
  }
}

const onChangeNotifications = async (value: any) => {
  if (value) {

    isPermissionGranted()
      .then(granted => granted ? 'granted' : requestPermission())
      .then(granted => {
        if (granted) {
          sendNotification({
            title: 'Pomodoro Timer',
            body: 'Work in Sprints, Win the Marathon'
          })
        }
      })
  }
}

// @ts-ignore
const test = async (value: any) => {
  // Do you have permission to send a notification?

}

onMounted(() => {
  countdown.value = settings.value.timer
})
</script>

<style lang="scss"></style>
