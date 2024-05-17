import { useState, useEffect } from "react";
import Input from "../Input";
import MethodOptions from "../MethodOptions";
import ContentBox from "../ContentBox";
import QueryStringEditor from "../editor/QueryStringEditor";
import isValidURI from "../../utils/validateURI";
import PathVariableEditor from "../editor/PathVariableEditor";
import parseQueryParameters from "../../utils/parseQueryParameters";
import parsePathVariables from "../../utils/parsePathVariables";
import mergePathVariables from "../../utils/mergePathVariables";
import RequestBodyEditor from "../editor/RequestBodyEditor";
import ResponseBodyEditor from "../editor/ResponseBodyEditor";
import { createApi } from "../../apis/api";
import Button from "../button/Button";
import GroupSelect from "../GroupSelect";
import { useSearchParams } from "react-router-dom";
import { useModalStore, useProjectStore } from "../../store";
import { getProjectDetail } from "../../apis/project";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ApiEditModal() {
  const [searchParams] = useSearchParams();
  const { project, setProject } = useProjectStore();
  const [groupId, setGroupId] = useState(searchParams.get("groupId"));
  const { closeModal } = useModalStore();
  const [document, setDocument] = useState({
    name: "",
    description: "",
    apiMethod: "GET",
    apiUri: "",
    apiRequest: [],
    apiResponse: [],
    apiResponseIsArray: false,
    apiResponseSize: 0,
    apiPathVariable: [],
  });
  const [parameters, setParameters] = useState([]);

  const uriChangeHandler = (e) => {
    setDocument((document) => {
      return { ...document, apiUri: e.target.value };
    });
  };

  const setPathVariableType = (idx, type) => {
    setDocument((document) => {
      const newPathVariable = [...document.apiPathVariable];
      newPathVariable[idx].type = type;
      return {
        ...document,
        apiPathVariable: newPathVariable,
      };
    });
  };

  const onClickButton = () => {
    const commonUri = project.groups.filter(
      (group) => group.groupId == groupId,
    )[0]?.groupUri;

    const convertedDocument = {
      ...document,
      apiUri: (commonUri || "") + document.apiUri,
    };

    createApi({
      projectId: project.projectId,
      document: convertedDocument,
      groupId,
    }).then(() => {
      getProjectDetail(project.projectId).then((data) => {
        setProject(data);
        closeModal();
      });
    });
  };

  function initPathVariables(apiUri) {
    const newPathVariableArr = parsePathVariables(apiUri);
    const mergedPathVariable = mergePathVariables([], newPathVariableArr);

    return mergedPathVariable;
  }

  useEffect(() => {
    if (!isValidURI(document.apiUri)) return;

    setParameters(parseQueryParameters(document.apiUri));
    const newPathVariableArr = parsePathVariables(document.apiUri);
    const mergedPathVariable = mergePathVariables(
      document.apiPathVariable,
      newPathVariableArr,
    );
    setDocument((prev) => {
      return { ...prev, apiPathVariable: mergedPathVariable };
    });
  }, [document.apiUri]);

  useEffect(() => {
    setDocument({
      ...document,
      apiResponseSize: document.apiResponseIsArray ? 5 : -1,
    });
  }, [document.apiResponseIsArray]);

  const { language } = useLanguage();

  const translations = {
    ko: {
      nameTitle: "API 이름",
      descriptionTitle: "API 설명",
      groupSelectTitle: "그룹 선택",
      groupSelectDescription:
        "그룹을 선택하면, 그룹의 공통 URI가 API 경로의 시작 부분에 추가됩니다.",
      apiPathTitle: "API 경로 URL",
      apiPathDescription:
        "의미 있는 자원 이름을 입력하세요. 이는 API 엔드포인트를 생성하는 데 사용됩니다.",
      // queryParamsTitle: "쿼리 매개변수",
      queryParamsTitle: "Query Parameters",
      queryParamsDescription:
        "쿼리 문자열 매개변수의 데이터 유형을 정의하세요.",
      // pathVarsTitle: "경로 변수",
      pathVarsTitle: "Path Variables",
      pathVarsDescription: "경로 변수의 데이터 유형을 정의하세요.",
      // requestBodyTitle: "요청 본문",
      requestBodyTitle: "Request Body",
      requestBodyDescription:
        "리소스 템플릿을 정의하세요. 이는 모의 데이터를 생성하는 데 사용됩니다.",
      // responseBodyTitle: "응답 본문",
      responseBodyTitle: "Response Body",
      responseBodyDescription:
        "리소스 템플릿을 정의하세요. 이는 모의 데이터를 생성하는 데 사용됩니다.",
      applyButton: "생성",
    },
    en: {
      nameTitle: "API Name",
      descriptionTitle: "API Description",
      groupSelectTitle: "Group Select",
      groupSelectDescription:
        "When a group is selected, the group's common URI is added to the beginning of the API path.",
      apiPathTitle: "API Path URL",
      apiPathDescription:
        "Enter meaningful resource name, it will be used to generate API endpoints.",
      queryParamsTitle: "Query Parameters",
      queryParamsDescription:
        "Define the data types for the query string parameters.",
      pathVarsTitle: "Path Variables",
      pathVarsDescription: "Define the data types for the path variables.",
      requestBodyTitle: "Request Body",
      requestBodyDescription:
        "Define Resource template, it will be used to generate mock data.",
      responseBodyTitle: "Response Body",
      responseBodyDescription:
        "Define Resource template, it will be used to generate mock data.",
      applyButton: "Create",
    },
  };

  const t = translations[language];

  return (
    <div className="flex min-w-[700px] max-w-[700px] flex-col space-y-[27px] overflow-y-scroll px-5">
      <ContentBox title={t.nameTitle} description="">
        <Input
          isFull
          value={document.name}
          changeHandler={(e) => {
            setDocument({
              ...document,
              name: e.target.value,
            });
          }}
        />
      </ContentBox>
      <ContentBox title={t.descriptionTitle} description="">
        <Input
          isFull
          value={document.description}
          changeHandler={(e) => {
            setDocument({
              ...document,
              description: e.target.value,
            });
          }}
        />
      </ContentBox>
      <ContentBox
        title={t.groupSelectTitle}
        description={t.groupSelectDescription}
      >
        <GroupSelect
          groupId={groupId}
          setGroupId={setGroupId}
          setDocument={setDocument}
        />
      </ContentBox>
      <ContentBox title={t.apiPathTitle} description={t.apiPathDescription}>
        <div className="relative w-full">
          <Input
            placeHolder="ex) /user/projects"
            isFull
            value={document.apiUri}
            changeHandler={uriChangeHandler}
            isValid={isValidURI(document.apiUri)}
            useBorder
          />
          <MethodOptions
            className="absolute right-2 top-1/2 -translate-y-1/2 font-Akshar"
            apiMethod={document.apiMethod}
            setApiMethod={(selectedApiMethod) => {
              setDocument((document) => {
                return { ...document, apiMethod: selectedApiMethod };
              });
            }}
          />
        </div>
      </ContentBox>
      <ContentBox
        title={t.queryParamsTitle}
        description={t.queryParamsDescription}
      >
        <QueryStringEditor
          parameters={parameters}
          apiUri={document.apiUri}
          setApiUri={(newApiUri) => {
            setDocument((document) => {
              return { ...document, apiUri: newApiUri };
            });
          }}
        />
      </ContentBox>
      <ContentBox title={t.pathVarsTitle} description={t.pathVarsDescription}>
        <PathVariableEditor
          pathVariable={document.apiPathVariable}
          setPathVariableType={setPathVariableType}
        />
      </ContentBox>
      {document.apiMethod !== "GET" && (
        <ContentBox
          title={t.requestBodyTitle}
          description={t.requestBodyDescription}
        >
          <RequestBodyEditor
            apiRequest={document.apiRequest}
            setApiRequest={(apiRequest) => {
              setDocument((document) => {
                return {
                  ...document,
                  apiRequest,
                };
              });
            }}
          />
        </ContentBox>
      )}
      <ContentBox
        title={t.responseBodyTitle}
        description={t.responseBodyDescription}
      >
        <ResponseBodyEditor
          apiResponse={document.apiResponse}
          apiResponseIsArray={document.apiResponseIsArray}
          apiResponseSize={document.apiResponseSize}
          setApiResponse={(apiResponse) => {
            setDocument((document) => {
              return {
                ...document,
                apiResponse,
              };
            });
          }}
          setApiResponseIsArray={(apiResponseIsArray) => {
            setDocument((document) => {
              return {
                ...document,
                apiResponseIsArray,
              };
            });
          }}
          setApiResponseSize={(apiResponseSize) => {
            setDocument((document) => {
              return {
                ...document,
                apiResponseSize,
              };
            });
          }}
        />
      </ContentBox>
      <div className="h-10 w-full" />
      <div className="flex w-full justify-end">
        <Button type={t.applyButton} onClick={onClickButton}>
          {t.applyButton}
        </Button>
      </div>
      <div className="h-2 w-full" />
    </div>
  );
}
