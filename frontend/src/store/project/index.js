import { create } from "zustand";
import { projectActions } from "./action";

const useProjectStore = create((set) => ({
  project: null,
  projectList: [],
  recentProjectList: [],
  mode: null,
  setProjectList: (projectList) => {
    projectActions.setProjectList(set, projectList);
  },
  setRecentProjectList: (recentProjectList) => {
    projectActions.setRecentProjectList(set, recentProjectList);
  },
  setProject: (project) => {
    projectActions.setProject(set, project);
  },
}));

export default useProjectStore;
