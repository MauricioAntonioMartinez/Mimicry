import axios from "axios";
import { Actions } from "../../lib/actions";
import { AppThunk } from "../../lib/reduxTypes";

export const setCredentials = (credentials: {
  token: string;
  expiresIn: number;
  refreshToken: string;
}) => {
  return {
    type: Actions.SET_AUTH,
    payload: credentials,
  };
};

export const setUser = (): AppThunk<Promise<any>> => {
  return async (dispatch, getStore) => {
    const store = getStore();
    try {
      const res = await axios.post(
        "http://192.168.1.19:4000/users/login",
        {
          username: "mcuve",
        },
        {
          headers: {
            Authorization: `Bearer ${store.auth?.token}`,
          },
        }
      );
      return dispatch({
        type: Actions.SET_USER,
        payload: {
          user: res.data.user,
        },
      });
    } catch (e) {
      console.log(e.message);
      throw new Error("Cannot find a user with that token sorry fella.");
    }
  };
};
