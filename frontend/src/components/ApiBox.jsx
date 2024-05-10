import { useState, useEffect, useRef } from "react";
import Method from "./Method";
import PrettyJson from "./PrettyJson";
import formatRequestBody from "../utils/formatRequestBody";
import formatResponseBody from "../utils/fromatResponseBody";
/**바꿀거 */
// 메소드 타입별로 placeholder 내용 다르게 -> 영어버전으로 바꾸기 🍒

function ApiBox({
  apiId,
  apiMethod,
  apiUriStr,
  apiResponseIsArray,
  apiResponseSize,
  name,
  description,
  apiPaths,
  apiRequests,
  apiResponses,
}) {
  const originalApiName = name; // api명세서 보고 변수로 바꾸기 🍒
  const [isDetailVisible, setIsDetailVisible] = useState(false); //자세히 보기 버튼
  const methodType = apiMethod.toUpperCase(); //method타입과 placeholder내용
  const [apiName, setApiName] = useState(originalApiName);
  const [inputValue, setInputValue] = useState(apiName); // 입력 필드 값 관리
  const [isSaved, setIsSaved] = useState(true); // apiName 저장 상태 관리
  const [apiUri] = useState(apiUriStr); //나중에 명세서 변수보고 바꾸기 🍒
  const [apiUriCopy, setApiUriCopy] = useState(apiUri); //api uri복사
  const [CopySuccess, setCopySuccess] = useState(false);

  const toggleDetails = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  //일반 vs 자세히 보기 div박스 크기 다르게
  const boxStyle = isDetailVisible
    ? {
        // width: "1400px",
        width: "80%",
        height: "485px",
        transition: "all 0.3s ease",
      }
    : {
        // width: "1400px",
        width: "80%",
        height: "120px",
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

  //apiUri 복사 - apiUri가 변경될 때마다 apiUriCopy를 업데이트
  useEffect(() => {
    setApiUriCopy(apiUri);
  }, [apiUri]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(apiUriCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 4000); // 4초 후 메시지 숨김
    } catch (err) {
      console.error("Copy fail. ´。＿。｀ : ", err);
      setCopySuccess(false);
    }
  };

  //apiName 실시간 확인 및 변경
  useEffect(() => {
    if (inputValue === apiName) {
      setIsSaved(true);
    }
  }, [inputValue, originalApiName]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsSaved(false); // 변경 시 저장 상태를 false로 설정
  };

  //엔터를 누르면 무조건 saved
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setApiName(inputValue); // 엔터 키가 눌리면 apiName 상태 업데이트
      setIsSaved(true); // 저장 상태를 true로 설정
    }
  };

  return (
    <div
      className="flex flex-col rounded-[15px] border-2 border-gray-200 bg-white p-8 pt-6"
      style={boxStyle}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="h-[30px] w-full rounded-[4px] border-[1px] border-gray-400 bg-white pl-[10px] pr-[100px] text-[12px]"
          placeholder={placeholderText}
        />
        {isSaved ? (
          <h6 className="ml-[-60px] text-green-400">saved</h6>
        ) : (
          <h6 className="ml-[-100px] text-red-400">press enter</h6>
        )}
      </div>
      <div className="mt-[13px] flex items-center">
        <Method type={methodType} />
        <p className="ml-[16px] font-medium">{apiUri}</p>
        <div className="flex-grow"></div>
        <div className="flex items-center">
          {/* 링크복사 */}
          {CopySuccess && (
            <h6 className="mr-[10px] text-green-400 opacity-100 transition-opacity">
              copied
            </h6>
          )}
          {!CopySuccess && (
            <h6 className="mr-[10px] text-green-400 opacity-0 transition-opacity ">
              copied
            </h6>
          )}
          <img
            src="/asset/project/project-copy.svg"
            className="mr-[17px] h-4 cursor-pointer"
            alt="project-copy"
            onClick={copy}
          />

          {/* 수정모달 */}
          <img
            src="/asset/project/project-edit.svg"
            className="mr-[18px] h-4 cursor-pointer"
            alt="project-edit"
          />
          {/* 자세히 보기 (위/아래화살표 아이콘) */}
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

      {/* 자세히 보기*/}
      {isDetailVisible && (
        <div className="transition-all-[0.9s ease]">
          <div className="mt-[20px] h-[339px] border-2 border-gray-200 bg-white">
            <div className="flex h-[38px] items-center border-b-[2px] border-gray-200">
              <h4 className="ml-[14px]">Description</h4>
              <div className="ml-4 text-gray-700">{description}</div>
            </div>
            <div className="flex flex-row">
              <div className="flex h-[298px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">Request Body</h4>
                <PrettyJson data={formatRequestBody(apiRequests)} />
              </div>
              <div className="h-[298px] border-r-[2px]"></div>
              <div className="flex h-[298px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">Response Body</h4>
                <PrettyJson
                  data={formatResponseBody(apiResponses, apiResponseIsArray)}
                />
              </div>
            </div>
            {/* <div className="[239px] flex h-[80px] items-center justify-center">
              <img
                src="/asset/project/project-up-pointer.svg"
                className="h-3 cursor-pointer "
                alt="project-down-pointer"
                onClick={toggleDetails}
              />
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiBox;
