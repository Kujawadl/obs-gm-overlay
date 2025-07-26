import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { checker } from "vite-plugin-checker";

export default defineConfig({
	plugins: [
		react(),
		viteTsconfigPaths(),
		checker({
			typescript: true,
			eslint: { lintCommand: "eslint", useFlatConfig: true },
			overlay: { initialIsOpen: "error", position: "tl" },
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	root: "src",
	build: {
		outDir: "../dist",
	},
	server: {
		port: 3000,
	},
});
