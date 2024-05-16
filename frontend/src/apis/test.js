import axios from "axios";
import {
  makeFakeApiRequest,
  makeFakeApiUri,
} from "../utils/makeFakeApiRequest";

const sendRequest = async ({
  apiRequests,
  apiUriStr,
  apiPaths,
  apiMethod,
  headers,
  queryParameters,
  pathVariables,
  body,
  commonUri,
  baseUrl,
}) => {
  // console.log(headers, queryParameters, pathVariables, body);
  // const fakeApiRequest = makeFakeApiRequest(apiRequests);
  // const fakeApiUri = makeFakeApiUri(apiUriStr, apiPaths);
  const fakeApiRequest = makeFakeApiRequest(body);
  const fakeApiUri = makeFakeApiUri(apiUriStr, queryParameters, pathVariables);

  const header = { "Content-Type": "application/json" };
  headers.forEach(({ key, value }) => {
    header[key] = value;
  });

  const result = await axios({
    method: apiMethod.toLowerCase(),
    url: `${baseUrl}${commonUri}${fakeApiUri}`,
    data: fakeApiRequest,
    headers: header,
  });

  return result;
};

export { sendRequest };
