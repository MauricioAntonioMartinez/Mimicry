export enum Actions {
  SET_SOCKET = "SET_SOCKET",
  ACK = "ACK",
  CONNECTED_DESKTOP = "CONNECTED_DESKTOP",
}

export interface Action {
  type: Actions;
  payload: any;
}
