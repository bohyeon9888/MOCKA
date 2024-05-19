import RequestBodyBox from "./request/RequestBodyBox";
import RequestHeaderBox from "./request/RequestHeaderBox";
import RequestPathVariableBox from "./request/RequestPathVariableBox";
import RequestQueryParamsBox from "./request/RequestQueryParamsBox";

export default function RequestSettingBox({
  activeText,
  document,
  setDocument,
}) {
  const setHeaders = (headers) => {
    setDocument((state) => {
      return { ...state, headers };
    });
  };

  const setQueryParameters = (queryParameters) => {
    setDocument((state) => {
      return { ...state, queryParameters };
    });
  };

  const setPathVariables = (pathVariables) => {
    setDocument((state) => {
      return { ...state, pathVariables };
    });
  };

  const setBody = (body) => {
    setDocument((state) => {
      return { ...state, body };
    });
  };

  switch (activeText) {
    case "headers":
      return (
        <RequestHeaderBox headers={document?.headers} setHeaders={setHeaders} />
      );
    case "queryParameters":
      return (
        <RequestQueryParamsBox
          queryParameters={document?.queryParameters}
          setQueryParameters={setQueryParameters}
        />
      );
    case "pathVariables":
      return (
        <RequestPathVariableBox
          pathVariables={document?.pathVariables}
          setPathVariables={setPathVariables}
        />
      );
    case "body":
      return <RequestBodyBox body={document?.body} setBody={setBody} />;
    default:
      return null;
  }
}
