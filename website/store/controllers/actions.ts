import {
  controllersFetchType,
  controllersFetchSuccessType,
  controllersFetchFailureType,
  Store,
} from "@/types/store";
import { Controller } from "@/types/controllers";

// import { get } from '@src/utilities/api';
const get = (string: any) => [];

export const fetchAll = async ({ commit }: Store) => {
  commit(controllersFetchType);

  const controllers: Controller[] = await get("controllers.fetchAll");

  try {
    commit(controllersFetchSuccessType, controllers);
  } catch (e) {
    commit(controllersFetchFailureType, e);
  }
};
