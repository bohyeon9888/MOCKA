export const modalActions = {
  openModal: (set, title, children) => {
    set({
      isOpen: true,
      title,
      children,
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
