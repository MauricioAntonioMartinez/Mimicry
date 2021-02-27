import fs from "fs";
import { wsServer } from "..";
import { FileEvents } from "../constants/Events";
import { User } from "../models/user/User";

export const removeFile = ({
  filename,
  fileId,
  time,
  userId,
}: {
  filename: string;
  time: number;
  userId: string;
  fileId: string;
}) => {
  const timeout = setTimeout(remove, time);

  function remove() {
    return new Promise(async (res, rej) => {
      const user = await User.findById(userId);
      fs.rm(`${__dirname}/../public/${filename}`, (err) => {
        clearTimeout(timeout);
        if (err) rej(err);
        res(true);
      });
      if (!user) return;

      user.removeFile(fileId);
      await user.save();
      wsServer.socket.to(user.roomId).emit(FileEvents.remove_file, fileId);
    });
  }
};
