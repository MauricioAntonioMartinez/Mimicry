import { Actions } from "../../lib/actions";
import { Device } from "../../lib/device";

export const newUser = (device: Device) => {
  return {
    type: Actions.NEW_JOIN,
    payload: device,
  };
};
