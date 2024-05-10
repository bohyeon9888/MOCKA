import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { prettyPrintJson } from "pretty-print-json";
import parseResponse from "../utils/parseResponse";
import ApiBox from "../components/ApiBox";

export default function Viewer() {
  const location = useLocation();

  return (
    <div className="h-full overflow-y-scroll">
      <ApiBox></ApiBox>
    </div>
  );
}
