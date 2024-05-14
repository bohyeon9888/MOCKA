import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getApi } from "../apis/api";

export default function Tester() {
  const [searchParams] = useSearchParams();
  const { projectId } = useParams();
  const apiId = searchParams.get("apiId");
  const [document, setDocument] = useState();

  useEffect(() => {
    if (!apiId) return;

    getApi({ projectId, apiId }).then((data) => {
      setDocument(data);
    });
  }, [apiId]);

  return <div>{document}</div>;
}
