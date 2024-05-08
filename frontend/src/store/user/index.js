import { create } from "zustand";
import { userActions } from "./action";

const useUserStore = create((set) => ({
  user: null,
  login: async (nickname, profile) => userActions.login(set, nickname, profile),
  logout: () => userActions.logout(set),
}));

export default useUserStore;
