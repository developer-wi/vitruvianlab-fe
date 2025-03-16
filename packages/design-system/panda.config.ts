import { defineConfig } from "@pandacss/dev";
import { pandaConfig } from "./src/pandacss";

const config = defineConfig({
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  ...pandaConfig,
});

export default config;
