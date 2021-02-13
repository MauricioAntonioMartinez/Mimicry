import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { WebSocketServer } from "./Ws";

const app = express();

app.use(cors());

const server = http.createServer(app);

const ws = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("This api is to share data between your phone and computer");
});

server.listen(3000, () => {
  WebSocketServer.setServer(ws);
  console.log("Listening on ws://localhost:3000");
});
