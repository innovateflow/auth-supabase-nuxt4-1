import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Fontes baseadas no site oficial do Nuxt
        'sans': ['Public Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'nuxt': ['Public Sans', 'sans-serif'],
        'heading': ['Public Sans', 'sans-serif'],
        'body': ['Public Sans', 'sans-serif'],
      },
      fontSize: {
        // Tamanhos de fonte baseados no Nuxt (responsivos)
        'hero': ['clamp(2.5rem, 8vw, 4.5rem)', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'heading-xl': ['clamp(2rem, 6vw, 3rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'heading-lg': ['clamp(1.5rem, 4vw, 2.25rem)', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading-md': ['clamp(1.25rem, 3vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['clamp(1.125rem, 2.5vw, 1.25rem)', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['clamp(1rem, 2vw, 1.125rem)', { lineHeight: '1.7', fontWeight: '400' }],
        'body-base': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.02em',
      },
      colors: {
        // Cores baseadas no site oficial do Nuxt
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bbe5cb',
          300: '#8dd2a9',
          400: '#5bb981',
          500: '#01A767', // Cor principal dos botões
          600: '#018f5a',
          700: '#01724a',
          800: '#015b3c',
          900: '#014b32',
        },
        dark: {
          primary: '#050A1D',    // Cor principal escura
          background: '#060B1E', // Background principal
          secondary: '#0C1426',  // Tons secundários
          accent: '#1A2332',     // Acentos
        },
        nuxt: {
          primary: '#050A1D',
          background: '#060B1E', 
          text: '#FFFFFF',
          button: '#01A767',
          green: '#01A767',
          dark: '#050A1D',
        }
      },
      backgroundColor: {
        'primary': '#050A1D',
        'secondary': '#060B1E',
      },
      textColor: {
        'primary': '#FFFFFF',
        'secondary': '#E5E7EB',
      },
      borderColor: {
        'primary': '#01A767',
        'dark': '#1A2332',
      },
    },
  },
  plugins: [],
} satisfies Config
