import { Plugin } from "@nuxt/types";
import io from "socket.io-client";
import { SocketClientInstance } from "@/types/socket";

const plugin: Plugin = ({ app }, inject) => {
  const { socket: socketConfig } = app.$config;

  const user = JSON.stringify({});

  const socket: SocketClientInstance = io(socketConfig.host, {
    autoConnect: false,
    path: socketConfig.path,
    query: { user },
  });

  inject("socket", () => socket);
};

export default plugin;
