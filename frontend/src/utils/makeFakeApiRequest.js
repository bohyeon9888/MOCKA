// import { faker } from "@faker-js/faker";
import faker from "./localeFaker";

const randomValueByType = (type) => {
  switch (type) {
    case "String":
      return faker.word.words();
    case "Integer":
      return faker.number.int({ min: -2147483648, max: 2147483647 });
    case "Boolean":
      return faker.datatype.boolean();
    case "Long":
      return faker.number.bigInt({
        min: BigInt("-9223372036854775807"),
        max: BigInt("9223372036854775808"),
      });
    case "Float":
      return faker.number.float({ min: -3.4e38, max: 3.4e38 });
    case "Double":
      return faker.number.float({ min: -1.8e308, max: 1.8e308 });
    case "Byte":
      return faker.number.int({ min: -128, max: 127 });
    case "Short":
      return faker.number.int({ min: -32768, max: 32767 });
    case "Character":
      return String.fromCharCode(faker.number.int({ min: 0, max: 65535 }));
  }
};

const convertValue = (s) => {
  if (s === "") return "";
  const start = s[0].toLowerCase();
  const others = s.slice(1);
  return start + others;
};

const randomValue = ({ first, second, input, min, max }) => {
  if (first === "직접 입력") return input;
  if (first === "Character")
    return String.fromCharCode(faker.number.int({ min: 0, max: 65535 }));
  if (second === "Integer") return faker.number.int({ min, max });
  if (second === "Double") return faker.number.float({ min, max });
  if (second === "Long") return faker.number.bigInt({ min, max }).toString();
  if (second === "Byte") return faker.number.int({ min, max });
  if (second === "Boolean") return faker.datatype.boolean();
  return faker[convertValue(first)][convertValue(second)]({ min, max });
};

const extractObject = (object) => {
  if (!object || object.length < 1) return {};
  const result = {};
  object.forEach(
    ({
      key,
      first,
      second,
      type,
      arrayList,
      arraySize,
      data,
      input,
      min,
      max,
    }) => {
      if (type === "Object") {
        result[key] = arrayList
          ? Array.from({ length: arraySize }, () => extractObject(data))
          : extractObject(data);
      } else {
        result[key] = arrayList
          ? Array.from({ length: arraySize }, () =>
              randomValue({ first, second, input, min, max }),
            )
          : randomValue({ first, second, input, min, max });
      }
    },
  );

  return result;
};

// const fakeRequestBody = (data) => {
//   if (!data || data.length < 1) return {};
//   const parsedRequests = data.map((request) => {
//     return {
//       ...request,
//       value: request.data === "null" ? null : JSON.parse(request.data),
//     };
//   });

//   const result = {};
//   parsedRequests.forEach(({ arrayList, arraySize, key, type, value }) => {
//     if (type === "Object") {
//       result[key] = arrayList
//         ? Array.from({ length: arraySize }, () => extractObject(value))
//         : extractObject(value);
//     } else {
//       result[key] = arrayList
//         ? Array.from({ length: arraySize }, () => randomValueByType(type))
//         : randomValueByType(type);
//     }
//   });

//   return result;
// };

const makeFakeApiRequest = (body) => {
  // return fakeRequestBody(apiRequest);
  const result = {};
  body.forEach(
    ({
      key,
      first,
      second,
      type,
      arrayList,
      arraySize,
      data,
      input,
      min,
      max,
    }) => {
      if (type === "Object") {
        result[key] = arrayList
          ? Array.from({ length: arraySize }, () => extractObject(data))
          : extractObject(data);
      } else {
        result[key] = arrayList
          ? Array.from({ length: arraySize }, () =>
              randomValue({ first, second, input, min, max }),
            )
          : randomValue({ first, second, input, min, max });
      }
    },
  );

  return result;
};

const makeFakeApiUri = (apiUri, queryParameters, pathVariables) => {
  const [uri, queryString] = apiUri.split("?");
  const pathMap = {};
  pathVariables.forEach((pathVariable) => {
    pathMap[pathVariable.key] = { ...pathVariable };
  });

  const paramMap = {};
  queryParameters.forEach((queryParameter) => {
    paramMap[queryParameter.key] = { ...queryParameter };
  });

  const fakeUri = uri
    .split("/")
    .map((path) => {
      const regex = /\{([A-Za-z0-9]+)\}/g;
      const key = regex.exec(path);
      if (!key) return path;
      const template = pathMap[key[1]];
      return randomValue(template);
    })
    .join("/");

  const fakeQueryString = queryString
    ?.split("&")
    .map((query) => {
      const [key, type] = query.split("=");
      return `${key}=${randomValue(paramMap[key])}`;
    })
    .join("&");

  return fakeQueryString ? `${fakeUri}?${fakeQueryString}` : fakeUri;
};

export { makeFakeApiRequest, makeFakeApiUri };
