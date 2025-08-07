const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execSync } = require("node:child_process");
const { Readable } = require("node:stream");
const extract = require("extract-zip");
const tar = require("tar");
// @ts-expect-error no types on this library
const postject = require("postject");

/**
 * @typedef PostjectOptions
 * @property {string} [machoSegmentName]
 * @property {boolean} [overwrite]
 * @property {string} [sentinelFuse]
 * @type {(binaryPath: string, resourceName: string, resourceData: Buffer, options: PostjectOptions) => Promise<void>}
 */
const inject = postject.inject;

function createSeaConfig() {
	console.log("[SEA] Generating sea-config.json...");
	const files = fs.readdirSync(path.join(__dirname, "dist"), {
		recursive: true,
		withFileTypes: true,
	});

	const config = {
		main: "./dist/server.js",
		output: "./dist/app.blob",
		disableExperimentalSEAWarning: true, // Default: false
		useSnapshot: false, // Default: false
		useCodeCache: false, // Default: false
		assets: files.reduce((acc, file) => {
			if (
				!(
					file.isDirectory() ||
					["sea-config.json", "server.js", "app.blob"].includes(file.name) ||
					file.parentPath.includes("binaries")
				)
			) {
				const relativePath = path
					.join(
						file.parentPath
							.replace(__dirname, "")
							.replace(/^(\/|\\+)?dist(\/|\\+)public(\/|\\+)?/i, ""),
						file.name,
					)
					.replace(/\\/g, "/");
				const absolutePath = path.join(file.parentPath, file.name);
				acc[relativePath] = absolutePath;
			}
			return acc;
		}, {}),
	};

	fs.writeFileSync(
		path.join(__dirname, "dist", "sea-config.json"),
		JSON.stringify(config, null, 2),
	);
}

async function downloadBinaries() {
	console.log("[SEA] Downloading Node.js binary...");
	const platform = os.platform() === "win32" ? "win" : os.platform();
	const arch = os.arch();
	const version = fs
		.readFileSync(path.join(__dirname, ".nvmrc"), "utf-8")
		.trim();
	const baseUrl = "https://nodejs.org/dist";
	const outDir = path.join(__dirname, "dist", "binaries");

	fs.rmSync(outDir, { recursive: true, force: true });
	fs.mkdirSync(outDir, { recursive: true });

	const nodeString = `node-v${version}-${platform}-${arch}`;
	const url = `${baseUrl}/v${version}/${nodeString}.${platform === "win" ? "zip" : "tar.gz"}`;
	console.log(`[SEA] Download URL: ${url}`);
	// eslint-disable-next-line no-undef
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Accept-Encoding": "gzip, deflate, br",
		},
	});
	if (!response.body || !response.ok) {
		throw new Error(
			`Failed to download ${url}: ${response.status} ${response.statusText}`,
		);
	}

	// Download to a temp file
	const tmpFile = path.join(
		outDir,
		`${nodeString}.${platform === "win" ? "zip" : "tar.gz"}`,
	);
	const readStream = Readable.from(response.body);
	const fileStream = fs.createWriteStream(tmpFile);
	console.log(`[SEA] Downloading to temp file: ${tmpFile}`);
	await new Promise((resolve, reject) => {
		readStream.pipe(fileStream);
		readStream.on("error", reject);
		fileStream.on("error", reject);
		fileStream.on("finish", () => resolve(undefined));
	});

	let nodeBinaryPath = null;
	let extractedDir = null;
	let destFile = null;
	if (platform === "win") {
		console.log("[SEA] Extracting zip archive...");
		await extract(tmpFile, { dir: outDir });
		extractedDir = path.join(outDir, `node-v${version}-${platform}-${arch}`);
		const candidate = path.join(extractedDir, "node.exe");
		if (fs.existsSync(candidate)) {
			nodeBinaryPath = candidate;
		} else {
			throw new Error(`Node binary not found at expected path: ${candidate}`);
		}
		destFile = path.join(
			outDir,
			nodeString.replace(`-v${version}`, "") + ".exe",
		);
	} else {
		console.log("[SEA] Extracting tar.gz archive...");
		await tar.x({
			file: tmpFile,
			cwd: outDir,
			sync: true,
		});
		extractedDir = path.join(outDir, `node-v${version}-${platform}-${arch}`);
		const candidate = path.join(extractedDir, "bin", "node");
		if (fs.existsSync(candidate)) {
			nodeBinaryPath = candidate;
		} else {
			throw new Error(`Node binary not found at expected path: ${candidate}`);
		}
		destFile = path.join(outDir, nodeString.replace(`-v${version}`, ""));
	}

	console.log(`[SEA] Moving Node binary to: ${destFile}`);

	fs.copyFileSync(nodeBinaryPath, destFile);
	fs.chmodSync(destFile, 0o755);
	fs.rmSync(extractedDir, { recursive: true, force: true });
	fs.rmSync(tmpFile, { force: true });
	console.log("[SEA] Node binary ready.");
	return destFile;
}

function generateAppBlob() {
	console.log("[SEA] Generating app.blob with --experimental-sea-config...");
	execSync(
		"node --experimental-sea-config ./dist/sea-config.json ./dist/server.js",
		{ stdio: "inherit" },
	);
}

async function injectAppBlob(binary) {
	console.log(`[SEA] Injecting app.blob into binary: ${binary}`);
	await inject(
		binary,
		"NODE_SEA_BLOB",
		fs.readFileSync(path.join(__dirname, "dist", "app.blob")),
		{
			overwrite: true,
			sentinelFuse: "NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2",
			machoSegmentName: os.platform() === "darwin" ? "NODE_SEA" : undefined,
		},
	);
}

function codesign(binary) {
	console.log(`[SEA] Optionally codesigning binary: ${binary}`);
	switch (os.platform()) {
		case "darwin":
			try {
				execSync(`codesign --sign - "${binary}"`, {
					stdio: "inherit",
				});
			} catch (error) {
				console.warn(
					`Warning: Code signing failed for ${binary}. Make sure you have the appropriate entitlements and a valid signing identity.`,
				);
				console.error(error);
			}
			break;
		case "win32":
			try {
				execSync(
					`signtool sign /a /fd SHA256 /t http://timestamp.digicert.com "${binary}"`,
					{
						stdio: "inherit",
					},
				);
			} catch (error) {
				console.warn(
					`Warning: Signing failed for ${binary}. Make sure you have the appropriate certificate.`,
				);
				console.error(error);
			}
			break;
		default:
			console.warn(
				`Warning: Code signing is not supported for platform "${os.platform()}". Skipping codesign step.`,
			);
	}
}

(async function main() {
	createSeaConfig();
	generateAppBlob();
	const binary = await downloadBinaries();
	await injectAppBlob(binary);
	codesign(binary);
	console.log(
		"[SEA] SEA build process finished, executable is ready at:",
		binary,
	);
})();
