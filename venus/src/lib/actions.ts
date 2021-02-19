export enum Actions {
  SET_SOCKET = "SET_SOCKET",
  ACK = "ACK",
  CONNECTED_DESKTOP = "CONNECTED_DESKTOP",
  NEW_JOIN = "NEW_JOIN",
  SET_USER = "SET_USER",
}

export interface Action {
  type: Actions;
  payload: any;
}
