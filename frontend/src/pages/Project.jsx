import { useParams, useSearchParams } from "react-router-dom";
import Document from "./Document";
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
    <div className="h-full w-full">
      {mode === "test" ? (
        project && <Tester project={project} />
      ) : (
        <Document project={project} />
      )}
    </div>
  );
}
