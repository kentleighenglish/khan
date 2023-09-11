import Vue from "vue";
import {
  socketAddSocketType,
  socketReconnectType,
  socketConnectingType,
  socketConnectedType,
  socketDisconnectedType,
  SocketState,
} from "@/types/store";
import { SocketClientInstance } from "@/types/socket";

export default {
  [socketAddSocketType](state: SocketState, socket: SocketClientInstance) {
    Vue.set(state, "socket", socket);
  },
  [socketReconnectType](state: SocketState) {
    Vue.set(state, "connecting", true);
    Vue.set(state, "connected", false);
  },
  [socketConnectingType](state: SocketState) {
    Vue.set(state, "connecting", true);
    Vue.set(state, "connected", false);
  },
  [socketConnectedType](state: SocketState) {
    Vue.set(state, "connecting", false);
    Vue.set(state, "connected", true);
  },
  [socketDisconnectedType](state: SocketState) {
    Vue.set(state, "connecting", false);
    Vue.set(state, "connected", false);
  },
};
