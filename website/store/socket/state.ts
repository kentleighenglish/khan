import { SocketState } from "@/types/store";

export default (): SocketState => ({
  socket: null,
  connecting: false,
  connected: false,
});
