import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { wsServer } from "..";
import { User } from "../models/user/User";

export const userRouter = Router();

userRouter.post("/users", async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await User.build({
    name: payload.name,
    username: payload.username,
    roomId: uuidv4(), //this is a test
  }).save();

  return res.status(200).json({ success: true, user });
});

userRouter.post(
  "/users/login",
  [body("username").isEmpty(), body("password").isEmpty()],
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const user = await User.findOne({ username: "mcuve" });
    return res.status(200).json({ user, token: "abc" });
  }
);

userRouter.post(
  "/users/initialize",
  [
    body("id").optional({ nullable: true }),
    body("name").isString().isEmpty(),
    body("type").isIn(["ios", "android", "windows", "macos", "web"]),
    body("os").isString(),
    body("version").isString(),
    body("pushToken").optional({ nullable: true }),
  ],
  async (req: Request, res: Response) => {
    const username = req.body.username;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "Cannot find user" });

    const { hostId, devices } = user.filterDevices(req.body);
    user.filterFiles();
    await user.save();
    console.log("MY DEVICES", devices);

    wsServer.socket.to(user.roomId).emit("set-devices", { devices });

    return res.status(200).json({ user, hostId, devices, files: user.files });
  }
);
