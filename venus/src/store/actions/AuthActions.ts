import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as DeviceInfo from "expo-device";
import { Platform } from "react-native";
import { API } from "../../constant/api";
import { getToken } from "../../healpers/getToken";
import { Actions } from "../../lib/actions";
import { AppThunk } from "../../lib/reduxTypes";

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

export const setUser = (): AppThunk<Promise<any>> => {
  return async (dispatch, getStore) => {
    const store = getStore();
    try {
      const prevId = await AsyncStorage.getItem("id");
      const token = await getToken();
      const { data } = await axios.post(`${API}/users/login`, {
        username: "mcuve",
        prevId,
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
        },
      });

      dispatch({
        type: Actions.SET_FILES,
        payload: {
          devices: data.files,
        },
      });

      await AsyncStorage.setItem("id", data.id);
    } catch (e) {
      console.log(e.message);
      throw new Error("Cannot find a user with that token sorry fella.");
    }
  };
};
