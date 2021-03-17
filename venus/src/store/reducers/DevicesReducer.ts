import * as DeviceInfo from "expo-device";
import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

DeviceInfo.osInternalBuildId;

const initialState: RootStore["device"] = {
  devices: [],
  qtyActive: 0,
  hostId: "",
};

export const devicesReducer = (
  state = initialState,
  action: Action
): RootStore["device"] => {
  switch (action.type) {
    case Actions.SET_HOST:
      return {
        ...state,
        hostId: action.payload.hostId,
      };
    case Actions.SET_DEVICES:
      return {
        ...state,
        devices: action.payload.devices,
        qtyActive: action.payload.devices.length,
      };
    case Actions.DISCONNECT_CLIENT:
      return {
        hostId: "",
        devices: state.devices.filter((d) => d.id !== action.payload.id),
        qtyActive: state.qtyActive - 1,
      };
    case Actions.CONNECT_CLIENT:
      return {
        ...state,
        devices: state.devices.concat(action.payload.device),
        qtyActive: state.qtyActive + 1,
      };

    case Actions.DEVICE_LEAVE:
      return {
        ...state,
        devices: state.devices.filter((d) => d.id !== action.payload.id),
        qtyActive: state.qtyActive - 1,
      };
    case Actions.SYNC:
      return {
        ...state,
        devices: action.payload.devices,
      };

    default:
      return state;
  }
};
