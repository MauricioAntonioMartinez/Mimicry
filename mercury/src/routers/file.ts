import express, { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { wsServer } from "..";
import { FileEvents } from "../constants/Events";
import { Expiration } from "../constants/expiration";
import { removeFile } from "../helper/removeFile";
import { sendNotifications } from "../helper/sendNotification";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public`);
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${extension}`);
  },
});

var uploadStore = multer({ storage: storageImage });

export const fileRouter = express.Router();

// fileRouter.post(
//   "/upload-multipart",
//   upload.single("test"),
//   async (req: Request, res: Response) => {
//     console.log(req.file);
//     sendFile(req, "");
//     return res.status(200);
//   }
// );

fileRouter.post(
  "/upload-multipart",
  uploadStore.single("test"),
  async (req: Request, res: Response) => {
    console.log(req);
    const filename = req.file.path.split("/").pop() as string;
    await sendFile(req, filename);
    removeFile(filename, Expiration.standard);
    return res.status(200);
  }
);

const sendFile = async (req: Request, filename: string) => {
  const expirationDate = new Date().getTime() + Expiration.standard;
  req.user?.files.push({
    id: uuidv4(),
    type: req.file.mimetype,
    size: req.file.size,
    filename: req.file.filename,
    expiration: new Date(expirationDate),
  });
  wsServer.socket.to(req.room).emit(FileEvents.file, {
    filename,
    originalName: req.file.originalname,
    buffer: req.file.buffer,
    type: req.file.mimetype,
    size: req.file.size,
  });
  const socketId = req.body.socketId || req.params.socketId;
  await req.user?.save();
  await sendNotifications(
    {
      title: `New File available: ${req.file.originalname}`,
      body: "Someone sends you a file",
      data: { type: "file" },
    },
    req.user!.devices,
    socketId
  );
};
