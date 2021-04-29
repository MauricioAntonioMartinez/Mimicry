import cors from "cors";
import express from "express";
import "express-async-errors";
import http from "http";
import { Server } from "socket.io";
import { connectDatabase } from "./db/connectToDatabase";
import { checkJwt } from "./middlewares/currentUser";
import { errorHandler } from "./middlewares/errorHanlder";
import { User } from "./models/user/User";
import { fileRouter } from "./routers/file";
import { roomRouter } from "./routers/room";
import { userRouter } from "./routers/user";
import { WebSocketServer } from "./Ws";

main();
export let wsServer: WebSocketServer;

async function main() {
  await connectDatabase();
  const app = express();
  app.use(cors());
  const server = http.createServer(app);
  const ws = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.use(express.json());

  app.get("/", (req, res) => {
    return res
      .status(200)
      .send("This api is to share data between your phone and computer");
  });

  app.use(express.static(__dirname + "/public"));

  wsServer = new WebSocketServer(ws);

  app.use(userRouter);
  app.use(roomRouter);
  app.use(checkJwt);
  // ws.use(currentUser);
  app.use(fileRouter);

  app.use(errorHandler);

  server.listen(process.env.PORT, async () => {
    console.log("Listening on ws://localhost:4000");
    await User.updateMany({}, { devices: [] });
  });
}
