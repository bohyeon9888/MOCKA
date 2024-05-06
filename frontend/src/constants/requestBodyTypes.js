const requestBodyTypes = [
  "boolean",
  "byte",
  "char",
  "double",
  "float",
  "int",
  "long",
  "short",
  "String",
  "Array",
  "Object",
];

export const filteredRequestBodyTypes = (filters) => {
  return requestBodyTypes.filter((type) => !filters.includes(type));
};

export default requestBodyTypes;
