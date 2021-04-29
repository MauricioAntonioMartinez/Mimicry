import { wsServer } from "..";
import { checkUser } from "../handlers/roomHandler";
import { Room } from "../models/room/model";

export class ClipBoardTopic {
  static readonly events = {
    send: "send-clipboard",
  };

  static listen() {
    wsServer.socket.on(
      ClipBoardTopic.events.send,
      async (
        { clip, roomId }: { clip: string; roomId?: string },
        cb: (success: boolean) => void
      ) => {
        const user = await checkUser();

        if (!user) return cb(false);

        let sendTo = user.roomId;
        if (roomId) {
          const room = await Room.findById(roomId);
          if (!room) return cb(false);
          const usr = room.users.find((us) => us === user._id);
          if (!usr) return cb(false);
          sendTo = roomId;
        }

        cb(true);
        wsServer.socket.to(sendTo).emit("new-clipboard", clip);
      }
    );
  }
}
