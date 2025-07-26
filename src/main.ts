import http from "node:http";
import { URL } from "node:url";
import path from "node:path";

import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import { app, BrowserWindow } from "electron";
import express from "express";
import { WebSocketServer } from "ws";

import { setupContext } from "graphql/context";
import setupApolloServer from "graphql/setup-apollo-server";

async function createServer() {
	const app = express();
	const server = http.createServer(app);
	const wss = new WebSocketServer({ server });

	server.on("upgrade", (request, socket, head) => {
		if (request.url === "/api/subscriptions") {
			wss.handleUpgrade(request, socket, head, (ws) => {
				wss.emit("connection", ws, request);
			});
		} else {
			socket.destroy();
		}
	});

	const coreContext = setupContext();
	const baseApolloServer = setupApolloServer(server, wss, coreContext);
	await baseApolloServer.start();

	app.use(
		"/api/graphql",
		bodyParser.json(),
		expressMiddleware(baseApolloServer),
	);

	return server;
}

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
	});

	win.loadURL(
		URL.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file:",
			slashes: true,
		}),
	);
}

app.on("ready", () => {
	createWindow();
	createServer().then((server) => {
		server.listen(3000, () => {
			console.log("Server is listening on port 3000");
		});
	});
});
