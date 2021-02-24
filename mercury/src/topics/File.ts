import { wsServer } from "..";
import { removeFile } from "../helper/removeFile";

export class File {
  static readonly events = {
    downloaded: "downloaded",
  };
  static listen() {
    wsServer.socket.on(File.events.downloaded, (filename: string) =>
      removeFile(filename, 0)
    );
  }
}
