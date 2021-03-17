import { wsServer } from "..";
import { User } from "../models/user/User";

export const joinRoomHandler = async () => {
  const user = await checkUser();
  if (!user) return;
  wsServer.socket.join(user.roomId);
};

export const leaveRoomHandler = async (id: string) => {
  const user = await checkUser();
  if (!user) return;

  user.devices = user.devices.filter((d) => d.id !== id);
  await user.save();

  wsServer.socket.to(user.roomId).emit("set-devices", user.devices);
};

export const checkUser = async () => {
  const username = wsServer.socket?.handshake.auth.username;
  if (!username) return;
  const user = await User.findOne({ username });
  if (!user) return;
  return user;
};

export const syncHandler = async (_: any, cb: any) => {
  const user = await checkUser();
  console.log("REJOIN", user?.roomId);
  wsServer.socket.join(user?.roomId);
  cb({ devices: user?.devices, files: user?.files });
};
