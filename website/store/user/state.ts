import { UserState } from "@/types/store";

export default (): UserState => ({
  user: null,
  loading: false,
  loaded: false,
  error: null,
});
