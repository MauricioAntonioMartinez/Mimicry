import * as DeviceInfo from "expo-device";
import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

DeviceInfo.osInternalBuildId;

const initialState: RootStore["device"] = {
  devices: [],
  qtyActive: 0,
};

export const devicesReducer = (
  state = initialState,
  action: Action
): RootStore["device"] => {
  switch (action.type) {
    case Actions.SET_DEVICES:
      return {
        devices: action.payload.devices,
        qtyActive: action.payload.devices.length,
      };
    case Actions.DISCONNECT_CLIENT:
      return {
        devices: state.devices.filter((d) => d.id !== action.payload.id),
        qtyActive: state.qtyActive - 1,
      };
    case Actions.CONNECT_CLIENT:
      return {
        devices: state.devices.concat(action.payload.device),
        qtyActive: state.qtyActive + 1,
      };

    default:
      return state;
  }
};
