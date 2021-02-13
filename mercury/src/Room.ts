import { WebSocketServer } from "./Ws";

export class Room {
  constructor(private accountId: string) {
    this.accountId = accountId;
    this.createRoom();
  }

  private createRoom() {
    const socket = WebSocketServer.socket;
    if (!socket) return;
    socket.join(this.accountId);
    socket.emit("created", this.accountId);
  }

  static join(id: string) {
    WebSocketServer.socket?.join(id);
    WebSocketServer.socket?.to(id).emit("join");
  }

  static events() {
    const socket = WebSocketServer.socket;
    socket.on("create-room", () => new Room(socket.id));
    socket.on("join", (room: string) => {
      socket.join(room);
      socket.to(room).emit("phoneJoined");
    });

    socket.on("send", ({ room, data }: { room: string; data: any }) => {
      socket.to(room).emit("data", data);
    });

    socket.on("color", ({ room, color }: { room: string; color: string }) => {
      socket.to(room).emit("changeColor", color);
    });
  }
}
