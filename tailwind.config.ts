import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        synaxisHeader: ["var(--font-synaxis)"], // brand font
      },
    },
    boxShadow: {
      'sm': '0 0 6px 0 rgba(210, 207, 200, 1)',
      'md': '0 0 12px 0 rgba(210, 207, 200, 1)',
      'lg': '0 0 25px 0 rgba(210, 207, 200, 1)', // can use for hover shadow
    },
    colors: {
      'primary-gold-50': '#FDF8EC',
      'primary-gold-100': '#FAEAC4',
      'primary-gold-200': '#F7E0A8',
      'primary-gold-300': '#F4D280',
      'primary-gold-400': '#F1C968',
      'primary-gold-500': '#EEBC42', // brand gold
      'primary-gold-600': '#D9AB3C',
      'primary-gold-700': '#A9852F',
      'primary-gold-800': '#836724',
      'primary-gold-900': '#644F1C',
      'secondary-red-50': '#FCEBE6',
      'secondary-red-100': '#F5C0B0',
      'secondary-red-200': '#F0A28A',
      'secondary-red-300': '#EA7854',
      'secondary-red-400': '#E55D33',
      'secondary-red-500': '#DF3500', // brand red
      'secondary-red-600': '#CB3000',
      'secondary-red-700': '#9E2600',
      'secondary-red-800': '#7B1D00',
      'secondary-red-900': '#5E1600',
      'neutral-50': '#F0F0ED', // page bg
      'neutral-100': '#D2CFC8',
      'neutral-200': '#BCB8AD',
      'neutral-300': '#9D9788',
      'neutral-400': '#8A8371',
      'neutral-500': '#6D644D',
      'neutral-600': '#635B46',
      'neutral-700': '#4D4737',
      'neutral-800': '#3C372A',
      'neutral-900': '#2E2A20', // page "black"
      'success-green-50': '#ECFCEC',
      'success-green-100': '#C4F5C3',
      'success-green-200': '#A7F1A6',
      'success-green-300': '#7FEA7D',
      'success-green-400': '#66E664',
      'success-green-500': '#40E03D',
      'success-green-600': '#3ACC38',
      'success-green-700': '#2D9F2B',
      'success-green-800': '#237B22',
      'success-green-900': '#1B5E1A',
      'info-blue-50': '#ECF1FC',
      'info-blue-100': '#C3D4F5',
      'info-blue-200': '#A6BFF1',
      'info-blue-300': '#7DA2EA',
      'info-blue-400': '#6490E6',
      'info-blue-500': '#3D74E0',
      'info-blue-600': '#386ACC',
      'info-blue-700': '#2B529F',
      'info-blue-800': '#22407B',
      'info-blue-900': '#1A315E',
      'warning-yellow-50': '#FDFCEB',
      'warning-yellow-100': '#F9F7C2',
      'warning-yellow-200': '#F7F3A5',
      'warning-yellow-300': '#F3ED7C',
      'warning-yellow-400': '#F1E962',
      'warning-yellow-500': '#EDE43B',
      'warning-yellow-600': '#D8CF36',
      'warning-yellow-700': '#A8A22A',
      'warning-yellow-800': '#827D20',
      'warning-yellow-900': '#646019',
    },
    fontSize: {
      xs: ['0.625rem', { lineHeight: '1rem' }], // 10px body-xl
      sm: ['0.75rem', { lineHeight: '1.25rem' }], // 12px body-sm
      base: ['0.875rem', { lineHeight: '1.5rem' }], // 14px body-md
      lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px h6/body-lg
      xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px h5/body-xl
      '2xl': ['1.375rem', { lineHeight: '2rem' }], // 22px h4
      '3xl': ['1.75rem', { lineHeight: '2.25rem' }], // 28px h3
      '4xl': ['2rem', { lineHeight: '2.5rem' }], // 32px h2
      '5xl': ['3rem', { lineHeight: '1' }], // 48px h1
    },
  },
  plugins: [],
} satisfies Config;
