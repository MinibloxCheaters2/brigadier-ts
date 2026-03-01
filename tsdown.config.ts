import { defineConfig } from "tsdown";

export default defineConfig({
	platform: "neutral",
	tsconfig: "./tsconfig.json",
	target: "es2020",
	unbundle: true,
	sourcemap: true,
	minify: true,
});
