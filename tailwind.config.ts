import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        '15': '15px',
      },
      boxShadow: {
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      height:{
        '64':'431px',
        '365':'342px',
        '66':'450px'
      }
    },
  },
  plugins: [],
};
export default config;
