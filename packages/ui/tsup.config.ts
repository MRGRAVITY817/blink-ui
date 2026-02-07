import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/define.ts",
    "src/react/index.ts",
    // Controllers
    "src/controllers/index.ts",
    // Primitives
    "src/primitives/visually-hidden/index.ts",
    "src/primitives/portal/index.ts",
    "src/primitives/live-announce/index.ts",
    // Components
    "src/components/button/index.ts",
    "src/components/card/index.ts",
    "src/components/input/index.ts",
    "src/components/badge/index.ts",
    "src/components/alert/index.ts",
    "src/components/separator/index.ts",
    "src/components/label/index.ts",
    "src/components/avatar/index.ts",
    "src/components/spinner/index.ts",
    "src/components/skeleton/index.ts",
    "src/components/icon/index.ts",
    "src/components/toggle/index.ts",
    "src/components/checkbox/index.ts",
    "src/components/switch/index.ts",
    "src/components/radio/index.ts",
    "src/components/radio-group/index.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react"],
  splitting: true,
  treeshake: true,
});
