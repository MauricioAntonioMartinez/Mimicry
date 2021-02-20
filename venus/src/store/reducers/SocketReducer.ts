import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

const initialState: RootStore["socket"] = {
  socket: undefined,
  connected: false,
};

export const socketReducer = (
  state = initialState,
  action: Action
): RootStore["socket"] => {
  switch (action.type) {
    case Actions.SET_SOCKET:
      return {
        connected: true,
        socket: action.payload.socket,
      };
    case Actions.CONNECTED:
      return {
        ...state,
        connected: true,
      };
    case Actions.DISCONNECT:
      return {
        ...state,
        connected: false,
      };
    default:
      return state;
  }
};
