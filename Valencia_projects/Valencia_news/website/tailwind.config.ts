import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-main":
          "linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #1d4ed8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
