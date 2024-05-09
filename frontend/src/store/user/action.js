import { getValueFromToken, logout } from "../../utils/auth";

export const userActions = {
  login: (set, nickname, profile) => {
    set((state) => {
      return {
        ...state,
        user: { nickname, profile },
      };
    });
  },

  logout: (set) => {
    set({ user: null });
    logout();
  },

  getProfileFromToken: (set) => {
    set((state) => {
      const nickname = getValueFromToken("username");
      const profile = getValueFromToken("profile");

      if (!nickname || !profile) return state;
      return {
        ...state,
        user: { nickname, profile },
      };
    });
  },
};
