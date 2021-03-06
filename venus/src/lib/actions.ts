export enum Actions {
  SET_SOCKET = "SET_SOCKET",
  SET_HOST = "SET_HOST",
  CONNECTED = "CONNECTED",
  DISCONNECT = "DISCONNECT",
  SET_DEVICES = "SET_DEVICES",
  DISCONNECT_CLIENT = "DISCONNECT_CLIENT",
  CONNECT_CLIENT = "CONNECT_CLIENT",
  SET_AUTH = "SET_AUTH",
  SET_USER = "SET_USER",
  SET_FILE = "SET_FILE",
  SET_FILES = "SET_FILES",
  DEVICE_LEAVE = "DEVICE_LEAVE",
  ADD_FILE = "ADD_FILE",
  SAVE_FILE = "SAVE_FILE",
  REMOVE_FILE = "REMOVE_FILE",
  RESET_FILE = "RESET_FILE",
  SYNC = "SYNC",
  SET_CLIP = "SET_CLIP",
  SET_CLIPS = "SET_CLIPS",
  SET_ROOM = "SET_ROOM",
}

export interface Action {
  type: Actions;
  payload: any;
}
