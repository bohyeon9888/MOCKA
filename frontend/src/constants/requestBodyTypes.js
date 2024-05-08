const requestBodyTypes = [
  "Boolean",
  "Byte",
  "Char",
  "Double",
  "Float",
  "Int",
  "Long",
  "Short",
  "String",
  "Array",
  "Object",
];

export const filteredRequestBodyTypes = (filters) => {
  return requestBodyTypes.filter((type) => !filters.includes(type));
};

export default requestBodyTypes;
