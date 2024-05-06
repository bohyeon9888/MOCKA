import { create } from "zustand";
import { userActions } from "./action";

const useUserStore = create((set) => ({
  user: null,
  login: async (username, password) =>
    userActions.login(set, username, password),
  logout: () => userActions.logout(set),
}));

export default useUserStore;
