import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      'gold-100': '#FFF4D9',
      'gold-300': '#FAD57A',
      'gold-500': '#EEBC42',
      'gold-700': '#A07917',
      'gold-900': '#332503',
      'neutral-100': '#FFF8E6',
      'neutral-300': '#C2B9A3',
      'neutral-500': '#6D644D',
      'neutral-700': '#423820',
      'neutral-900': '#332A14',
      'green-100': '#CDFFCC',
      'green-300': '#81F57F',
      'green-500': '#40E03D',
      'green-700': '#1BA019',
      'green-900': '#054D04',
      'red-100': '#F29D9D',
      'red-300': '#F56161',
      'red-500': '#E03D3D',
      'red-700': '#C31616',
      'red-900': '#970202',
      'blue-100': '#B1C7F2',
      'blue-300': '#6B9EFF',
      'blue-500': '#3D74E0',
      'blue-700': '#1451C7',
      'blue-900': '#021C4D',
      'yellow-100': '#F5F2B8',
      'yellow-300': '#FDF559',
      'yellow-500': '#EDE43B',
      'yellow-700': '#CFC50F',
      'yellow-900': '#A8A001',
    }
  },
  plugins: [],
} satisfies Config;
