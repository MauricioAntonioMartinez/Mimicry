import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Socket } from "socket.io-client";
import { Actions } from "../lib/actions";
import { Device } from "../lib/device";
import { RootStore } from "../store";
import * as fileActions from "../store/actions/FileActions";
import { ReceivedFile } from "./File";

export class SocketDispatcher {
  constructor(
    private socket: Socket,
    private dispatch: ThunkDispatch<RootStore, unknown, Action<string>>
  ) {
    this.socket = socket;
    socket.emit("join");
  }
  listen() {
    this.socket.on("connect-client", (device: Device) =>
      this.dispatch({
        type: Actions.CONNECT_CLIENT,
        payload: {
          device,
        },
      })
    );

    this.socket.on("set-devices", (payload: { devices: Device[] }) => {
      this.dispatch({
        type: Actions.SET_DEVICES,
        payload,
      });
    });

    this.socket.on("device-leave", (id: string) => {
      console.log("User leave", id);
      this.dispatch({
        type: Actions.DEVICE_LEAVE,
        payload: { id },
      });
    });

    // this.socket.on("set-files", (devices: Device[]) => {
    //   this.dispatch({
    //     type: Actions.SET_FILES,
    //     payload: {
    //       devices,
    //     },
    //   });
    // });

    this.socket.on("file", async (file: ReceivedFile) =>
      this.dispatch(fileActions.setFile(file))
    );

    this.socket.on("new-clipboard", async (clip: string) =>
      this.dispatch({
        type: Actions.SET_CLIP,
        payload: {
          clip,
        },
      })
    );

    this.socket.on("remove-file", (id: string) =>
      this.dispatch({
        type: Actions.REMOVE_FILE,
        payload: {
          id,
        },
      })
    );
  }
}
