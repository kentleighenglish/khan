import type { Socket } from "socket.io-client";
import { Controller } from "./controllers";
import { User } from "./user";
import { Device } from "./devices";

export interface ControllersState {
  controllers: Controller[];
  loading: boolean;
  loaded: boolean;
  error?: Error | null;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  loaded: boolean;
  error?: Error | null;
}

export interface DevicesState {
  devices: Device[];
  loading: boolean;
  loaded: boolean;
  error?: Error | null;
}

export interface SocketState {
  socket: Socket | null;
  connecting: boolean;
  connected: boolean;
}

export interface RootState {
  controllers: ControllersState;
  devices: DevicesState;
  user: UserState;
  socket: SocketState;
}

export type StoreCommit = (type: string, payload?: any) => void;
export type StoreDispatch = (type: string, payload?: any, options?: any) => any;

export interface Store {
  commit: StoreCommit;
  dispatch: StoreDispatch;
  state: any;
  rootState: RootState;
}

// Controllers Module Types
export const controllersFetchType = "@controllers/fetch";
export const controllersFetchFailureType = "@controllers/fetchFailure";
export const controllersFetchSuccessType = "@controllers/fetchSuccess";

// Devices Module Types
export const devicesFetchType = "@devices/fetch";
export const devicesFetchSuccessType = "@devices/fetchSuccess";
export const devicesFetchFailureType = "@devices/fetchFailure";

// Socket Module Types
export const socketConnectType = "@socket/connect";
export const socketReconnectType = "@socket/reconnect";
export const socketConnectingType = "@socket/connecting";
export const socketConnectedType = "@socket/connected";
export const socketDisconnectedType = "@socket/disconnected";
export const socketEmitType = "@socket/emit";

// User Module Types
export const setUserType = "@user/setUser";
export const userLoginType = "@user/login";
export const userLoginSuccessType = "@user/loginSuccess";
export const userLoginFailureType = "@user/loginFailed";
export const userLogoutType = "@user/logout";
export const userLogoutSuccessType = "@user/logoutSuccess";
export const userLogoutFailureType = "@user/logoutFailed";
