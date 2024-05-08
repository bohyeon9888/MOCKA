import { create } from "zustand";
import { projectActions } from "./action";

const useProjectStore = create((set) => ({
  project: null,
  projectList: [],
  recentProjectList: [],
  setProjectList: (projectList) => {
    projectActions.setProjectList(set, projectList);
  },
  setRecentProjectList: (recentProjectList) => {
    projectActions.setRecentProjectList(set, recentProjectList);
  },
}));

export default useProjectStore;
