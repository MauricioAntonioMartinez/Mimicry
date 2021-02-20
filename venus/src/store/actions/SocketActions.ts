import AsyncStorage from "@react-native-async-storage/async-storage";
import { Socket } from "socket.io-client";
import { Actions } from "../../lib/actions";
import { AppThunk } from "../../lib/reduxTypes";
import { SocketDispatcher } from "../../models/SocketDispatcher";

export const setSocket = (socket: Socket): AppThunk<any> => {
  return (dispatch, getStore) => {
    const store = getStore();
    if (!store.socket.socket) new SocketDispatcher(socket, dispatch).listen();
    dispatch({
      type: Actions.SET_SOCKET,
      payload: {
        socket,
      },
    });
  };
};

export const leaveSocket = (): AppThunk<any> => {
  return async (dispatch, getStore) => {
    const socket = getStore().socket.socket;
    if (!socket) return;
    const id = await AsyncStorage.getItem("id");
    socket.emit("leave", id);
    dispatch({
      type: Actions.SET_DEVICES,
      payload: {
        devices: [],
      },
    });
    dispatch({
      type: Actions.DISCONNECT,
    });
  };
};
