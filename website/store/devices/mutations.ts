import Vue from "vue";
import {
  devicesFetchType,
  devicesFetchSuccessType,
  devicesFetchFailureType,
  DevicesState,
} from "@/types/store";
import { Device } from "@/types/devices";

export default {
  [devicesFetchType](state: DevicesState) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", true);

    Vue.set(state, "devices", []);
  },
  [devicesFetchSuccessType](state: DevicesState, devices: Device[]) {
    Vue.set(state, "loaded", true);
    Vue.set(state, "loading", false);

    Vue.set(state, "devices", devices);
  },
  [devicesFetchFailureType](state: DevicesState, error: Error) {
    Vue.set(state, "loaded", false);
    Vue.set(state, "loading", false);

    Vue.set(state, "error", error);
  },
};
