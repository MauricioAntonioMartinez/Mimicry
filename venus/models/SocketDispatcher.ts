import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Socket } from "socket.io-client";
import { Actions } from "../lib/actions";
import { RootStore } from "../store";

export class SocketDispatcher {
  constructor(
    private socket: Socket,
    private dispatch: ThunkDispatch<RootStore, unknown, Action<string>>
  ) {
    this.socket = socket;
  }
  listen() {
    this.socket.on("connection-stablish", () => {
      this.dispatch({
        type: Actions.CONNECTED_DESKTOP,
        payload: {
          success: true,
        },
      });
    });
  }
}
