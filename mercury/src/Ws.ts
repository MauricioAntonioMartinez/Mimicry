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
      // console.log(`Connected ${socket.id}`);
      this._socket = socket;

      // this.server.of("/").adapter.on("create-room", (room) => {
      //   console.log(`ROOM CREATED ${room} `);
      // });
      // this.server.of("/").adapter.on("join-room", (room, id) => {
      //   console.log(`New Join ${room} id:${id}`);
      // });

      // this.server.of("/").adapter.on("leave-room", (room, id) => {
      //   console.log(`Leave Room ${room} id:${id}`);
      // });
      Room.listen();
      socket.on("disconnect", this.onDisconnect.bind(this));
    });
  }

  private async onDisconnect() {
    // await leaveRoomHandler();
  }
}
