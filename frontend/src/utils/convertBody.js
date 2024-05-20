const convert = (apiRequests) => {
  if (!apiRequests || apiRequests?.length === 0) return [];
  return apiRequests.map((apiRequest) => {
    return {
      ...apiRequest,
      id: Math.random(),
      value: apiRequest.value && convert(apiRequest.value),
    };
  });
};

const convertBody = (apiRequests) => {
  if (!apiRequests || apiRequests?.length === 0) return [];
  return apiRequests.map((apiRequest) => {
    return {
      ...apiRequest,
      value: apiRequest.data && convert(JSON.parse(apiRequest.data)),
    };
  });
};

export default convertBody;
