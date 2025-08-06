import { parse } from "node:url";
import { basename, resolve } from "node:path";
import { getAsset, isSea } from "node:sea";

import express from "express";
import { expressMiddleware } from "@as-integrations/express5";

import { WebSocketServer } from "ws";
import { config } from "dotenv";

import { setupContext } from "@graphql/context";
import setupApolloServer from "@graphql/setup-apollo-server";

config();

const app = express();
const httpServer = app.listen(3000);
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
					res.status(404).send("Not found");
				}
			} else {
				res.sendFile(resolve(__dirname, "public", splat));
			}
		});
	}

	app.listen(process.env.PORT || 4000, () => {
		if (process.env.NODE_ENV === "production") {
			console.log(
				`🚀 Frontend ready at http://localhost:${process.env.PORT || 4000}/`,
			);
		}
		console.log(
			`🚀 Apollo Server ready at http://localhost:${process.env.PORT || 4000}/api`,
		);
		console.log(
			`🚀 Subscriptions ready at ws://localhost:${process.env.PORT || 4000}/api/subscriptions`,
		);
	});
});
