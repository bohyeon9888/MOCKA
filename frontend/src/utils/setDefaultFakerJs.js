import fakerJsMap from "../constants/fakerJsMap";

const setDefaultFakerJs = (object) => {
  return object.map(({ key, type, data }) => {
    const first = fakerJsMap[type || data].first[0];
    const second = fakerJsMap[type || data].second[first][0];
    return {
      key,
      type,
      data,
      first,
      second,
      input: "",
      min: fakerJsMap[type || data]?.min,
      max: fakerJsMap[type || data]?.max,
    };
  });
};

const extractObject = (data) => {
  return data.map(({ arrayList, value, key, type, arraySize }) => {
    const first = fakerJsMap[type].first[0];
    const second = fakerJsMap[type].second[first][0];
    const min = fakerJsMap[type]?.min;
    const max = fakerJsMap[type]?.max;
    return {
      id: Math.random(),
      arrayList,
      arraySize: arrayList && (arraySize || 5),
      key,
      type,
      first,
      second,
      min,
      max,
      data: value && extractObject(value),
      input: "",
    };
  });
};

export const setDefaultFakerJsBody = (requests) => {
  return requests.map(({ id, arrayList, data, key, type, arraySize }) => {
    const first = fakerJsMap[type].first[0];
    const second = fakerJsMap[type].second[first][0];
    const min = fakerJsMap[type]?.min;
    const max = fakerJsMap[type]?.max;
    return {
      id,
      arrayList,
      arraySize: arrayList && 5,
      key,
      type,
      first,
      second,
      min,
      max,
      input: "",
      data: data != "null" && extractObject(JSON.parse(data)),
    };
  });
};

export default setDefaultFakerJs;
