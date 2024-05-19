import { useState, useEffect } from "react";
import Method from "./Method";
import PrettyJson from "./PrettyJson";
import formatRequestBody from "../utils/formatRequestBody";
import formatResponseBody from "../utils/formatResponseBody";
import { deleteApi } from "../apis/api";
import ApiDeleteModal from "./modal/ApiDeleteModal";
import { useModalStore, useProjectStore } from "../store";
import { useParams } from "react-router-dom";
import ApiEditModal from "./modal/ApiEditModal";
import ApiUpdateModal from "./modal/ApiUpdateModal";
import parseResponse from "../utils/parseResponse";
import convertBody from "../utils/convertBody";
import { useLanguage } from "../contexts/LanguageContext";

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
  groupId,
}) {
  const originalApiName = name;
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const methodType = apiMethod.toUpperCase();
  const [apiName, setApiName] = useState(originalApiName);
  const [inputValue, setInputValue] = useState(apiName);
  const [isSaved, setIsSaved] = useState(true);
  const [apiUri] = useState(apiUriStr);
  const [apiUriCopy, setApiUriCopy] = useState(apiUri);
  const [CopySuccess, setCopySuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { openModal } = useModalStore();
  const { projectId } = useParams();

  const { language } = useLanguage();

  const translations = {
    ko: {
      ApiUpdateModal: "API 편집",
      ApiDelete: "Api 삭제",
      getPlaceholder: "사용자 정보 조회 => API 이름 or 간단 설명 작성",
      postPlaceholder: "사용자 등록",
      putPlaceholder: "사용자 정보 변경",
      deletePlaceholder: "사용자 삭제",
      patchPlaceholder: "사용자 상태 변경",
      copied: "복사됨",
      editApi: "API 수정",
      deleteApi: "API 삭제",
      api: "API",
      description: "설명",
      // requestBody: "요청 본문",
      requestBody: "Request Body",
      // responseBody: "응답 본문",
      responseBody: "Response Body",
    },
    en: {
      ApiUpdateModal: "Edit API",
      ApiDelete: "Delete Api",
      getPlaceholder:
        "Retrieve user information => Write API name or short description",
      postPlaceholder: "Register user",
      putPlaceholder: "Update user information",
      deletePlaceholder: "Delete user",
      patchPlaceholder: "Change user status",
      copied: "copied",
      editApi: "Edit API",
      deleteApi: "Delete API",
      api: "API",
      description: "Description",
      requestBody: "Request Body",
      responseBody: "Response Body",
    },
  };

  const t = translations[language];

  const toggleDetails = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  const boxStyle = isDetailVisible
    ? {
        width: "80%",
        height: "485px",
        transition: "all 0.3s ease",
      }
    : {
        width: "80%",
        height: "110px",
        transition: "all 0.3s ease",
      };

  let placeholderText;

  switch (methodType) {
    case "GET":
      placeholderText = t.getPlaceholder;
      break;
    case "POST":
      placeholderText = t.postPlaceholder;
      break;
    case "PUT":
      placeholderText = t.putPlaceholder;
      break;
    case "DELETE":
      placeholderText = t.deletePlaceholder;
      break;
    case "PATCH":
      placeholderText = t.patchPlaceholder;
      break;
  }

  useEffect(() => {
    setApiUriCopy(apiUri);
  }, [apiUri]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(apiUriCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 4000);
    } catch (err) {
      console.error("Copy failed: ", err);
      setCopySuccess(false);
    }
  };

  useEffect(() => {
    if (inputValue === apiName) {
      setIsSaved(true);
    }
  }, [inputValue, originalApiName]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsSaved(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setApiName(inputValue);
      setIsSaved(true);
    }
  };

  const openApiEditModal = () => {
    openModal(t.ApiUpdateModal, <ApiUpdateModal />, {
      document: {
        name,
        description,
        apiId,
        apiMethod: apiMethod.toUpperCase(),
        apiUri: apiUriStr,
        apiRequest: convertBody(apiRequests),
        apiResponse: convertBody(apiResponses),
        apiResponseIsArray,
        apiResponseSize,
        groupId,
        apiPathVariable: apiPaths.map(({ id, key, data }) => {
          return {
            id,
            key,
            type: data,
          };
        }),
      },
    });
  };

  const openApiDeleteModal = () => {
    openModal(t.ApiDelete, <ApiDeleteModal />, { apiName, projectId, apiId });
  };

  return (
    <div
      className="flex flex-col rounded-[15px] border-2 border-gray-200 bg-white p-8 pt-6"
      style={boxStyle}
    >
      <div className="flex items-center">
        {editMode ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="h-[30px] w-full rounded-[4px] border-[1px] border-gray-400 bg-white pl-[10px] pr-[100px] text-[12px]"
            placeholder={placeholderText}
          />
        ) : (
          <h3>{name || t.api}</h3>
        )}
      </div>
      <div className="mt-[13px] flex items-center">
        <Method type={methodType} />
        <p className="ml-[16px] font-medium">{apiUri}</p>
        <div className="flex-grow"></div>
        <div className="flex items-center">
          {CopySuccess && (
            <h6 className="mr-[10px] text-green-400 opacity-100 transition-opacity">
              {t.copied}
            </h6>
          )}
          {!CopySuccess && (
            <h6 className="mr-[10px] text-green-400 opacity-0 transition-opacity ">
              {t.copied}
            </h6>
          )}
          <img
            src="/asset/project/project-copy.svg"
            className="mr-[17px] h-4 cursor-pointer"
            alt="project-copy"
            onClick={copy}
          />

          <img
            src="/asset/project/project-edit.svg"
            className="mr-[18px] h-4 cursor-pointer"
            alt="project-edit"
            onClick={openApiEditModal}
          />

          <img
            src="/asset/project/project-delete.svg"
            className="mr-[18px] h-4 cursor-pointer"
            alt="project-delete"
            onClick={openApiDeleteModal}
          />

          {isDetailVisible ? (
            <img
              src="/asset/project/project-up-pointer.svg"
              className="h-3 cursor-pointer"
              alt="project-up-pointer"
              onClick={toggleDetails}
            />
          ) : (
            <img
              src="/asset/project/project-down-pointer.svg"
              className="h-3 cursor-pointer"
              alt="project-down-pointer"
              onClick={toggleDetails}
            />
          )}
        </div>
      </div>

      {isDetailVisible && (
        <div className="transition-all-[0.9s ease]">
          <div className="mt-[20px] h-[339px] border-2 border-gray-200 bg-white">
            <div className="flex h-[38px] items-center border-b-[2px] border-gray-200">
              <h4 className="ml-[14px]">{t.description}</h4>
              <div className="ml-4 text-gray-700">{description}</div>
            </div>
            <div className="flex flex-row">
              <div className="flex h-[298px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">{t.requestBody}</h4>
                <PrettyJson data={formatRequestBody(apiRequests)} />
              </div>
              <div className="h-[298px] border-r-[2px]"></div>
              <div className="flex h-[298px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">{t.responseBody}</h4>
                <PrettyJson
                  data={formatResponseBody(apiResponses, apiResponseIsArray)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiBox;
