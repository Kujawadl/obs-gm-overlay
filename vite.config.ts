require("dotenv").config();

import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { checker } from "vite-plugin-checker";

const graphqlPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

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
		host: "localhost",
		port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 3000,
		proxy: {
			"/api/subscriptions": {
				target: {
					protocol: "ws",
					host: "localhost",
					port: graphqlPort,
				},
				ws: true,
				changeOrigin: true,
				rewriteWsOrigin: true,
			},
			"/api": {
				target: {
					protocol: "http",
					host: "localhost",
					port: graphqlPort,
				},
				changeOrigin: true,
			},
		},
	},
});
