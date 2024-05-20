export default function mergePathVariables(
  oldPathVariable,
  newPathVariableArr,
) {
  return newPathVariableArr.map((newKey, idx) => {
    const type =
      oldPathVariable.find(({ key }) => key === newKey)?.type ||
      oldPathVariable[idx]?.type;
    return {
      key: newKey,
      type: type || "String",
    };
  });
}
