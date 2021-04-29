import { Actions } from "../../lib/actions";
import { AppThunk } from "../../lib/reduxTypes";

export const sendClipBoard = (
  clip: string,
  roomId?: string
): AppThunk<Promise<any>> => {
  return async (dispatch, getStore) => {
    const { socket: socketState } = getStore();

    socketState.socket?.emit(
      "send-clipboard",
      { roomId, clip },
      (success: boolean) => {
        if (!success) return;
        console.log("SUCESS");
        dispatch({
          type: Actions.SET_CLIP,
          payload: {
            clip,
          },
        });
      }
    );
  };
};
