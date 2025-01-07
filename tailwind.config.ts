import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16'
        }
      },
      rotate: {
        ...Array.from({ length: 60 }, (_, i) => ({
          [`${i + 1}`]: `${(i + 1) * 6}deg`, // Sửa lỗi ở đây
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      },
      // Định nghĩa các keyframes cho animation
      // keyframes: {
      //   rotate: {
      //     'from': { transform: 'rotate(0deg)' },
      //     'to': { transform: 'rotate(360deg)' },
      //   }
      // },
      // Định nghĩa animation
      // animation: {
      //   'spin-slow': 'rotate 60s circle infinite', // Kim giây
      //   'spin-medium': 'rotate 3600s linear infinite', // Kim phút
      //   'spin-fast': 'rotate 43200s linear infinite', // Kim giờ
      // }
    }
  },
  content: [
    './components/**/*.{vue,js}',
  ],
  safelist: [
    { pattern: /from-(sky|cyan|violet|slate|neutral)-(400|500|600)/ },
    { pattern: /to-(sky|cyan|violet|slate|neutral)-(400|500|600)/ },
    { pattern: /rotate-(0|[1-5]?[0-9]|60)/ },
    { pattern: /shadow-/ },
    { pattern: /bg-/ },
  ]
}
