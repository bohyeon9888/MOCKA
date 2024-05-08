const javaPrimitiveTypes = [
  "Boolean",
  "Byte",
  "Char",
  "Double",
  "Float",
  "Int",
  "Long",
  "Short",
  "String",
];

export const filteredJavaPrimitiveTypes = (filters) => {
  return javaPrimitiveTypes.filter((type) => !filters.includes(type));
};

export default javaPrimitiveTypes;
