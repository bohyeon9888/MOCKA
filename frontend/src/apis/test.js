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

  console.log(fakeApiRequest);

  const result = await axios({
    method: apiMethod.toLowerCase(),
    url: `https://${hashKey}.mock-a.com${commonUri}${fakeApiUri}`,
    data: fakeApiRequest,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // const result = await axios({
  //   method: "get",
  //   url: `https://${hashKey}.mock-a.com${commonUri}${fakeApiUri}`,
  // });

  return result;
};

export { sendRequest };
