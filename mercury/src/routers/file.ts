import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { wsServer } from "..";
import { FileEvents } from "../constants/Events";
import { removeFile } from "../helper/removeFile";
import { sendNotifications } from "../helper/sendNotification";
import { SendFile } from "../models/File";

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public`);
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    cb(null, `${req.user!.id + "||" + Date.now()}.${extension}`);
  },
});

var uploadStore = multer({ storage: storageImage });

export const fileRouter = express.Router();

fileRouter.post(
  "/upload-multipart",
  uploadStore.single("test"),
  async (req: Request, res: Response) => {
    const filename = req.file.path.split("/").pop() as string;
    const file = req.user!.addFile({
      mimetype: req.file.mimetype,
      size: req.file.size,
      filename,
      name: req.file.originalname,
    });

    await req.user!.save();
    removeFile({
      filename,
      time: req.user!.expirationType,
      userId: req.user?.id,
      fileId: file!.id,
    });
    const hostId = (req.body.hostId || req.query.hostId) as string;

    const devices = req.user!.devices;
    wsServer.socket.to(req.room).emit(FileEvents.file, {
      id: file.id,
      filename: req.file.filename,
      expiration: file.expiration,
      hostId,
      originalName: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    } as SendFile);
    await sendNotifications(
      {
        title: `New File available: ${req.file.originalname}`,
        body: "Someone sends you a file",
        data: { type: "file" },
      },
      devices,
      hostId
    );
    return res.status(200).json({
      success: true,
      id: file.id,
      filename: req.file.filename,
      name: req.file.originalname,
    });
  }
);

fileRouter.get(
  "/files/:name",
  (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.name;
  }
);
