import axios from "axios";
import formatData from "../utils/formatData";

function capitalize(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function createApi(document) {
  const projectId = 21;
  const requestBody = {
    ...document,
    apiMethod: capitalize(document.apiMethod),
    apiRequest: document.apiRequest.map((body) => formatData(body)),
    apiResponse: document.apiResponse.map((body) => formatData(body)),
  };

  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}method/${projectId}`,
    requestBody,
  );

  return data;
}
