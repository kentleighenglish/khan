import { ControllersState } from "@/types/store";

export default (): ControllersState => ({
  controllers: [],
  loading: false,
  loaded: false,
  error: null,
});
