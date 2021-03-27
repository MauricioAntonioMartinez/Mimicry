import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";
import { File } from "../../models/File";

const initialState: RootStore["file"] = {
  filename: "",
  id: "",
  serverFilename: "",
  size: 0,
  type: "",
  shouldPickName: false,
  files: [],
  expiration: new Date(),
};

export const fileReducer = (
  state = initialState,
  action: Action
): RootStore["file"] => {
  switch (action.type) {
    case Actions.SET_FILE:
      return {
        ...state,
        filename: action.payload.filename,
        serverFilename: action.payload.serverFileName,
        shouldPickName: true,
        size: action.payload.size,
        id: action.payload.id,
        expiration: action.payload.expiration,
      };
    case Actions.ADD_FILE:
      return {
        ...state,
        files: state.files.concat(action.payload.file),
      };
    case Actions.SYNC:
      return {
        ...state,
        files: action.payload.files.map((f: any) => new File(f)),
      };
    case Actions.RESET_FILE:
      return { ...initialState, files: state.files };
    default:
      return state;
  }
};
