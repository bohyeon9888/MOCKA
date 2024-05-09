import { useEffect, useRef } from "react";
import { prettyPrintJson } from "pretty-print-json";

export default function PrettyJson({ data }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.innerHTML = prettyPrintJson.toHtml(data, {
      linkUrls: true,
      linksNewTab: true,
      trailingCommas: true,
    });
  }, []);

  return <pre ref={ref} className="flex-1 overflow-auto py-2" />;
}
