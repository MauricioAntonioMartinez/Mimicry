import { Socket } from "socket.io-client";
import { Device } from "../lib/device";
import { File } from "../models/File";

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
    id: string;
    filename: string;
    type: string;
    serverFilename: string;
    buffer?: Buffer;
    url: string;
    size: number;
    shouldPickName: boolean;
    files: File[];
  };
}
