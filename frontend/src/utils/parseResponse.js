const parseResponse = (responses) => {
  return responses.map((response) => {
    const parsedRequests = response.apiRequests.map((request) => {
      return {
        ...request,
        data: request.data === "null" ? null : JSON.parse(request.data),
      };
    });

    const parsedResponses = response.apiResponses.map((response) => {
      return {
        ...response,
        data: response.data === "null" ? null : JSON.parse(response.data),
      };
    });

    return {
      ...response,
      apiRequests: parsedRequests,
      apiResponses: parsedResponses,
    };
  });
};

export default parseResponse;
