export const projectActions = {
  login: async (set, get, username, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      set({ user: data.user });
    } catch (error) {
      console.error("Failed to login", error);
      set({ user: null });
    }
  },

  logout: (set, get) => {
    set({ user: null });
  },
};
