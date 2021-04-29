import { Server } from "socket.io";
import { checkUser } from "./handlers/roomHandler";
import { ClipBoardTopic } from "./topics/ClipBoard";
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
      this._socket = socket;
      Room.listen();
      FileTopic.listen();
      ClipBoardTopic.listen();
      socket.on("disconnect", this.onDisconnect.bind(this));
    });
  }

  private async onDisconnect() {
    const user = await checkUser();
    if (!user) return;
    const id = this._socket?.handshake.auth.hostId;
    this.server.to(user.roomId).emit("device-leave", id);
  }
}
