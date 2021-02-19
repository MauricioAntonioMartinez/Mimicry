import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import { wsServer } from "..";
import { room } from "../handlers/roomHandler";

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
  (req: Request, res: Response) => {
    console.log("Triggered");
    wsServer.socket.to(room).emit("file", req.file.buffer);
    res.end("OK");
  }
);
