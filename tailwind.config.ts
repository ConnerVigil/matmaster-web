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
        primary: "#53389E",
        primaryLight: "#7F56D9",
        primary2: "#F9F5FF",
        gray1: "#101828",
        gray2: "#344054",
        gray3: "#475467",
        gray4: "#667085",
        gray5: "#D0D5DD",
        gray6: "#F2F4F7",
      },
    },
  },
  plugins: [],
};
export default config;
