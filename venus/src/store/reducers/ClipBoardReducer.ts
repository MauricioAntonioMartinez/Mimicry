import { RootStore } from "..";
import { Action, Actions } from "../../lib/actions";

const initialState: RootStore["clipBoard"] = {
  clips: [],
  roomId: "",
};

export const clipBoardReducer = (
  state = initialState,
  action: Action
): RootStore["clipBoard"] => {
  switch (action.type) {
    case Actions.SET_CLIP:
      return {
        ...state,
        clips: state.clips.concat(action.payload.clip),
      };

    case Actions.SET_CLIPS:
      return {
        ...state,
        clips: action.payload.clips,
      };
    case Actions.SET_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
      };
    default:
      return state;
  }
};
