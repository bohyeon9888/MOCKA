import { useModalStore, useProjectStore } from "../../store";
import ApiItems from "../ApiItems";
import { useNavigate, useSearchParams } from "react-router-dom";
import GroupEditModal from "../modal/GroupEditModal";
import { useState } from "react";
import { deleteGroup } from "../../apis/group";
import { getProjectDetail } from "../../apis/project";
import { useLanguage } from "../../contexts/LanguageContext";
import deleteQueryParam from "../../utils/deleteQueryParam";
import updateQueryParam from "../../utils/updateQueryParam";

export default function GroupList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGroupId = searchParams.get("groupId");
  const { openModal } = useModalStore();
  const { project, setProject } = useProjectStore();
  const { language } = useLanguage();
  const [hoveredGroupId, setHoveredGroupId] = useState();

  const translations = {
    ko: {
      createNewGroup: "새 그룹 만들기",
    },
    en: {
      createNewGroup: "Create New Group",
    },
  };

  const t = translations[language];

  const onClickDeleteGroup = (groupId) => {
    deleteGroup({ projectId: project.projectId, groupId }).then(() => {
      getProjectDetail(project.projectId).then((data) => {
        setProject(data);
        if (groupId == selectedGroupId)
          navigate(`/project/${project.projectId}`);
      });
    });
  };

  const onClickGroup = (groupId) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("apiId");

    if (groupId == selectedGroupId) newSearchParams.delete("groupId");
    else newSearchParams.set("groupId", groupId);

    setSearchParams(newSearchParams);
  };

  return (
    <div
      className="flex w-full flex-col space-y-3"
      style={{
        height: "calc(100% - 27px)",
      }}
    >
      <div className="flex h-full flex-col space-y-2 overflow-x-hidden overflow-y-scroll">
        {project.groups.map(({ groupId, groupName, groupUri, apiProjects }) => (
          <div key={groupId}>
            <div
              className="flex w-full cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300"
              onClick={() => {
                onClickGroup(groupId);
              }}
              onMouseEnter={() => {
                setHoveredGroupId(groupId);
              }}
              onMouseLeave={() => {
                setHoveredGroupId(-1);
              }}
            >
              <div className="mr-3 w-3">
                {selectedGroupId == groupId ? (
                  <img
                    src="/asset/sidebar/sidebar-down-pointer.svg"
                    className="h-[6px] w-[12px]"
                    alt="sidebar-down-pointer"
                  />
                ) : (
                  <img
                    src="/asset/sidebar/sidebar-right-pointer.svg"
                    className="ml-[3px] h-[12px] w-[6px]"
                    alt="sidebar-right-pointer"
                  />
                )}
              </div>
              <h5 className="grow truncate pr-4 font-bold text-gray-700">
                {groupName}
              </h5>
              {hoveredGroupId === groupId && (
                <img
                  className="-mr-1 size-[12px] opacity-40 hover:opacity-100"
                  src="/asset/project/project-delete-bold.svg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickDeleteGroup(groupId);
                  }}
                />
              )}
            </div>
            <div className="mt-2 flex flex-col space-y-1 pl-6">
              {selectedGroupId == groupId &&
                apiProjects.length > 0 &&
                apiProjects.map(({ apiId, apiMethod, name }) => (
                  <ApiItems
                    key={apiId}
                    apiId={apiId}
                    apiMethod={apiMethod.toUpperCase()}
                    name={name}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="ml-auto mr-auto mt-auto flex h-[15px] flex-row items-center opacity-60 duration-200 hover:opacity-100"
        type="button"
        onClick={() => {
          openModal(t.createNewGroup, <GroupEditModal />);
        }}
      >
        <img
          className="mb-[1px] mr-1 size-[14px]"
          src="/asset/sidebar/sidebar-plus.svg"
        />
        <span className="text-[15px] font-semibold">{t.createNewGroup}</span>
      </button>
    </div>
  );
}
