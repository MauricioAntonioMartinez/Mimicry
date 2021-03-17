import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

const initialState: RootStore["auth"] = {
  user: {
    picture: "",
    username: "mcuve",
  },
  token: "mcuve",
  isAuthenticated: false,
};

export const authReducer = (
  state = initialState,
  action: Action
): RootStore["auth"] => {
  switch (action.type) {
    case Actions.SET_AUTH:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
