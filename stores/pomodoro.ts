import { useChangeCase } from '@vueuse/integrations/useChangeCase'

export const usePomodoroStore = defineStore('PomodoroStore', () => {
  const settingsStore = useSettingsStore()

  const target = ref<HTMLElement | null>(null)
  const fullscreen = useFullscreen(target)

  function setTimerElement(element: HTMLElement | null) {
    target.value = element
  }


  const pomodoro = useLocalStorage('pomodoro', {
    preset: 'popular',
    active: 'timer',
    times: 1,
    timer: 25,
    break: 5,
    cycles: 2,
    longBreak: 15,
  }, {
    mergeDefaults: true,
  })

  const timer = ref(pomodoro.value.timer * 60)

  const minutes = computed(() =>
    Math.floor(timer.value / 60)
      .toString()
      .padStart(2, "0")
  )
  const seconds = computed(() => (timer.value % 60).toString().padStart(2, "0"))

  const time = computed(() => `${minutes.value}:${seconds.value}`)

  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (timer.value === 0) {
        return nextSession()
      } else if (timer.value < 4) {
        useSettingsStore().playSound('timer')
      }

      timer.value--
    },
    1000,
    {
      immediate: false,
    }
  )

  const totalSeconds = computed(() => (pomodoro.value as any)[pomodoro.value.active] * 60)

  const progress = computed(() => Math.round((totalSeconds.value - timer.value) / totalSeconds.value * 100))

  function nextSession() {
    pause()
    console.log(pomodoro.value)

    switch (pomodoro.value.active) {
      case 'timer':
        pomodoro.value.active = pomodoro.value.times % pomodoro.value.cycles !== 0 ? 'break' : 'longBreak'
        setTimer()
        break
      case 'break':
        pomodoro.value.active = 'timer'
        setTimer()
        useSettingsStore().playSound('break')
        pomodoro.value.times++
        break
      case 'longBreak':
        pomodoro.value.active = 'timer'
        setTimer()
        pomodoro.value.times++
        useSettingsStore().playSound('break')
        break
    }
    if (settingsStore.allowNotification) {
      try {
        useWebNotification({
          title: 'Pomodoro Timer',
          body: `It's time for your ${pomodoro.value.active} session!`,
        })
      } catch (error) {
      }
    }
    resume()
  }

  const isReset = computed(() => !timer.value && !isActive.value)

  const title = useChangeCase(`${pomodoro.value.active} ${pomodoro.value.active === 'longBreak' ? '' : pomodoro.value.times}`, 'sentenceCase').value

  function setTimer(minutes?: number) {
    timer.value = minutes ? minutes * 60 : (pomodoro.value as any)[pomodoro.value.active] * 60
  }

  function setPomodoro(type: string) {

    if (type === 'Custom') {
      return
    }
    pomodoro.value.preset = type

    const appConfig = useAppConfig()
    const data = (appConfig.settings.pomodoros as any)[type]
    pomodoro.value.timer = data.timer
    pomodoro.value.break = data.break
    pomodoro.value.cycles = data.cycles
    pomodoro.value.longBreak = data.longBreak
  }

  watch(() => pomodoro.value.timer, (value) => {
    setTimer(value)
  })

  watch(time, (value) => {
    useHead({
      title: `${title.value} - ${value}`
    })
  })

  function start() {
    resume()
    if (settingsStore.fullscreen) {
      fullscreen.enter()
    }
    settingsStore.playMusic()
  }

  function stop() {
    pause()
    reset()
    useSettingsStore().stopAudio()
    fullscreen.exit()
  }

  function reset() {
    pomodoro.value.active = 'timer'
    pomodoro.value.times = 1
    setTimer()
  }


  return {
    pomodoro,
    isActive,
    minutes,
    seconds,
    isReset,
    fullscreen,
    progress,
    title,
    setTimerElement,
    setPomodoro,
    setTimer,
    start,
    stop,
    reset,
  }
})

