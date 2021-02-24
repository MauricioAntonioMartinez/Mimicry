import express, { Request, Response } from "express";
import multer from "multer";
import { wsServer } from "..";
import { FileEvents } from "../constants/Events";
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
    sendFile(req, filename);
    removeFile(filename, 60000 * 60);
    return res.status(200);
  }
);

const sendFile = (req: Request, filename: string) => {
  wsServer.socket.to(req.room).emit(FileEvents.file, {
    filename,
    originalName: req.file.originalname,
    buffer: req.file.buffer,
  });
  console.log(req.query);
  const socketId = req.body.socketId || req.params.socketId;
  sendNotifications(
    {
      title: `New File available: ${req.file.originalname}`,
      body: "Someone sends you a file",
      data: { type: "file" },
    },
    req.user!.devices,
    socketId
  );
};
