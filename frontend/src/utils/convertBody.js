const convert = (apiRequests) => {
  if (!apiRequests || apiRequests?.length === 0) return [];
  return apiRequests.map((apiRequest) => {
    return {
      ...apiRequest,
      value: apiRequest.value && convert(JSON.parse(apiRequest.value)),
    };
  });
};

const convertBody = (apiRequests) => {
  console.log(apiRequests);
  if (!apiRequests || apiRequests?.length === 0) return [];
  return apiRequests.map((apiRequest) => {
    console.log(JSON.parse(apiRequest.data));
    return {
      ...apiRequest,
      value: apiRequest.data && convert(JSON.parse(apiRequest.data)),
    };
  });
};

export default convertBody;
