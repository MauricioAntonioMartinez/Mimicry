import { wsServer } from "..";
import { DeviceAttrs } from "../models/Device";
import { User } from "../models/User";

export const joinRoomHandler = async (
  props: DeviceAttrs & { prevId: string },
  cb: any
) => {
  const username = wsServer.socket.handshake.auth.username;
  if (!username) return;
  const user = await User.findOne({ username });
  if (!user) return;

  user.filterFiles();
  const devices = user.filterDevices(props);
  await user.save();

  wsServer.socket.join(user.roomId);
  wsServer.socket.to(user.roomId).emit("set-devices", devices);

  cb(devices, wsServer.socket.id);
};

export const leaveRoomHandler = async (id: string) => {
  console.log(`Device leave with id :${wsServer.socket.id} prev: ${id}`);
  const username = wsServer.socket.handshake.auth.username;
  console.log(wsServer.socket);
  if (!username) return;
  const user = await User.findOne({ username });
  if (!user) return;
  user.devices = user.devices.filter((d) => d.socketId !== id);
  await user.save();
  // wsServer.socket.leave(user.roomId);
  wsServer.socket.to(user.roomId).emit(
    "set-devices",
    user.devices.map((d) => ({ id: d.socketId, ...d.device }))
  );
};
