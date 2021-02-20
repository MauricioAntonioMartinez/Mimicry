import { wsServer } from "..";
import { DeviceAttrs } from "../models/Device";
import User from "../models/User";

export const joinRoomHandler = async (
  { prevId, ...device }: DeviceAttrs & { prevId: string },
  cb: any
) => {
  const username = wsServer.socket.handshake.auth.username;
  if (!username) return;
  const user = await User.findOne({ username });
  if (!user) return;

  user.devices = user.devices.filter((d) => d.socketId !== prevId);

  user.devices.push({
    socketId: wsServer.socket.id,
    device,
  });
  await user.save();

  const devices = user.devices.map((d) => ({ id: d.socketId, ...d.device }));

  wsServer.socket.join(user.roomId);
  wsServer.socket.to(user.roomId).emit("set-devices", devices);

  cb(devices, wsServer.socket.id);
};

export const leaveRoomHandler = async (id: string) => {
  console.log(`Device leave with id :${wsServer.socket.id} prev: ${id}`);
  const username = wsServer.socket.handshake.auth.username;
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
