import Vue from "vue";
import {
  controllersFetchType,
  controllersFetchSuccessType,
  controllersFetchFailureType,
  ControllersState,
} from "@/types/store";
import { Controller } from "@/types/controllers";

export default {
  [controllersFetchType](state: ControllersState) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", true);

    Vue.set(state, "controllers", []);
  },
  [controllersFetchSuccessType](
    state: ControllersState,
    controllers: Controller[]
  ) {
    Vue.set(state, "loaded", true);
    Vue.set(state, "loading", false);

    Vue.set(state, "controllers", controllers);
  },
  [controllersFetchFailureType](state: ControllersState, error: Error) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", false);

    Vue.set(state, "error", error);
  },
};
