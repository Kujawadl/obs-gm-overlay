const typescript = require("@rollup/plugin-typescript").default;
const nodeResolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const json = require("@rollup/plugin-json").default;
const replace = require("@rollup/plugin-replace").default;

module.exports = {
	input: "server/index.ts",
	output: {
		file: "dist/server.js",
		format: "cjs",
		inlineDynamicImports: true,
	},
	plugins: [
		replace({
			"process.env.NODE_ENV": JSON.stringify("production"),
			"process.env.PORT": JSON.stringify(3000),
		}),
		typescript(),
		nodeResolve(),
		commonjs(),
		json(),
	],
};
