import axios from "./authAxios";

const visibilityMapping = {
  Public: 1,
  Teams: 2,
  Private: 3,
};

const updateProject = async ({ projectName, commonUri, visibility }) => {
  const { data } = await axios.post("project", {
    projectName,
    commonUri,
    visibility: visibilityMapping[visibility],
  });

  return data;
};

const deleteProject = async (projectId) => {
  await axios.delete(`project/${projectId}`);
};

const createProject = async ({ projectName, commonUri, visibility }) => {
  const { data } = await axios.post("project", {
    projectName,
    commonUri,
    visibility: visibilityMapping[visibility],
  });

  return data;
};

const getProjectList = async () => {
  const { data } = await axios.get("project");

  return data;
};

const getProjectDetail = async (projectId) => {
  const { data } = await axios.get(`project/${projectId}`);

  return data;
};

const getRecentProjectList = async () => {
  const { data } = await axios.get(`project/recent`);

  return data;
};

const getMembers = async (projectId) => {
  const { data } = await axios.get(`history/${projectId}`);

  return data;
};

export {
  updateProject,
  deleteProject,
  getProjectList,
  getProjectDetail,
  getRecentProjectList,
  createProject,
  getMembers,
};
