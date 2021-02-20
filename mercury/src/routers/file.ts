import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { wsServer } from "..";
import User from "../models/User";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const fileRouter = express.Router();

fileRouter.post("/upload", (req: Request, res: Response) => {
  // console.log(req.file);
  const stream = fs.createWriteStream("./image" + Date.now() + ".png");
  req.pipe(stream);
  res.end("OK");

  // return res.status(200).json({
  //   success: true,
  // });
});

fileRouter.post(
  "/upload-multipart",
  upload.single("test"),
  async (req: Request, res: Response) => {
    const user = await User.findOne({ username: "mcuve" });
    if (!user) return res.status(400).json({ message: "user not found" });
    wsServer.socket.to(user.roomId).emit("file", req.file.buffer);
    res.status(200).json({ message: "Sheared" });
  }
);
