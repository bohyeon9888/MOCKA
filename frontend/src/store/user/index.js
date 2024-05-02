import { createStore } from "zustand";
import { userActions } from "./actions";

const useUserStore = createStore((set) => ({
  user: null,
  login: async (username, password) =>
    userActions.login(set, username, password),
  logout: () => userActions.logout(set),
}));

export default useUserStore;
