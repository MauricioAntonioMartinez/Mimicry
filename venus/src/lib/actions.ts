export enum Actions {
  SET_SOCKET = "SET_SOCKET",
  CONNECTED = "CONNECTED",
  DISCONNECT = "DISCONNECT",
  SET_DEVICES = "SET_DEVICES",
  DISCONNECT_CLIENT = "DISCONNECT_CLIENT",
  CONNECT_CLIENT = "CONNECT_CLIENT",
  SET_AUTH = "SET_AUTH",
  SET_USER = "SET_USER",
  SET_FILE = "SET_FILE",
  ADD_FILE = "ADD_FILE",
  SAVE_FILE = "SAVE_FILE",
  RESET_FILE = "RESET_FILE",
}

export interface Action {
  type: Actions;
  payload: any;
}
