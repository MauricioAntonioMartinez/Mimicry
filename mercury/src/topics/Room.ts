import { joinRoomHandler, leaveRoomHandler } from "../handlers/roomHandler";
import { wsServer } from "../index";

export default class Room {
  static readonly events = {
    join: "join",
    leave: "leave",
  };
  static listen() {
    const socket = wsServer.socket;

    socket.on(Room.events.join, joinRoomHandler);
    socket.on(Room.events.leave, leaveRoomHandler);

    socket.on("send", ({ room, data }: { room: string; data: any }) => {
      socket.to(room).emit("data", data);
    });

    socket.on("color", ({ room, color }: { room: string; color: string }) => {
      socket.to(room).emit("changeColor", color);
    });
  }
}
