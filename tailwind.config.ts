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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    boxShadow: {
      'sm': '0 0 6px 0 rgba(210, 207, 200, 1)',
      'md': '0 0 12px 0 rgba(210, 207, 200, 1)',
      'lg': '0 0 25px 0 rgba(210, 207, 200, 1)', // can use for hover shadow
    },
    colors: {
      'primary-gold': {
        50: '#FDF8EC',
        100: '#FAEAC4',
        200: '#F7E0A8',
        300: '#F4D280',
        400: '#F1C968',
        500: '#EEBC42', // brand gold
        600: '#D9AB3C',
        700: '#A9852F',
        800: '#836724',
        900: '#644F1C',
      },
      'secondary-red': {
        50: '#FCEBE6',
        100: '#F5C0B0',
        200: '#F0A28A',
        300: '#EA7854',
        400: '#E55D33',
        500: '#DF3500', // brand red
        600: '#CB3000',
        700: '#9E2600',
        800: '#7B1D00',
        900: '#5E1600',
      },
      'neutral': {
        50: '#F0F0ED', // page bg
        100: '#D2CFC8',
        200: '#BCB8AD',
        300: '#9D9788',
        400: '#8A8371',
        500: '#6D644D',
        600: '#635B46',
        700: '#4D4737',
        800: '#3C372A',
        900: '#2E2A20', // page "black"
      },
      'success-green': {
        50: '#ECFCEC',
        100: '#C4F5C3',
        200: '#A7F1A6',
        300: '#7FEA7D',
        400: '#66E664',
        500: '#40E03D',
        600: '#3ACC38',
        700: '#2D9F2B',
        800: '#237B22',
        900: '#1B5E1A',
      },
      'info-blue': {
        50: '#ECF1FC',
        100: '#C3D4F5',
        200: '#A6BFF1',
        300: '#7DA2EA',
        400: '#6490E6',
        500: '#3D74E0',
        600: '#386ACC',
        700: '#2B529F',
        800: '#22407B',
        900: '#1A315E',
      },
      'warning-yellow': {
        50: '#FDFCEB',
        100: '#F9F7C2',
        200: '#F7F3A5',
        300: '#F3ED7C',
        400: '#F1E962',
        500: '#EDE43B',
        600: '#D8CF36',
        700: '#A8A22A',
        800: '#827D20',
        900: '#646019',
      },
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;