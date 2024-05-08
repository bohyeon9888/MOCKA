import { logout } from "../../utils/auth";

export const userActions = {
  login: (set, nickname, profile) => {
    set((state) => {
      return {
        ...state,
        nickname,
        profile,
      };
    });
  },

  logout: (set) => {
    set({ user: null });
    logout();
  },
};
