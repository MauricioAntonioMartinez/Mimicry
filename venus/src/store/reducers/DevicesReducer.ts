import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

const initialState: RootStore["device"] = {
  devices: [
    { id: "1", type: "web", version: "12", os: "Linux" },
    {
      id: "2",
      name: "MATRIX",
      host: "Morelia",
      type: "android",
      version: "12",
      os: "Android",
    },
    {
      id: "3",
      name: "G9Gmobile",
      host: "Yucatan",
      type: "ios",
      version: "10",
      os: "IOS",
    },
  ],
  qtyActive: 1,
};

export const devicesReducer = (
  state = initialState,
  action: Action
): RootStore["device"] => {
  switch (action.type) {
    case Actions.NEW_JOIN:
      return {
        devices: state.devices.concat(action.payload.device),
        qtyActive: state.qtyActive + 1,
      };
    default:
      return state;
  }
};
