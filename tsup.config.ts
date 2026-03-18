import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  // Externalize ALL peer dependencies so they are never bundled
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@mantine/core",
    "@mantine/hooks",
    "@tabler/icons-react",
    "react-router",
  ],
  loader: {
    ".png": "dataurl",   // inlines as base64 data URL
  }
});
