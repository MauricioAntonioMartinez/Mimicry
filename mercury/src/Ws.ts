import { Server } from "socket.io";
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
      console.log(`Connected ${socket.id}`);
      this._socket = socket;
      Room.listen();
      socket.on(this.events.disconnect, this.onDisconnect.bind(this));
    });
  }

  private onDisconnect() {
    console.log(`Disconnect ${this._socket.id}`);
  }
}
