const typescript = require("@rollup/plugin-typescript").default;
const nodeResolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const json = require("@rollup/plugin-json").default;

module.exports = {
	input: "server/index.ts",
	output: {
		file: "dist/server.js",
		format: "cjs",
		inlineDynamicImports: true,
	},
	plugins: [typescript(), nodeResolve(), commonjs(), json()],
};
