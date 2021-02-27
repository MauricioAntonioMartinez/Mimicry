import { Server } from "socket.io";
import { FileTopic } from "./topics/File";
import Room from "./topics/Room";

export class WebSocketServer {
  private _socket: any;
  private events = {
    connect: "connect",
    disconnect: "disconnect",
  };

  get socket() {
    return this._socket;
  }

  constructor(private server: Server) {
    this.server = server;
    this.initialize();
  }

  private initialize() {
    this.server.on(this.events.connect, (socket) => {
      console.log(`Push Token: ${socket.handshake.auth.token}`);
      this._socket = socket;
      Room.listen();
      FileTopic.listen();
      socket.on("disconnect", this.onDisconnect.bind(this));
    });
  }

  private async onDisconnect() {
    // await leaveRoomHandler();
  }
}
