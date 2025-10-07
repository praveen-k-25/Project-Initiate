import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ Use class strategy, not media
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist Sans", "sans-serif"], // optional if you want `font-geist` class
      },
      fontWeight: {
        extrathin: "100",
        thin: "200",
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [],
};

export default config;
