import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        widget: '0.75rem',
      },
      backdropBlur: {
        widget: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
