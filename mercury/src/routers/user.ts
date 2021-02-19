import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";

export const userRouter = Router();

userRouter.post("/users", async (req: Request, res: Response) => {
  const { name, username } = req.body;

  const user = await User.build({
    name,
    username,
    roomId: uuidv4(),
  }).save();

  return res.status(200).json({ success: true, user });
});
