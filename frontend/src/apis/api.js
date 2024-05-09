import axios from "./authAxios";
import formatData from "../utils/formatData";

function capitalize(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const createApi = async ({ document, projectId }) => {
  const requestBody = {
    ...document,
    apiMethod: capitalize(document.apiMethod),
    apiRequest: document.apiRequest.map((body) => formatData(body)),
    apiResponse: document.apiResponse.map((body) => formatData(body)),
  };

  const { data } = await axios.post(`method/${projectId}`, requestBody);

  return data;
};

const updateApi = async (document) => {
  const projectId = 21;
  const requestBody = {
    ...document,
    apiMethod: capitalize(document.apiMethod),
    apiRequest: document.apiRequest.map((body) => formatData(body)),
    apiResponse: document.apiResponse.map((body) => formatData(body)),
  };

  const { data } = await axios.post(`method/${projectId}`, requestBody);

  return data;
};

const deleteApi = async ({ projectId, apiId }) => {
  const { data } = axios.delete(`method/${projectId}/${apiId}`);

  return data;
};

export { createApi, updateApi, deleteApi };
