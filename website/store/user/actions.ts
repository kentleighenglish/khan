import {
  setUserType,
  userLoginType,
  userLoginSuccessType,
  userLoginFailureType,
  userLogoutType,
  userLogoutSuccessType,
  userLogoutFailureType,
  Store,
} from "@/types/store";
// import { post } from '@src/utilities/api';
import { User } from "@/types/user";
// import { fetch } from '@src/utilities/utility';

// @todo replace
const post = async (endpoint: string, data: any = {}) => {
  await Promise.resolve({ endpoint, data });
};

export const setUser = ({ commit }: Store, user: User) =>
  commit(setUserType, user);

export const login = async (
  { commit }: Store,
  { email, password }: { email: string; password: string }
) => {
  commit(userLoginType);
  try {
    const user = await post("users.login", { email, password });

    commit(userLoginSuccessType, user);
  } catch (e) {
    commit(userLoginFailureType, e);
  }
};

export const logout = async ({ commit }: Store) => {
  commit(userLogoutType);

  try {
    await post("users.logout");

    commit(userLogoutSuccessType);
  } catch (e) {
    commit(userLogoutFailureType, e);
  }
};
