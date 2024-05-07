import axios from "./authAxios";

const getProjectList = async () => {
  const { data } = await axios.get(`project`);

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

export { getProjectList, getProjectDetail, getRecentProjectList };
