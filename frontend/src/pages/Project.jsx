import { useParams, useSearchParams } from "react-router-dom";
import Viewer from "./Viewer";
import Tester from "./Tester";
import { useEffect } from "react";
import { getProjectDetail } from "../apis/project";
import { useProjectStore } from "../store";

export default function Project() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const { projectId } = useParams();
  const { project, setProject } = useProjectStore();

  useEffect(() => {
    if (!project) {
      getProjectDetail(projectId).then((data) => {
        setProject(data);
      });
    }
  }, [project]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-scroll p-6 pb-[220px]">
      {mode === "test" ? <Tester /> : <Viewer />}
    </div>
  );
}
