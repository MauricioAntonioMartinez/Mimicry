import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export const currentUser = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  // console.log("Middleware for auth:", socket.handshake.auth.token);
  next();
};
