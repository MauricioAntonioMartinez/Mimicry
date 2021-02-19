import { wsServer } from "..";
import { DeviceAttrs } from "../models/Device";

export const room = "user-room";

const devices: DeviceAttrs[] = [];

export const joinRoomHandler = (device: DeviceAttrs) => {
  wsServer.socket.join(room);
  wsServer.socket.emit("joined");
  console.log(devices);
  //   const isAlready = devices.find((d) => d.id === device.id);
  //   if (!isAlready) {
  //     console.log(isAlready);
  //     devices.push(device);
  wsServer.socket.to(room).emit("new-client", device);
  //   }
};
