import Vue from "vue";
import type { Socket } from "socket.io-client";
import {
  socketConnectType,
  socketReconnectType,
  socketConnectingType,
  socketConnectedType,
  socketDisconnectedType,
  SocketState,
} from "@/types/store";
// import { connect as socketConnect } from '@src/utilities/socket';

// const socketConnect = (socket: any) => socket.id;

export default {
  [socketConnectType](state: SocketState, socket: Socket) {
    Vue.set(state, "connecting", true);
    Vue.set(state, "connected", false);

    Vue.set(state, "socket", socket);
  },
  [socketReconnectType](state: SocketState) {
    // socketConnect(state.socket);

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
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", false);
  },
};
