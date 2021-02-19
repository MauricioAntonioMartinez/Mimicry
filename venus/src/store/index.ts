import { Socket } from "socket.io-client";
import { Device } from "../lib/device";

export interface RootStore {
  socket: {
    socket?: Socket;
    connected: boolean;
  };
  device: {
    devices: Device[];
    qtyActive: number;
  };
  auth: {
    token?: string;
    user: { username: string; picture: string };
  };
}
