import { Socket } from "socket.io-client";
import { Actions } from "../../lib/actions";
import { AppThunk } from "../../lib/reduxTypes";
import { SocketDispatcher } from "../../models/SocketDispatcher";

export const setSocket = (socket: Socket): AppThunk<Promise<any>> => {
  return async (dispatch) => {
    new SocketDispatcher(socket, dispatch).listen();
    dispatch({
      type: Actions.SET_SOCKET,
      payload: {
        socket,
      },
    });
  };
};

export const connectToDesktop = (deskId: string): AppThunk<any> => {
  return (_, getState) => {
    const state = getState();
    const socket = state.socket.socket;
    if (!socket) return;
    console.log("emited");
    socket.emit("join", deskId);
  };
};
