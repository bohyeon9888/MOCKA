import React, { useState } from "react";
import Method from "./Method";
/**바꿀거 */
// 메소드 타입별로 placeholder 내용 다르게
//<p className="ml-[10px]">/api/user/detail/{}</p> api url 전역에서 관리할거야

function ApiBox() {
  const [isDetailVisible, setIsDetailVisible] = useState(false); //자세히 보기 버튼
  const [methodType] = useState("Get".toUpperCase()); //method타입과 placeholder내용
  const [apiUri] = useState("/api/user/detail/전역에서가져올거야"); //api uri
  const [apiRequest] = [
    [
      {
        key: "memberId",
        type: "long",
        arrayList: true,
        arraySize: -1,
        fakerLocale: "KO",
        fakerMajor: "Phone",
        fakerSub: "number",
        value: null,
      },
      {
        key: "memberName",
        type: "String",
        arrayList: false,
        arraySize: -1,
        fakerLocale: "KO",
        fakerMajor: "Phone",
        fakerSub: "number",
        value: null,
      },
      {
        key: "memberPhonenumber",
        type: "String",
        arrayList: false,
        arraySize: -1,
        fakerLocale: "KO",
        fakerMajor: "Phone",
        fakerSub: "number",
        value: null,
      },
      {
        key: "profileInfo",
        type: "Object",
        arrayList: false,
        arraySize: -1,
        fakerLocale: "KO",
        fakerMajor: "Phone",
        fakerSub: "number",
        value: [
          {
            key: "profileName",
            type: "String",
            arrayList: false,
            arraySize: -1,
            fakerLocale: "KO",
            fakerMajor: "Phone",
            fakerSub: "number",
            value: null,
          },
          {
            key: "profileImageUrl",
            type: "String",
            arrayList: false,
            arraySize: -1,
            fakerLocale: "KO",
            fakerMajor: "Phone",
            fakerSub: "number",
            value: null,
          },
        ],
      },
      {
        key: "profileInfoDetail",
        type: "Object",
        arrayList: false,
        arraySize: -1,
        fakerLocale: "KO",
        fakerMajor: "Phone",
        fakerSub: "number",
        value: [
          {
            key: "profileName",
            type: "Object",
            arrayList: false,
            arraySize: -1,
            fakerLocale: "KO",
            fakerMajor: "Phone",
            fakerSub: "number",
            value: [
              {
                key: "profileNameFirst",
                type: "String",
                arrayList: false,
                arraySize: -1,
                fakerLocale: "KO",
                fakerMajor: "Phone",
                fakerSub: "number",
                value: "",
              },
              {
                key: "profileNameSecond",
                type: "String",
                arrayList: false,
                arraySize: -1,
                fakerLocale: "KO",
                fakerMajor: "Phone",
                fakerSub: "number",
                value: "",
              },
            ],
          },
        ],
      },
    ],
  ]; //RequestBody
  // const [Response] = useState(""); //Response

  const toggleDetails = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  //일반 vs 자세히 보기 div박스 크기 다르게
  const boxStyle = isDetailVisible
    ? {
        width: "945px",
        height: "427px",
        transition: "all 0.3s ease",
      }
    : {
        width: "945px",
        height: "111px",
        transition: "all 0.3s ease",
      };

  // 메소드 타입별로 placeholder 다른내용 나오게
  let placeholderText;

  switch (methodType) {
    case "GET":
      placeholderText = "사용자 정보 조회 => API 이름 or 간단 설명 작성";
      break;

    case "POST":
      placeholderText = "사용자 등록";
      break;

    case "PUT":
      placeholderText = "사용자 정보 변경";
      break;

    case "DELETE":
      placeholderText = "사용자 삭제";
      break;

    case "PATCH":
      placeholderText = "사용자 상태 변경";
      break;
  }

  //RequestBody 예쁘게 만들기 (재귀사용, 가로스크롤 추가)
  // 중괄호로 시작, 마지막 중괄호로 닫기 | 기호처리 : "", :, , , [], {}
  const formatRequestBody = (items) => {
    // items가 배열인지 확인
    if (!Array.isArray(items)) {
      console.error("Expected an array but received:", items);
      return <div>데이터 형식 오류</div>; // 또는 다른 적절한 처리
    }

    return items.map((item, index, array) => {
      const comma = index < array.length - 1 ? "," : "";
      if (Array.isArray(item.value)) {
        return (
          <div key={item.key}>
            {item.key}: [
            <div style={{ paddingLeft: "20px" }}>
              {formatRequestBody(item.value)}
            </div>
            ]{comma}
          </div>
        );
      } else if (typeof item.value === "object" && item.value !== null) {
        return (
          <div key={item.key}>
            {item.key}: {"{"}
            <div style={{ paddingLeft: "20px" }}>
              {formatRequestBody(
                Object.entries(item.value).map(([k, v]) => ({
                  key: k,
                  value: v,
                })),
              )}
            </div>
            {"}"}
            {comma}
          </div>
        );
      } else {
        return (
          <div key={item.key}>
            {item.key}: {JSON.stringify(item.value)}
            {comma}
          </div>
        );
      }
    });
  };

  return (
    <div
      className=" rounded-[15px] border-[3px] border-gray-200 bg-white "
      style={boxStyle}
    >
      <input
        className="ml-[28px] mt-[20px] h-[31px] w-[890px] place-content-start rounded-[4px] border-[1px] border-gray-400 bg-white pl-[10px] text-[12px]"
        placeholder={placeholderText}
      />
      <div className="ml-[28px] mt-[13px] flex w-[890px] items-center">
        <Method type={methodType} />
        <p className="ml-[10px]">{apiUri}</p>
        <div className="flex-grow"></div>
        <div className="flex items-center">
          {/* 링크복사 */}
          <img
            src="/asset/project/project-copy.svg"
            className="mr-[17px] h-4 cursor-pointer"
            alt="project-copy"
          />
          {/* 수정모달 */}
          <img
            src="/asset/project/project-edit.svg"
            className="mr-[17px] h-4 cursor-pointer"
            alt="project-edit"
          />
          {isDetailVisible ? (
            <>
              <img
                src="/asset/project/project-up-pointer.svg"
                className="h-3 cursor-pointer"
                alt="project-up-pointer"
                onClick={toggleDetails}
              />
            </>
          ) : (
            <>
              <img
                src="/asset/project/project-down-pointer.svg"
                className="h-3 cursor-pointer"
                alt="project-down-pointer"
                onClick={toggleDetails}
              />
            </>
          )}
        </div>
      </div>
      {/* 자세히 보기 */}
      {isDetailVisible && (
        <div className="transition-all-[0.9s ease]">
          <div className="ml-[28px] mt-[20px]  h-[239px] w-[890px] border-[2px] border-gray-200 bg-white">
            <div className="flex h-[38px] items-center border-b-[2px] border-gray-200">
              <h4 className="ml-[14px]">Description</h4>
            </div>
            <div className="flex flex-row flex-wrap items-start justify-center ">
              <div className=" h-[198px] min-w-0 flex-1 overflow-y-auto break-words">
                <h4 className="mb-[10px] ml-[14px] mt-[10px]">Request Body</h4>
                <h4 className="mb-[10px] ml-[14px] mt-[10px]">{"{"}</h4>
                <div className="ml-[34px]">{formatRequestBody(apiRequest)}</div>
                <h4 className="mb-[10px] ml-[14px] mt-[10px]">{"}"}</h4>
              </div>
              <div className="h-[198px] border-r-[2px]"></div>
              <div className="h-[198px] min-w-0 flex-1 overflow-y-auto break-words">
                <h4 className="mb-[10px] ml-[14px] mt-[10px]">Response</h4>
                <h4 className="mb-[10px] ml-[14px] mt-[10px]">{"{"}</h4>
                <h4 className="ml-[34px] ">리스폰스 내용</h4>
                <h4 className="mb-[10px] ml-[14px] mt-[10px]">{"}"}</h4>
              </div>
            </div>
            <div className="[239px] flex h-[80px] items-center justify-center">
              <img
                src="/asset/project/project-up-pointer.svg"
                className="h-3 cursor-pointer "
                alt="project-down-pointer"
                onClick={toggleDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiBox;
