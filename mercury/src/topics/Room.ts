import {
  joinRoomHandler,
  leaveRoomHandler,
  syncHandler,
} from "../handlers/roomHandler";
import { wsServer } from "../index";

export default class Room {
  static readonly events = {
    join: "join",
    leave: "leave",
    sync: "sync",
  };
  static listen() {
    const socket = wsServer.socket;
    socket.on(Room.events.sync, syncHandler);
    socket.on(Room.events.join, joinRoomHandler);
    socket.on(Room.events.leave, leaveRoomHandler);
  }
}
