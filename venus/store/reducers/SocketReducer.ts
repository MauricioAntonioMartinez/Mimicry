import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

const initialState: RootStore["socket"] = {
  socket: undefined,
  connected: false,
};

export const socketReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case Actions.SET_SOCKET:
      return {
        socket: action.payload.socket,
      };
    case Actions.CONNECTED_DESKTOP:
      return {
        ...state,
        connected: true,
      };
    default:
      return state;
  }
};
