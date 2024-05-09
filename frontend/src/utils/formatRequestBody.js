// //RequestBody 예쁘게 만들기 (재귀사용, 가로스크롤 추가), 중괄호로 시작, 마지막 중괄호로 닫기 | 기호처리 : "", :, , , [], {}
// const formatRequestBody = (items) => {
//   // items가 배열인지 확인
//   if (!Array.isArray(items)) {
//     console.error("Expected an array but received:", items);
//     return <div>데이터 형식 오류</div>;
//   }

//   return items.map((item, index, array) => {
//     const comma = index < array.length - 1 ? "," : "";
//     if (Array.isArray(item.value)) {
//       return (
//         <div key={item.key}>
//           {item.key}: [
//           <div style={{ paddingLeft: "20px" }}>
//             {formatRequestBody(item.value)}
//           </div>
//           ]{comma}
//         </div>
//       );
//     } else if (typeof item.value === "object" && item.value !== null) {
//       return (
//         <div key={item.key}>
//           {item.key}: {"{"}
//           <div style={{ paddingLeft: "20px" }}>
//             {formatRequestBody(
//               Object.entries(item.value).map(([k, v]) => ({
//                 key: k,
//                 value: v,
//               })),
//             )}
//           </div>
//           {"}"}
//           {comma}
//         </div>
//       );
//     } else {
//       return (
//         <div key={item.key}>
//           {item.key}: {JSON.stringify(item.value)}
//           {comma}
//         </div>
//       );
//     }
//   });
// };

const extractObject = (object) => {
  if (!object || object.length < 1) return {};
  const result = {};

  object.forEach(({ arrayList, key, type, value }) => {
    if (type === "Object") {
      result[key] = extractObject(value);
    } else {
      result[key] = arrayList ? [type] : type;
    }
  });

  return result;
};

const formatRequestBody = (data) => {
  if (!data || data.length < 1) return {};
  const parsedRequests = data.map((request) => {
    return {
      ...request,
      value: request.data === "null" ? null : JSON.parse(request.data),
    };
  });

  const result = {};
  parsedRequests.forEach(({ arrayList, key, type, value }) => {
    if (type === "Object") {
      result[key] = extractObject(value);
    } else {
      result[key] = arrayList ? [type] : type;
    }
  });

  return result;
};

export default formatRequestBody;
