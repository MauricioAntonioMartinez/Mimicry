import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

const initialState: RootStore["auth"] = {
  user: {
    picture: "",
    username: "",
  },
  token: "xxxxx",
};

export const devicesReducer = (
  state = initialState,
  action: Action
): RootStore["auth"] => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        token: action.payload.token,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
