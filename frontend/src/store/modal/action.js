export const modalActions = {
  openModal: (set, title, children, state) => {
    set({
      isOpen: true,
      title,
      children,
      state,
    });
  },
  closeModal: (set) => {
    set((state) => {
      return {
        ...state,
        isOpen: false,
      };
    });
  },
};
