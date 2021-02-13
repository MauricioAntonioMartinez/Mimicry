import { Socket } from "socket.io-client";

export interface RootStore {
  socket: {
    socket?: Socket;
    connected: boolean;
  };
}
