import {
  socketConnectType,
  socketReconnectType,
  socketConnectingType,
  socketConnectedType,
  socketDisconnectedType,
  Store,
} from "@/types/store";
// import { init as socketInit } from "@src/utilities/socket";
import { User } from "@/types/user";

const socketInit = (user) => {};

export const hookEvents = ({ commit, state }: Store) => {
  const socket = state.socket;

  if (socket) {
    // Connect
    socket.on("connect", () => {
      commit(socketConnectedType);
    });
    socket.on("reconnect", () => {
      commit(socketConnectedType);
    });

    // Connecting
    socket.on("reconnect_attempt", () => {
      commit(socketConnectingType);
    });
    socket.on("reconnecting", () => {
      commit(socketConnectingType);
    });

    // Disconnected
    socket.on("reconnect_failed", () => {
      commit(socketDisconnectedType);
    });
    socket.on("disconnected", () => {
      commit(socketDisconnectedType);
    });
  }

  // Errors
  socket.on("connect_timeout", () => {});
  socket.on("connect_error", () => {});
  socket.on("reconnect_error", () => {});
};

export const connect = ({ commit, dispatch }: Store, user: User) => {
  const socket = socketInit(user);

  dispatch("hookEvents");

  window.addEventListener("online", () => {
    commit(socketConnectingType);
  });
  window.addEventListener("offline", () => {
    commit(socketDisconnectedType);
  });

  commit(socketConnectType, socket);
};

export const reconnect = ({ commit }: Store) => commit(socketReconnectType);
export const connecting = ({ commit }: Store) => commit(socketConnectingType);
export const connected = ({ commit }: Store) => commit(socketConnectedType);
export const disconnected = ({ commit }: Store) =>
  commit(socketDisconnectedType);
