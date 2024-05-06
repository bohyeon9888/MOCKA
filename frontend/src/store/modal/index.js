import { create } from "zustand";
import { modalActions } from "./action";

const useModalStore = create((set) => ({
  isOpen: false,
  title: "",
  children: null,
  openModal: (title, children) => {
    modalActions.openModal(set, title, children);
  },
  closeModal: () => {
    modalActions.closeModal(set);
  },
}));

export default useModalStore;
