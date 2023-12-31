import type { Config } from 'tailwindcss'

const config: Config = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        llg: '1366px',
        xl: '1440px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bg': 'var(--bg)',
        'bgSoft': 'var(--bgSoft)',
        'text': 'var(--text)',
        'textSoft': 'var(--textSoft)',
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('tailwindcss-rtl'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    rtl: true,
  },
}
export default config
