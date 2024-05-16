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
  commonUri,
  baseUrl,
}) => {
  const fakeApiRequest = makeFakeApiRequest(apiRequests);
  const fakeApiUri = makeFakeApiUri(apiUriStr, apiPaths);

  const result = await axios({
    method: apiMethod.toLowerCase(),
    url: `${baseUrl}${commonUri}${fakeApiUri}`,
    data: fakeApiRequest,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result;
};

export { sendRequest };
