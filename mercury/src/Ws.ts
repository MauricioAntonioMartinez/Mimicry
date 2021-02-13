import { Server } from "socket.io";
import { Room } from "./Room";

export class WebSocketServer {
  static socket: any;
  static initialized: boolean;

  public static setServer(server: Server) {
    if (!WebSocketServer.initialized) {
      const ws = new WebSocketServer();
      WebSocketServer.initialized = true;
      ws.initialize(server, ws);
    }
    return;
  }

  constructor() {}

  private initialize(server: Server, ins: WebSocketServer) {
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
