require("dotenv").config();

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
			"@src": path.resolve(__dirname, "src"),
			"@graphql": path.resolve(__dirname, "graphql"),
			"@server": path.resolve(__dirname, "server"),
			"@utils": path.resolve(__dirname, "utils"),
		},
	},
	root: ".",
	build: {
		outDir: "./dist/public",
	},
	server: {
		port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 3000,
		proxy: {
			"/api": {
				target: `http://localhost:${process.env.PORT || 4000}/api`,
				changeOrigin: true,
			},
		},
	},
});
