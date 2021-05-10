import Vue from "vue";
import {
  setUserType,
  userLoginType,
  userLoginSuccessType,
  userLoginFailureType,
  userLogoutType,
  userLogoutSuccessType,
  userLogoutFailureType,
  UserState,
} from "@/types/store";
import { User } from "@/types/user";

export default {
  [setUserType](state: UserState, user: User) {
    Vue.set(state, "loaded", true);
    Vue.set(state, "loading", false);

    Vue.set(state, "user", user);
  },
  [userLoginType](state: UserState) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", true);

    Vue.set(state, "user", null);
  },
  [userLoginSuccessType](state: UserState, user: User) {
    Vue.set(state, "loaded", true);
    Vue.set(state, "loading", false);

    Vue.set(state, "user", user);
  },
  [userLoginFailureType](state: UserState, error: Error) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", false);

    Vue.set(state, "error", error);
  },
  [userLogoutType](state: UserState) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", true);
  },
  [userLogoutSuccessType](state: UserState) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", false);

    Vue.set(state, "user", null);
  },
  [userLogoutFailureType](state: UserState, error: Error) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", false);

    Vue.set(state, "error", error);
  },
};
