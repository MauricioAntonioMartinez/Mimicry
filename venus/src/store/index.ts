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
    hostId: string;
  };
  auth: {
    token?: string;
    expiresIn?: number;
    refreshToken?: string;
    user: { username: string; picture: string };
    isAuthenticated: boolean;
  };
  file: {
    id: string;
    filename: string;
    type: string;
    serverFilename: string;
    buffer?: Buffer;
    size: number;
    expiration: Date;
    shouldPickName: boolean;
    files: File[];
  };
  clipBoard: {
    roomId?: string;
    clips: string[];
  };
  rooms: string[]; // #TODO pending implementation
}
