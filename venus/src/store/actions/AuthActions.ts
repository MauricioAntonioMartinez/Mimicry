import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as DeviceInfo from "expo-device";
import { Platform } from "react-native";
import { io } from "socket.io-client";
import { API } from "../../constant/api";
import { getToken } from "../../healpers/getToken";
import { Actions } from "../../lib/actions";
import { Device } from "../../lib/device";
import { AppThunk } from "../../lib/reduxTypes";
import { File } from "../../models/File";
import * as socketActions from "./SocketActions";
const ENDPOINT = "ws://192.168.1.19:4000";
export const setCredentials = (credentials: {
  token: string;
  expiresIn: number;
  refreshToken: string;
}) => {
  return {
    type: Actions.SET_AUTH,
    payload: credentials,
  };
};

// TODO: implement as we have the authentication done
// TODO: Download multiple times the same file, and fix style of the doc item
// TODO: show the image if the type set, check this as well

export const setUser = (): AppThunk<Promise<any>> => {
  return async (dispatch) => {
    try {
      // TODO: in a future you will have a token set in the hostId
      const hostId = await AsyncStorage.getItem("hostId");
      const token = await getToken();

      const socket = io(ENDPOINT, {
        autoConnect: true,
        auth: { token, username: "mcuve", hostId },
      });

      dispatch(socketActions.setSocket(socket));

      const { data } = await axios.post(`${API}/users/initialize`, {
        id: hostId,
        username: "mcuve",
        name: DeviceInfo.deviceName,
        os: DeviceInfo.osName,
        version: DeviceInfo.osVersion,
        type: Platform.OS,
        pushToken: token,
      });

      dispatch({
        type: Actions.SET_USER,
        payload: {
          user: data.user,
        },
      });

      dispatch({
        type: Actions.SET_DEVICES,
        payload: {
          devices: data.devices,
          hostId: data.hostId,
        },
      });

      dispatch({
        type: Actions.SET_HOST,
        payload: {
          hostId: data.hostId,
        },
      });

      dispatch({
        type: Actions.SET_FILES,
        payload: {
          devices: data.files,
        },
      });
      await AsyncStorage.setItem("hostId", data.hostId);
    } catch (e) {
      console.log(e.message);
      throw new Error("Cannot find a user with that token sorry fella.");
    }
  };
};

export const syncApp = (): AppThunk<any> => {
  return async (dispatch, getStore) => {
    const socket = getStore().socket.socket;

    if (!socket) return;
    socket.emit(
      "sync",
      null,
      (payload: { devices: Device[]; files: File[] }) => {
        dispatch({
          type: Actions.SYNC,
          payload,
        });
      }
    );
  };
};

export const loginUser = (payload: {
  username: string;
  password: string;
}): AppThunk => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API}/users/login`, payload);

      return dispatch({
        type: Actions.SET_AUTH,
        payload: {
          user: data.user,
          token: data.token,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };
};
