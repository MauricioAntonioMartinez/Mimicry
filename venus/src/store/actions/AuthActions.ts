import { Actions } from "../../lib/actions";

export const serUser = (user: { username: string; picture: string }) => {
  return {
    type: Actions.SET_USER,
    user,
  };
};
