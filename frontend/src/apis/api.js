import axios from "./authAxios";
import formatData from "../utils/formatData";

function capitalize(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const createApi = async ({ document, projectId, groupId }) => {
  const requestBody = {
    ...document,
    apiMethod: capitalize(document.apiMethod),
    apiRequest: document.apiRequest.map((body) => formatData(body)),
    apiResponse: document.apiResponse.map((body) => formatData(body)),
  };

  const { data } = await axios.post(
    `method/${projectId}/${groupId}`,
    requestBody,
  );

  return data;
};

const updateApi = async ({ document, projectId, groupId, apiId }) => {
  const requestBody = {
    name: document.name,
    apiUri: document.apiUri,
    description: document.description,
    apiMethod: capitalize(document.apiMethod),
    apiResponseIsArray: document.apiResponseIsArray,
    apiResponseSize: document.apiResponseSize,
    apiRequest: document.apiRequest.map((body) => formatData(body)),
    apiResponse: document.apiResponse.map((body) => formatData(body)),
    apiPathVariable: document.apiPathVariable.map(({ key, type }) => {
      return { key, type };
    }),
  };

  const { data } = await axios.put(
    `method/${projectId}/${groupId}/${apiId}`,
    requestBody,
  );

  return data;
};

const deleteApi = async ({ projectId, apiId }) => {
  const { data } = axios.delete(`method/${projectId}/${apiId}`);

  return data;
};

const getApi = async ({ projectId, apiId }) => {
  const { data } = await axios.get(`method/${projectId}/${apiId}`);

  return data;
};

export { createApi, updateApi, deleteApi, getApi };
