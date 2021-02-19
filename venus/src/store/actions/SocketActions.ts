import * as DeviceInfo from "expo-device";
import { Platform } from "react-native";
import { Socket } from "socket.io-client";
import { _web_ } from "../../constant/platform";
import { Actions } from "../../lib/actions";
import { Device } from "../../lib/device";
import { AppThunk } from "../../lib/reduxTypes";
import { SocketDispatcher } from "../../models/SocketDispatcher";

export const setSocket = (socket: Socket): AppThunk<Promise<any>> => {
  return async (dispatch) => {
    new SocketDispatcher(socket, dispatch).listen();
    const device: Device = {
      id: Platform.OS,
      os: DeviceInfo.osName as string,
      version: DeviceInfo.osVersion as string,
      type: Platform.OS,
    };
    if (!_web_) device["name"] = DeviceInfo.deviceName as string;

    socket.emit("join", device);
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
    socket.emit("join", deskId);
  };
};
