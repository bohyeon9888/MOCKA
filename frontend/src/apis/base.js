import axios from "./authAxios";

const addBaseUri = async ({ projectId, baseUrl }) => {
  const { data } = await axios.post(`base-url/${projectId}`, { baseUrl });

  return data;
};

const getBaseUriList = async (projectId) => {
  const { data } = await axios.get(`base-url/${projectId}`);

  return data;
};

const updateBaseUriList = async ({ projectId, baseId, baseUrl }) => {
  const { data } = await axios.get(`base-url/${projectId}/${baseId}`, {
    baseUrl,
  });

  return data;
};

const deleteBaseUriList = async ({ projectId, baseId }) => {
  const { data } = await axios.delete(`base-url/${projectId}/${baseId}`);

  return data;
};

export { getBaseUriList, addBaseUri, updateBaseUriList, deleteBaseUriList };
