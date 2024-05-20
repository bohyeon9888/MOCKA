import javaPrimitiveTypes from "../constants/javaPrimitiveTypes";

function createTypeValidationRegex(typesArray) {
  const typesPattern = typesArray.join("|");
  const regexPattern = `^\/(?:\\{[A-Za-z0-9]+\\}|[A-Za-z0-9]+)(?:\/(?:\\{[A-Za-z0-9]+\\}|[A-Za-z0-9]+))*(?:\\?[A-Za-z0-9_\\-]+=(?:${typesPattern})(?:&[A-Za-z0-9_\\-]+=(?:${typesPattern}))*)?$`;
  return new RegExp(regexPattern);
}

export default function isValidURI(uri) {
  if (uri === "") return true;
  const regex = createTypeValidationRegex(javaPrimitiveTypes);
  // TODO : queryParameters, pathVariables key 중복 확인
  return regex.test(uri);
}
