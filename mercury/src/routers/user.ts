import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user/User";

export const userRouter = Router();

userRouter.post("/users", async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await User.build({
    name: payload.name,
    username: payload.username,
    roomId: uuidv4(), //this is a test
  }).save();
  console.log(user);

  return res.status(200).json({ success: true, user });
});

userRouter.post("/users/login", async (req: Request, res: Response) => {
  const username = req.body.username;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Cannot find user" });

  return res.status(200).json({ user });
});
