import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { User, UserDoc } from "../models/user/User";

declare global {
  namespace Express {
    interface Request {
      user: UserDoc | null;
      room: string;
    }
  }
}

export const currentUser = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  // console.log("Middleware for auth:", socket.handshake.auth.token);
  next();
};

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  // if (!bearer) throw new Error("Authorization required");
  // const token = bearer.split(" ").pop();
  console.log(`Dummy token ${bearer}`);
  const user = await User.findOne({ username: "mcuve" });
  if (!user) throw new Error("Not user was found");

  req.user = user;
  req.room = user.roomId;

  next();
};
