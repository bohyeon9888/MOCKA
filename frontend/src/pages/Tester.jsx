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
import filterTabs from "../utils/filterTabs";
import Spinner from "../components/Spinner";

export default function Tester({ project }) {
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(-1);
  const { projectId } = useParams();
  const savedTabs =
    localStorage?.tabs &&
    JSON.parse(localStorage.tabs) &&
    JSON.parse(localStorage.tabs)[projectId];
  // const filteredTabs = filterTabs(savedTabs, project);
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
  const [activeText, setActiveText] = useState("Headers");
  const texts = ["Headers", "Query Parameters", "Path Variables", "Body"];
  const handleTextClick = (Text) => {
    setActiveText(Text);
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleApiCopyClick = () => {
    navigator.clipboard.writeText(baseUrl + document?.apiUriStr);
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
        } else
          return [
            ...tabs,
            {
              id: data.apiId,
              groupId: searchParams.get("groupId"),
              type: data.apiMethod.toUpperCase(),
              title: data.name,
            },
          ];
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
        setIsLoading(false);
        setResponse({ status, data });
      })
      .catch((e) => {
        setResponse(e);
      });
  };

  if (tabs.length === 0)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-2 font-semibold text-gray-500">
          Please select the API from the sidebar
        </div>
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
              <h4 className="ml-[14px]">Description</h4>
              <div className="ml-4 text-gray-700">
                {document?.description ? document?.description : ""}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex h-[198px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">Request Body</h4>
                <PrettyJson data={formatRequestBody(document?.apiRequests)} />
              </div>
              <div className="h-[198px] border-r-[2px]"></div>
              <div className="flex h-[198px] flex-1 flex-col overflow-auto p-[14px]">
                <h4 className="mb-2">Response Body</h4>
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
                <h2>Request</h2>
                <h4 className="mt-[8px] text-gray-400">
                  If use mock data templates, request will automatically be
                  filled with templated mock data when sent.
                </h4>
              </div>
              <div className="flex items-center">
                <img
                  src="/asset/tester/tester-template-plus.svg"
                  className="ml-4 mr-[10px] h-[14px] cursor-pointer"
                  alt="tester-template-plus"
                />
                <input
                  className="mr-[10px] h-[30px] w-[200px] rounded-[4px] border-[1px] border-gray-400 pl-[8px] text-[12px]"
                  placeholder="Template Name"
                />
                <Button type="Save" />
              </div>
            </div>
            {/* Headers, Query Params, Path Variables, Body 선택 */}
            <div className="my-[14px] flex h-[30px] w-[500px] justify-between">
              {texts.map((text) => (
                <h3
                  key={text}
                  className={combineClassName(
                    "cursor-pointer duration-200",
                    activeText === text
                      ? "text-black opacity-100"
                      : "opacity-50 hover:opacity-70",
                  )}
                  style={{
                    position: "relative",
                    color: activeText === text ? "black" : "inherit",
                    textDecoration: activeText === text ? "none" : "initial",
                  }}
                  onClick={() => handleTextClick(text)}
                >
                  {text}
                  <span
                    className={combineClassName(
                      "opacity-90 duration-150",
                      text === activeText ? "left-0 w-full" : "left-1/2 w-0",
                    )}
                    style={{
                      position: "absolute",
                      bottom: 4, // 밑줄을 더 아래로 떨어지게
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
                <h2>Response</h2>
                <img
                  src="/asset/tester/tester-copy.svg"
                  className="mt-2 h-4 cursor-pointer"
                  onClick={handleResponseCopyClick}
                />
              </div>
              <div className="mt-[20px] flex h-[180px] w-[1000px] border-2 border-gray-200 bg-white p-[14px]">
                {isLoading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <PrettyJson data={response} />
                )}
              </div>
              <div className="mt-[20px] flex justify-end">
                <Button type="Send" onClick={sendMethod} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
