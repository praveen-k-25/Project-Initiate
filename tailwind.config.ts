import type {Config} from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ Use class strategy, not media
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "oklch(0.97 0.014 254.604)",
      },
    },
  },
  plugins: [],
};

export default config;
