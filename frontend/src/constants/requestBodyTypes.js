const requestBodyTypes = [
  "Boolean",
  "Byte",
  "Character",
  "Double",
  "Float",
  "Integer",
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
