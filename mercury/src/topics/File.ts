import { wsServer } from "..";
import { FileEvents } from "../constants/Events";
import { SendFile } from "../models/File";

export class FileTopic {
  static readonly events = {
    downloaded: "downloaded",
  };
  static listen() {
    // wsServer.socket.on(File.events.downloaded, (filename: string) =>
    //   removeFile(filename, 0)
    // );
  }

  static async emitFile(file: SendFile, room: string) {
    wsServer.socket.to(room).emit(FileEvents.file, {
      file,
    });
  }
}
