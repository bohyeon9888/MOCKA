const javaPrimitiveTypes = [
  "boolean",
  "byte",
  "char",
  "double",
  "float",
  "int",
  "long",
  "short",
  "String",
];

export const filteredJavaPrimitiveTypes = (filters) => {
  return javaPrimitiveTypes.filter((type) => !filters.includes(type));
};

export default javaPrimitiveTypes;
