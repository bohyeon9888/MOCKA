import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { prettyPrintJson } from "pretty-print-json";
import parseResponse from "../utils/parseResponse";

export default function Viewer() {
  const location = useLocation();
  const { data } = location.state;
  const preRef = useRef();

  useEffect(() => {
    preRef.current.innerHTML = prettyPrintJson.toHtml(parseResponse(data), {
      linkUrls: true,
      linksNewTab: true,
      trailingCommas: true,
    });
  }, []);

  return (
    <div className="h-full overflow-y-scroll">
      <pre ref={preRef} />
    </div>
  );
}
