import download from "downloadjs";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Socket } from "socket.io-client";
import { Actions } from "../lib/actions";
import { Device } from "../lib/device";
import { RootStore } from "../store";
export class SocketDispatcher {
  constructor(
    private socket: Socket,
    private dispatch: ThunkDispatch<RootStore, unknown, Action<string>>
  ) {
    this.socket = socket;
  }
  listen() {
    this.socket.on("connect-client", (device: Device) => {
      this.dispatch({
        type: Actions.CONNECT_CLIENT,
        payload: {
          device,
        },
      });
    });

    this.socket.on("set-devices", (devices: Device[]) => {
      this.dispatch({
        type: Actions.SET_DEVICES,
        payload: {
          devices,
        },
      });
    });

    // this.socket.on("disconnect", async () => {
    //   this.socket.emit("leave");
    // });

    this.socket.on("file", (file: Buffer) => {
      console.log(file);
      // if (_web_) {
      const byteArray = new Uint8Array(file);
      download(byteArray, "image.jpg", "image/jpg");
      // }
    });
  }
}
