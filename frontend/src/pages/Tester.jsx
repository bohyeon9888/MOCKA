import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getApi } from "../apis/api";
import { sendRequest } from "../apis/test";
import { useProjectStore } from "../store";

export default function Tester() {
  const [searchParams] = useSearchParams();
  const { projectId } = useParams();
  const apiId = searchParams.get("apiId");
  const [document, setDocument] = useState(null);
  const { project } = useProjectStore();

  useEffect(() => {
    if (!apiId) return;

    getApi({ projectId, apiId }).then((data) => {
      setDocument(data);
    });
  }, [apiId]);

  const sendMethod = () => {
    if (!document) return;
    sendRequest({
      ...document,
      hashKey: project.projectHashKey,
      commonUri: project.commonUri,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={sendMethod}>
        Send
      </div>
    </div>
  );
}
