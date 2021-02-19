import download from "downloadjs";
import { Alert } from "react-native";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Socket } from "socket.io-client";
import { _web_ } from "../constant/platform";
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
    this.socket.on("joined", () => {
      Alert.alert("Connection Stablish");
      this.dispatch({
        type: Actions.CONNECTED_DESKTOP,
        payload: {
          success: true,
        },
      });
    });
    this.socket.on("new-client", (device: Device) => {
      console.log(device);
      this.dispatch({
        type: Actions.NEW_JOIN,
        payload: {
          device,
        },
      });
    });

    this.socket.on("file", (file: Buffer) => {
      console.log(file);
      if (_web_) {
        const byteArray = new Uint8Array(file);
        download(byteArray, "image.jpg", "image/jpg");
      }
    });
    // this.socket.on("disconnect", () => {
    //   console.log("Client Disconnected");
    //   this.socket.open();
    // });
  }
}
