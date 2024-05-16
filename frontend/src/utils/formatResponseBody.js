const extractObject = (object) => {
  if (!object || object.length < 1) return {};
  const result = {};

  object.forEach(({ arrayList, key, type, value }) => {
    if (type === "Object") {
      result[key] = arrayList ? [extractObject(value)] : extractObject(value);
    } else {
      result[key] = arrayList ? [type] : type;
    }
  });

  return result;
};

const formatResponseBody = (data, apiResponseIsArray) => {
  if (!data || data.length < 1) return {};
  const parsedResponses = data.map((request) => {
    return {
      ...request,
      value: request.data === "null" ? null : JSON.parse(request.data),
    };
  });

  const result = {};
  parsedResponses.forEach(({ arrayList, key, type, value }) => {
    if (type === "Object") {
      result[key] = arrayList ? [extractObject(value)] : extractObject(value);
    } else {
      result[key] = arrayList ? [type] : type;
    }
  });

  return apiResponseIsArray ? [result] : result;
};
export default formatResponseBody;
