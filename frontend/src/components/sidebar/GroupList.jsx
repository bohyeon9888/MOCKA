import { useEffect, useState } from "react";
import ApiItems from "../ApiItems";
import { useNavigate } from "react-router-dom";

export default function GroupList({ project }) {
  const navigate = useNavigate();
  const [selectedGroupId, setSelectedGroupId] = useState(-1);

  useEffect(() => {
    if (project)
      navigate(
        `project/${project.projectId}${selectedGroupId === -1 ? "" : `?groupId=${selectedGroupId}`}`,
      );
  }, [selectedGroupId]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex grow flex-col space-y-2 overflow-x-hidden overflow-y-scroll">
        {project.groups.map(({ groupId, groupName, groupUri, apiProjects }) => (
          <div key={groupId} className="">
            <div
              className="flex w-full cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300"
              onClick={() => {
                setSelectedGroupId(selectedGroupId === groupId ? -1 : groupId);
              }}
            >
              <div className="mr-3 w-3">
                {selectedGroupId === groupId ? (
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
              <h5 className="w-full grow truncate pr-4 font-bold text-gray-700">
                {groupName}
              </h5>
            </div>
            <div className="mt-2 flex flex-col space-y-2 pl-6">
              {selectedGroupId === groupId &&
                apiProjects.length > 0 &&
                apiProjects.map(({ apiId, apiMethod, apiUriStr }, idx) => (
                  <ApiItems
                    key={apiId}
                    apiMethod={apiMethod.toUpperCase()}
                    name={`api ${idx}`}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="ml-auto mr-auto mt-auto flex flex-row items-center opacity-60 duration-200 hover:opacity-100"
        type="button"
      >
        {/* <span className="mr-1 mt-[1px] flex size-[14px] items-center justify-center rounded-full bg-black pb-[2px] text-[13px] font-semibold leading-none text-white">
          +
        </span> */}
        <img
          className="mb-[1px] mr-1 size-[14px]"
          src="/asset/sidebar/sidebar-plus.svg"
        />
        <span className="text-[15px] font-semibold">Create New Group</span>
      </button>
    </div>
  );
}
