import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        breadcrumb:
          '0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);',
      },
      colors: {
        primary: {
          50: '#F0F3F9',
          100: '#E2E8F3',
          200: '#D0D8E7',
          300: '#99A9C7',
          400: '#677B9E',
          500: '#476085',
          600: '#2A466A',
          700: '#003057',
          800: '#0A2542',
          900: '#0D1B2D',
          950: '#0A111A',
        },
        textDefault: '#171717',
        textPlaceholder: '#737373',
        textSubtle: '#525252',
        textSubtleReverse: '#A3A3A3',
        feedbackError: '#DC2626',
        reeceBlue: '#003057',
        maxLightBlue: '#0075A9',
        trueBlue: '#6FB1C8',
        steelCapGrey: '#808285',
        buttonBlue: '#0063B5',
        buttonBlueHover: '#005297',
        buttonDisabled: '#E5E5E5',
        pageIndicatorGray: '#D4D4D4',
      },
      fontFamily: {
        sans: ['Gotham-Book'],
        'sans-bold': ['Gotham'],
        mono: ['Courier New', 'monospace'],
      },
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
      spacing: {
        '5.5': '1.375rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
