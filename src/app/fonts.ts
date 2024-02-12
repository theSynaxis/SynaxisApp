import { Source_Sans_3 } from "next/font/google";
import localFont from 'next/font/local'

export const sourceSansPro = Source_Sans_3({
    subsets: ["latin"],
    variable: "--font-sans",
});

// Font files can be colocated inside of `app`
export const synaxisHeader = localFont({
  src: '../styles/fonts/TriodPostNaja/TriodPostnaja-0G4z.ttf',
  variable: '--font-synaxis',
});