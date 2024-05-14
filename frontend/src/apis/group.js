import axios from "./authAxios";

const createGroup = async ({ projectId, groupUri, groupName }) => {
  axios.post(`group/${projectId}`, {
    groupUri,
    groupName,
  });
};

const updateGroup = async ({ projectId, groupId, groupName, groupUri }) => {
  axios.put(`group/${projectId}/${groupId}`, {
    groupUri,
    groupName,
  });
};

const deleteGroup = async ({ projectId, groupId }) => {
  axios.delete(`group/${projectId}/${groupId}`);
};

const getGroupList = async () => {};

const getGroup = async () => {};

export { createGroup, updateGroup, deleteGroup, getGroup, getGroupList };
