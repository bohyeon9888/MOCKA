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
  hashKey,
  commonUri,
}) => {
  const fakeApiRequest = makeFakeApiRequest(apiRequests);
  const fakeApiUri = makeFakeApiUri(apiUriStr, apiPaths);

  const result = await axios({
    method: apiMethod.toLowerCase(),
    url: `https://${hashKey}.mock-a.com${commonUri}${fakeApiUri}`,
    data: fakeApiRequest,
  });

  return result;
};

export { sendRequest };
