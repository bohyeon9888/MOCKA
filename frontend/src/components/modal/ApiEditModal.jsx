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

export default function ApiEditModal() {
  const [document, setDocument] = useState({
    apiMethod: "GET",
    apiUri: "/user/{userId}?name=String&age=int",
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

  useEffect(() => {
    if (!isValidURI(document.apiUri)) return;

    setParameters(parseQueryParameters(document.apiUri));
    setDocument((document) => {
      const newPathVariableArr = parsePathVariables(document.apiUri);
      const mergedPathVariable = mergePathVariables(
        document.apiPathVariable,
        newPathVariableArr,
      );
      return { ...document, apiPathVariable: mergedPathVariable };
    });
  }, [document.apiUri]);

  return (
    <div className="flex flex-col space-y-[27px] overflow-y-scroll px-5">
      <ContentBox
        title="API Path URL"
        description="Enter meaningful resource name, it will be used to generate API
            endpoints."
      >
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
        title="Query Parameters"
        description="Define the data types for the query string parameters."
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
      <ContentBox
        title="Path Variables"
        description="Define the data types for the path variables."
      >
        <PathVariableEditor
          pathVariable={document.apiPathVariable}
          setPathVariableType={setPathVariableType}
        />
      </ContentBox>
      <ContentBox
        title="Request Body"
        description="Define Resource template, it will be used to generate mock data."
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
      <ContentBox
        title="Response Body"
        description="Define Resource template, it will be used to generate mock data."
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
    </div>
  );
}
