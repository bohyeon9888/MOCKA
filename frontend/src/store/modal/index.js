import { create } from "zustand";
import { modalActions } from "./action";

const useModalStore = create((set) => ({
  isOpen: false,
  title: "",
  children: null,
  state: null,
  openModal: (title, children, state) => {
    modalActions.openModal(set, title, children, state);
  },
  closeModal: () => {
    modalActions.closeModal(set);
  },
}));

export default useModalStore;
