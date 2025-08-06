import { parse } from "node:url";
import path from "node:path";
import express from "express";
import { expressMiddleware } from "@as-integrations/express5";

import { WebSocketServer } from "ws";
import { setupContext } from "@graphql/context";
import setupApolloServer from "@graphql/setup-apollo-server";

require("dotenv").config();

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
		app.use(express.static(path.join(__dirname, "public")));
		app.use("/{*splat}", (req, res) => {
			res.sendFile(path.join(__dirname, "public", "index.html"));
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
