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
    expiresIn?: number;
    refreshToken?: string;
    user: { username: string; picture: string };
  };
  file: {
    filename?: string;
    serverFilename?: string;
    buffer?: Buffer;
    url?: string;
    shouldPickName: boolean;
  };
}
