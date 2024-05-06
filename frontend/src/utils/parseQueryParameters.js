const parseQueryParameters = (apiUri) => {
  const queryString = apiUri.split("?")[1];
  if (!queryString) {
    return [];
  }

  const params = queryString.split("&");
  const result = params.map((param) => {
    const [key, value] = param.split("=");
    return { key: key, type: value };
  });

  return result;
};

export default parseQueryParameters;
