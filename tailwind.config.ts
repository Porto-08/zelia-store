import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkBlue': '#060930',
        'lightBlue': '#595B83',
        'lightBlueGray': '#333456',
        'pastelPink': '#F4ABC4',
      }
    },
  },
  plugins: [
    daisyui,
  ],
};
export default config;
