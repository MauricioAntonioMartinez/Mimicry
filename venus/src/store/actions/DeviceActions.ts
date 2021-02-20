import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DeviceInfo from "expo-device";
import { Platform } from "react-native";
import { Actions } from "../../lib/actions";
import { Device } from "../../lib/device";
import { AppThunk } from "../../lib/reduxTypes";

export const setDevices = (): AppThunk<Promise<any>> => {
  return async (dispatch, getStore) => {
    const socket = getStore().socket.socket;
    if (!socket) return;
    const device: any = {
      name: DeviceInfo.deviceName,
      os: DeviceInfo.osName,
      version: DeviceInfo.osVersion,
      type: Platform.OS,
    };
    const prevId = await AsyncStorage.getItem("id");
    if (prevId) device["prevId"] = prevId;
    socket.emit("join", device, async (devices: Device[], id: string) => {
      await AsyncStorage.setItem("id", id);
      dispatch({
        type: Actions.SET_DEVICES,
        payload: {
          devices,
        },
      });
    });
  };
};
