export default function parsePathVariables(uri) {
  // 중괄호로 감싸진 경로 변수를 찾는 정규 표현식
  const regex = /\{([A-Za-z0-9]+)\}/g;
  let match;
  const pathVariables = [];

  // 정규 표현식을 사용하여 모든 경로 변수 추출
  while ((match = regex.exec(uri)) !== null) {
    pathVariables.push(match[1]); // match[1]은 중괄호 사이의 값을 포함
  }

  return pathVariables;
}
