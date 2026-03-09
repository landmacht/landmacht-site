import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        tactical: {
          950: '#0b0d0b',
          900: '#101311',
          800: '#1a1f1b',
          700: '#273028',
          600: '#354337',
          olive: '#6f7c4d',
          oliveLight: '#8f9e6b'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        heading: ['Barlow Condensed', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        tactical: '0 12px 30px rgba(0, 0, 0, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
