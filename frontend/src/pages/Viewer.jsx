import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { prettyPrintJson } from "pretty-print-json";
import { useProjectStore } from "../store";
import { getProjectDetail } from "../apis/project";

export default function Viewer() {
  const { projectId } = useParams();
  const { project, setProject } = useProjectStore();
  const preRef = useRef();

  useEffect(() => {
    if (!project) {
      getProjectDetail(projectId).then((data) => {
        setProject(data);
        preRef.current.innerHTML = prettyPrintJson.toHtml(data, {
          linkUrls: true,
          linksNewTab: true,
          trailingCommas: true,
        });
      });
    } else {
      preRef.current.innerHTML = prettyPrintJson.toHtml(project, {
        linkUrls: true,
        linksNewTab: true,
        trailingCommas: true,
      });
    }
  }, []);

  return (
    <div className="relative h-full overflow-y-scroll">
      <pre ref={preRef} />
      <div className="fixed bottom-10 right-10 flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-700 pb-1 pl-[1px] text-1 text-white opacity-80 hover:opacity-100">
        +
      </div>
    </div>
  );
}
