import { parse } from "node:url";
import { basename, resolve } from "node:path";
import { getAsset, isSea } from "node:sea";

import express from "express";
import { expressMiddleware } from "@as-integrations/express5";

import { WebSocketServer } from "ws";
import { config } from "dotenv";
import open from "open";

import { setupContext } from "@graphql/context";
import setupApolloServer from "@graphql/setup-apollo-server";
import determinePort from "@server/determinePort";

config();

determinePort().then((port) => {
	const app = express();
	const httpServer = app.listen(port);
	const wss = new WebSocketServer({ noServer: true });

	httpServer.on("upgrade", async function connection(req, socket, head) {
		const { pathname } = parse(req.url as string, true);
		if (pathname === "/api/subscriptions" && !(socket as any).websocket) {
			wss.handleUpgrade(req, socket, head, function done(ws) {
				wss.emit("connection", ws, req);
			});
		}
	});

	const context = setupContext();

	const apollo = setupApolloServer(httpServer, wss, context);
	apollo.start().then(() => {
		app.use(
			"/api",
			express.json(),
			expressMiddleware(apollo, {
				context: ({ req, res }) => Promise.resolve({ req, res, ...context }),
			}),
		);

		if (process.env.NODE_ENV === "production") {
			app.use<{ splat?: string[] }>("/{*splat}", (req, res) => {
				const splatArray = Array.isArray(req.params.splat)
					? req.params.splat
					: ["index.html"];
				const splat = splatArray.join("/");

				// Validate splat to prevent directory traversal
				if (
					splat.includes("..") ||
					splat.startsWith("/") ||
					splat.startsWith("\\")
				) {
					return res.status(400).send("Invalid file path");
				}

				if (isSea()) {
					try {
						const asset = getAsset(splat);
						res.contentType(basename(splat)).send(Buffer.from(asset));
					} catch {
						try {
							const asset = getAsset("index.html");
							res.contentType("text/html").send(Buffer.from(asset));
						} catch {
							res.status(404).send("Not found");
						}
					}
				} else {
					res.sendFile(resolve(__dirname, "public", splat));
				}
			});
		}

		app.listen(port, () => {
			if (process.env.NODE_ENV === "production") {
				console.log(`🚀 Frontend ready at http://localhost:${port}/`);
				open(`http://localhost:${port}/`);
			}
			console.log(`🚀 Apollo Server ready at http://localhost:${port}/api`);
			console.log(
				`🚀 Subscriptions ready at ws://localhost:${port}/api/subscriptions`,
			);
		});
	});
});
