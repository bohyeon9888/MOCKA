import { createStore } from "zustand";
import { projectActions } from "./actions";

const useProjectStore = createStore((set) => ({
  project: null,
}));

export default useProjectStore;
