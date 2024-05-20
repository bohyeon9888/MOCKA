import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getApi } from "../apis/api";
import { sendRequest } from "../apis/test";
import BaseUrl from "../components/BaseUrl";
import Method from "../components/Method";
import PrettyJson from "../components/PrettyJson";
import formatRequestBody from "../utils/formatRequestBody";
import formatResponseBody from "../utils/formatResponseBody";
import Button from "../components/button/Button";
import combineClassName from "../utils/combineClassName";
import RequestSettingBox from "../components/RequestSettingBox";
import parseQueryParameters from "../utils/parseQueryParameters";
import setDefaultFakerJs, {
  setDefaultFakerJsBody,
} from "../utils/setDefaultFakerJs";
import TabBar from "../components/TabBar";
import Spinner from "../components/Spinner";
import { useLanguage } from "../contexts/LanguageContext";
import { makeFakeApiUri } from "../utils/makeFakeApiRequest";

export default function Tester({ project }) {
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(-1);
  const { projectId } = useParams();
  const savedTabs =
    localStorage?.tabs &&
    JSON.parse(localStorage.tabs) &&
    JSON.parse(localStorage.tabs)[projectId];
  const [tabs, setTabs] = useState(savedTabs || []);
  const apiId = searchParams.get("apiId");
  const [document, setDocument] = useState({
    headers: [],
    queryParameters: [],
    pathVariables: [],
    body: [],
  });
  const [response, setResponse] = useState(null);
  const [baseUrl, setBaseUrl] = useState("");
  const [activeText, setActiveText] = useState("headers");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { language } = useLanguage();

  const translations = {
    ko: {
      noSelect: "사이드바에서 API를 선택하세요.",
      description: "설명",
      // requestBody: "요청 본문",
      requestBody: "Request Body",
      // responseBody: "응답 본문",
      responseBody: "Response Body",
      request: "요청",
      response: "응답",
      templateInfo:
        "모의 데이터 템플릿을 사용하면 전송 시 요청이 템플릿된 모의 데이터로 자동 채워집니다.",
      templateName: "템플릿 이름",
      // headers: "헤더",
      headers: "Headers",
      // queryParameters: "쿼리 매개변수",
      queryParameters: "Query Parameters",
      // pathVariables: "경로 변수",
      pathVariables: "Path Variables",
      // body: "본문",
      body: "Body",
      saveButton: "저장",
      sendButton: "전송",
    },
    en: {
      noSelect: "Please select the API from the sidebar.",
      description: "Description",
      requestBody: "Request Body",
      responseBody: "Response Body",
      request: "Request",
      response: "Response",
      templateInfo:
        "If use mock data templates, request will automatically be filled with templated mock data when sent.",
      templateName: "Template Name",
      headers: "Headers",
      queryParameters: "Query Parameters",
      pathVariables: "Path Variables",
      body: "Body",
      saveButton: "Save",
      sendButton: "Send",
    },
  };

  const t = translations[language];
  const texts = [
    { key: "headers", label: t.headers },
    { key: "queryParameters", label: t.queryParameters },
    { key: "pathVariables", label: t.pathVariables },
    { key: "body", label: t.body },
  ];

  const handleTextClick = (key) => {
    setActiveText(key);
  };

  const handleApiCopyClick = () => {
    const apiUrl = makeFakeApiUri(
      document?.apiUriStr,
      document.queryParameters,
      document.pathVariables,
    );
    navigator.clipboard.writeText(baseUrl + project.commonUri + apiUrl);
  };

  const handleResponseCopyClick = () => {
    navigator.clipboard.writeText(JSON.stringify(response));
  };

  useEffect(() => {
    if (!apiId) return;

    getApi({ projectId, apiId }).then((data) => {
      setDocument({
        ...data,
        headers: [],
        pathVariables: setDefaultFakerJs(data.apiPaths),
        body: setDefaultFakerJsBody(data.apiRequests),
        queryParameters: setDefaultFakerJs(
          parseQueryParameters(data.apiUriStr),
        ),
      });
      setTabs((prev) => {
        const idList = prev.map(({ id }) => id);
        setSelectedTab(data.apiId);
        if (idList.includes(data.apiId)) {
          return prev;
        } else {
          return [
            ...tabs,
            {
              id: data.apiId,
              groupId: searchParams.get("groupId"),
              type: data.apiMethod.toUpperCase(),
              title: data.name,
            },
          ];
        }
      });

      setResponse(null);
    });
  }, [apiId]);

  useEffect(() => {
    setBaseUrl(
      project?.projectHashKey
        ? `https://${project?.projectHashKey}.mock-a.com`
        : "",
    );
  }, [project]);

  useEffect(() => {
    const savedTab =
      (localStorage?.tabs && JSON.parse(localStorage?.tabs)) || {};
    localStorage.setItem(
      "tabs",
      JSON.stringify({
        ...savedTab,
        [projectId]: tabs,
      }),
    );
  }, [tabs]);

  const resetBaseUrl = () => {
    setBaseUrl(`https://${project?.projectHashKey}.mock-a.com`);
  };

  const sendMethod = () => {
    if (!document || isLoading) return;
    setIsLoading(true);
    sendRequest({
      ...document,
      baseUrl,
      commonUri: project.commonUri,
    })
      .then(({ data, status }) => {
        setResponse({ status, data });
      })
      .catch((e) => {
        setResponse(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (tabs.length === 0)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-2 font-semibold text-gray-500">{t.noSelect}</div>
      </div>
    );

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-y-scroll">
      <TabBar
        tabs={tabs}
        setTabs={setTabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="my-8 flex max-w-[95%] items-center justify-center">
        <div className="w-full rounded-[15px] border-[2px] border-gray-300 px-8 pb-8">
          <div className="mt-[24px] flex items-center justify-between">
            <h2 onClick={sendMethod}>{document?.name}</h2>
            <BaseUrl
              baseUrl={baseUrl}
              setBaseUrl={setBaseUrl}
              resetBaseUrl={resetBaseUrl}
            />
          </div>
          <div className="flex items-center">
            <div className="mt-[10px] flex h-[40px] grow items-center rounded-[10px] bg-gray-100 pl-[8px] pr-[8px]">
              <Method type={document?.apiMethod?.toUpperCase() || "GET"} />
              <h4 className="ml-[10px]">
                {baseUrl + project?.commonUri + document?.apiUriStr}
              </h4>
            </div>
            <img
              src="/asset/tester/tester-copy.svg"
              className="ml-[18px] mt-[10px] h-4 cursor-pointer"
              onClick={handleApiCopyClick}
            />
          </div>

          {/* Request, Response박스 */}
          <div className="mt-[20px] h-[239px] border-2 border-gray-200 bg-white">
            <div className="flex h-[38px] items-center border-b-[2px] border-gray-200">
              <h4 className="ml-[14px]">{t.description}</h4>
              <div className="ml-4 text-gray-700">
                {document?.description ? document?.description : ""}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex h-[198px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">{t.requestBody}</h4>
                <PrettyJson data={formatRequestBody(document?.apiRequests)} />
              </div>
              <div className="h-[198px] border-r-[2px]"></div>
              <div className="flex h-[198px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">{t.responseBody}</h4>
                <PrettyJson
                  data={formatResponseBody(
                    document?.apiResponses,
                    document?.apiResponseIsArray,
                  )}
                />
              </div>
            </div>
          </div>

          {/* Request */}
          <div className="mt-[20px]">
            <div className="flex justify-between">
              <div>
                <h2>{t.request}</h2>
                <h4 className="mt-[8px] text-gray-400">{t.templateInfo}</h4>
              </div>
              <div className="flex items-center">
                <img
                  src="/asset/tester/tester-template-plus.svg"
                  className="ml-4 mr-[10px] h-[14px] cursor-pointer"
                  alt="tester-template-plus"
                />
                <input
                  className="mr-[10px] h-[30px] w-[200px] rounded-[4px] border-[1px] border-gray-400 pl-[8px] text-[12px]"
                  placeholder={t.templateName}
                />
                <Button type={t.saveButton} />
              </div>
            </div>
            {/* Headers, Query Params, Path Variables, Body 선택 */}
            <div
              className={combineClassName(
                "my-[14px] flex h-[30px] w-[500px]",
                language === "ko" ? "space-x-7" : "space-x-4",
              )}
            >
              {texts.map(({ key, label }) => (
                <h3
                  key={key}
                  className={combineClassName(
                    "cursor-pointer duration-200",
                    activeText === key
                      ? "text-black opacity-100"
                      : "opacity-50 hover:opacity-70",
                  )}
                  style={{
                    position: "relative",
                    color: activeText === key ? "black" : "inherit",
                    textDecoration: activeText === key ? "none" : "initial",
                  }}
                  onClick={() => handleTextClick(key)}
                >
                  {label}
                  <span
                    className={combineClassName(
                      "opacity-90 duration-150",
                      key === activeText ? "left-0 w-full" : "left-1/2 w-0",
                    )}
                    style={{
                      position: "absolute",
                      bottom: 4,
                      height: "2px",
                      backgroundColor: "black",
                    }}
                  />
                </h3>
              ))}
            </div>
            {/* 선택하고 밑에 생기는 박스들 만들기 */}
            <RequestSettingBox
              activeText={activeText}
              document={document}
              setDocument={setDocument}
            />
            {/* Response (실제 데이터 전송하고 응답값 받는 걸로 바꾸기)*/}
            <div className="mt-[20px] w-full">
              <div className="flex items-center justify-between">
                <h2>{t.response}</h2>
                <img
                  src="/asset/tester/tester-copy.svg"
                  className="mt-2 h-4 cursor-pointer"
                  onClick={handleResponseCopyClick}
                />
              </div>
              <div
                className={combineClassName(
                  "mt-[20px] flex  w-[1000px] border-2 border-gray-200 bg-white p-[14px] duration-200",
                  isExpanded ? "h-[500px]" : "h-[180px]",
                )}
              >
                {isLoading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <PrettyJson data={response} />
                )}
              </div>
              <div
                className="mt-2 flex w-full cursor-pointer justify-center p-2 opacity-70 hover:opacity-100"
                onClick={() => {
                  setIsExpanded((isExpanded) => !isExpanded);
                }}
              >
                <img
                  className="w-[20px]"
                  src={`/asset/project/project-${isExpanded ? "up" : "down"}-pointer.svg`}
                />
              </div>
              <div className="mt-[20px] flex justify-end">
                <Button type={t.sendButton} onClick={sendMethod} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
