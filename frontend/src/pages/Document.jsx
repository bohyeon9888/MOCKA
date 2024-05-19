import { useSearchParams } from "react-router-dom";
import { useModalStore, useProjectStore } from "../store";
import ApiListAll from "../components/ApiListAll";
import ApiListGroup from "../components/ApiListGroup";
import ApiEditModal from "../components/modal/ApiEditModal";

export default function Document({ project }) {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const group =
    groupId && project?.groups?.filter((group) => group.groupId == groupId)[0];
  const groupName = group && group.groupName;
  const groupUri = group && group.groupUri;
  const { openModal } = useModalStore();

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-scroll p-6 pb-[220px]">
      <h2 className="flex flex-row items-center">
        {project && <span>{project.projectName}</span>}
        {groupName && <span className="ml-2">{` / ${groupName}`}</span>}
        <span className="ml-4 rounded-[6px] bg-gray-100 px-2 py-[6px] font-Fira text-[18px] font-medium text-red-300">
          <span>{project?.commonUri}</span>
          <span className="ml-[2px]">{groupUri || ""}</span>
        </span>
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
