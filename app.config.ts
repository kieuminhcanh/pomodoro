export default defineAppConfig({
  drawer: false,
  ui: {
    primary: 'teal',
    gray: 'slate',
  },
  settings: {
    pomodoros: {
      popular: {
        timer: 25,
        break: 5,
        cycles: 4,
        longBreak: 15,
      },
      medium: {
        timer: 40,
        break: 8,
        cycles: 4,
        longBreak: 20,
      },
      extended: {
        timer: 60,
        break: 10,
        cycles: 4,
        longBreak: 30,
      }
    }
  }
})
