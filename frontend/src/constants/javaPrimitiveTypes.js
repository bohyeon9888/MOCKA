const javaPrimitiveTypes = [
  "Boolean",
  "Byte",
  "Character",
  "Double",
  "Float",
  "Integer",
  "Long",
  "Short",
  "String",
];

export const filteredJavaPrimitiveTypes = (filters) => {
  return javaPrimitiveTypes.filter((type) => !filters.includes(type));
};

export default javaPrimitiveTypes;
