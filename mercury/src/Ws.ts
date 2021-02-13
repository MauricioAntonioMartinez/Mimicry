import { Server } from "socket.io";
import { Room } from "./Room";

export class WebSocketServer {
  static socket: any;
  static initialized: boolean;

  static setServer(server: Server) {
    if (!WebSocketServer.initialized) {
      const ws = new WebSocketServer();
      WebSocketServer.initialized = true;
      ws.initialize(server);
    }
    return;
  }

  constructor() {}

  private initialize(server: Server) {
    server.on("connection", (socket) => {
      WebSocketServer.socket = socket;

      console.log(`New client connected id: ${socket.id}`);
      Room.events();
      socket.on("disconnect", () =>
        console.log(`Client ${socket.id} disconnected`)
      );
    });
  }
}