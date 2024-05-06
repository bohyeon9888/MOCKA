import { create } from "zustand";
import { projectActions } from "./action";

const useProjectStore = create((set) => ({
  project: null,
}));

export default useProjectStore;
