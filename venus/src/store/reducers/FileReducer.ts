import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

const initialState: RootStore["file"] = {
  shouldPickName: false,
};

export const fileReducer = (
  state = initialState,
  action: Action
): RootStore["file"] => {
  switch (action.type) {
    case Actions.SET_FILE:
      return {
        filename: action.payload.filename,
        url: action.payload.url,
        serverFilename: action.payload.serverFileName,
        shouldPickName: true,
      };
    case Actions.RESET_FILE:
      return initialState;
    default:
      return state;
  }
};
