import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/define.ts",
    "src/react/index.ts",
    "src/components/button/index.ts",
    "src/components/card/index.ts",
    "src/components/input/index.ts",
    "src/components/badge/index.ts",
    "src/components/alert/index.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["react"],
  splitting: true,
  treeshake: true,
});
