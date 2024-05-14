import { useSearchParams } from "react-router-dom";
import { useModalStore, useProjectStore } from "../store";
import ApiListAll from "../components/ApiListAll";
import ApiListGroup from "../components/ApiListGroup";
import ApiEditModal from "../components/modal/ApiEditModal";

export default function Viewer({
  description,
  apiRequests,
  apiResponses,
  apiResponseIsArray,
}) {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const { project } = useProjectStore();
  const group =
    groupId && project?.groups?.filter((group) => group.groupId == groupId)[0];
  const groupName = group && group.groupName;
  const { openModal } = useModalStore();

  return (
    <div>
      <h2>
        {project && <span>{project.projectName}</span>}
        {groupName && <span>{` / ${groupName}`}</span>}
      </h2>
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
