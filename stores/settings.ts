import { Howl, Howler } from "howler"

export const useSettingsStore = defineStore('AppSettings', () => {
  const drawer = ref(true)
  const fullscreen = ref(false)
  const style = ref('study')
  const background = ref({
    type: "image",
    value: "/images/3.jpg"
  })

  const allowNotification = ref(false)

  const sound = ref<any>({
    timer: 'default',
    break: 'default',
    longBreak: 'default',
    end: 'default',
  })

  const music = ref<string>()

  function playSound(type: string, options?: any) {

    const path = `/sounds/${type}/${sound.value[type]}.mp3`
    playAudio(path)
  }


  function playMusic(path?: string) {
    stopAudio()
    path = path || music.value
    if (!path) return
    playAudio(path, { loop: true })
  }

  function setMusic(path: string) {
    music.value = path
    playMusic(path)
  }

  function playAudio(path: string, options?: any) {
    console.log('Play: ', path)

    const src = [path]
    const control = new Howl({ src, ...options })
    control.play()
  }

  function stopAudio() {
    Howler.unload()
  }


  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  function setBackground({ type, value }: { type: string, value: string }) {
    background.value.type = type
    background.value.value = value
  }

  function setPomodoroStyle(value?: string) {
    if (!value) {
      return
    }
    style.value = value
  }

  return {
    drawer,
    fullscreen,
    style,
    music,
    background,
    allowNotification,
    toggleDrawer,
    setPomodoroStyle,
    setBackground,
    playSound,
    playMusic,
    setMusic,
    stopAudio
  }
})

