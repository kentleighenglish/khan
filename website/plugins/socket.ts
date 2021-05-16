import { Plugin } from "@nuxt/types";
import io from "socket.io-client";
import { SocketClientInstance } from "@/types/socket";

const plugin: Plugin = ({ app }, inject) => {
  const { socket: socketConfig } = app.$config;

  const socket: SocketClientInstance = io(socketConfig.host, {
    autoConnect: false,
    reconnectionAttempts: 4,
    path: socketConfig.path,
    query: {
      type: "app",
    },
  });

  inject("socket", () => socket);
};

export default plugin;
