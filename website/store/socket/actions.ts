import {
  socketAddSocketType,
  socketConnectingType,
  socketConnectedType,
  socketDisconnectedType,
  Store,
} from "@/types/store";
import { SocketClientInstance } from "@/types/socket";

export const hookEvents = ({ commit, state }: Store) => {
  const socket = state.socket();

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
    socket.on("disconnect", () => {
      commit(socketDisconnectedType);
    });

    window.addEventListener("online", () => {
      commit(socketConnectingType);
    });
    window.addEventListener("offline", () => {
      commit(socketDisconnectedType);
    });
  }

  // Errors
  socket.on("connect_timeout", () => {});
  socket.on("connect_error", () => {});
  socket.on("reconnect_error", () => {});
};

export const addSocket = (
  { commit, dispatch }: Store,
  { socket }: { socket: () => SocketClientInstance }
) => {
  commit(socketAddSocketType, socket);

  dispatch("hookEvents");
};

// export const reconnect = ({ commit }: Store) => commit(socketReconnectType);
// export const connecting = ({ commit }: Store) => commit(socketConnectingType);
// export const connected = ({ commit }: Store) => commit(socketConnectedType);
// export const disconnected = ({ commit }: Store) =>
//   commit(socketDisconnectedType);
