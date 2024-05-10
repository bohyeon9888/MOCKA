import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useModalStore, useProjectStore } from "../store";
import { getProjectDetail } from "../apis/project";
import ApiEditModal from "../components/modal/ApiEditModal";
import ApiListAll from "../components/ApiListAll";
import ApiListGroup from "../components/ApiListGroup";

export default function Viewer() {
  const [searchParams] = useSearchParams();
  const { projectId } = useParams();
  const { project, setProject } = useProjectStore();
  const groupId = searchParams.get("groupId");
  const group =
    groupId && project.groups.filter((group) => group.groupId == groupId)[0];
  const groupName = group && group.groupName;
  const { openModal } = useModalStore();

  console.log(project);

  useEffect(() => {
    if (!project) {
      getProjectDetail(projectId).then((data) => {
        setProject(data);
      });
    }
  }, [project]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-scroll p-6 pb-[220px]">
      <h1>
        {project && <span>{project.projectName}</span>}
        {groupName && <span>{` / ${groupName}`}</span>}
      </h1>
      {!groupId && project && project.groups && (
        <ApiListAll groups={project.groups} />
      )}
      {groupId && group && <ApiListGroup {...group} />}
      <div
        className="fixed bottom-10 right-12 flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-700 pb-1 pl-[1px] text-1 text-white opacity-80 drop-shadow-xl hover:opacity-100"
        onClick={() => {
          openModal("Create New API", <ApiEditModal />);
        }}
      >
        +
      </div>
    </div>
  );
}
