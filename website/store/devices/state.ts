import { DevicesState } from "@/types/store";

export default (): DevicesState => ({
  devices: [],
  loading: false,
  loaded: false,
  error: null,
});
