import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";
import { File } from "../../models/File";

const initialState: RootStore["file"] = {
  filename: "",
  id: "",
  serverFilename: "",
  size: 0,
  type: "",
  url: "",
  shouldPickName: false,
  files: [
    new File({
      id: "1",
      name: "test.png",
      filename: "test",
      type: "image",
      size: 100,
    }),
    new File({
      id: "2",
      name: "test.png",
      filename: "test",
      type: "image",
      size: 100,
    }),
    new File({
      id: "3",
      name: "test.png",
      filename: "test",
      type: "image",
      size: 100,
    }),
    new File({
      id: "4",
      name: "test.png",
      filename: "test",
      type: "image",
      size: 100,
    }),
    new File({
      id: "5",
      name: "test.png",
      filename: "test",
      type: "image",
      size: 100,
    }),
  ],
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
        url: action.payload.url,
        serverFilename: action.payload.serverFileName,
        shouldPickName: true,
        size: action.payload.size,
        id: action.payload.id,
      };
    case Actions.ADD_FILE:
      return {
        ...state,
        files: state.files.concat(action.payload.file),
      };
    case Actions.RESET_FILE:
      return initialState;
    default:
      return state;
  }
};
