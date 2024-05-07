import React, { useState } from "react";
import { useModalStore, useProjectStore } from "../store";
import LoginModal from "./modal/LoginModal";

function Sidebar() {
  const { openModal } = useModalStore();
  const { recentProjectList } = useProjectStore;
  const [isRecentsOpen, setIsRecentsOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);

  const toggleRecents = () => {
    setIsRecentsOpen(!isRecentsOpen);
  };

  const toggleTeams = () => {
    setIsTeamsOpen(!isTeamsOpen);
  };

  const openLoginModal = () => {
    openModal("", <LoginModal />);
  };

  return (
    <aside className="flex h-full w-[216px] shrink-0 flex-col items-center space-y-5 bg-secondary-color py-5">
      <div className="flex h-10 justify-center">
        <h5 className="text-center text-4 font-bold leading-10 text-gray-700">
          PROJECT LIST
        </h5>
      </div>
      <div className="h-[1px] w-[170px] items-center border border-dashed bg-sidebar-division-color" />
      <div className="h-full w-full px-3">
        <div
          className="flex w-full cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300"
          onClick={toggleRecents}
        >
          <div className="mr-7 w-3">
            {isRecentsOpen ? (
              <img
                src="/asset/sidebar/sidebar-down-pointer.svg"
                className="h-1.5 w-full"
                alt="sidebar-down-pointer"
              />
            ) : (
              <img
                src="/asset/sidebar/sidebar-right-pointer.svg"
                className="h-2.5 w-full"
                alt="sidebar-right-pointer"
              />
            )}
          </div>
          <h5 className="font-bold text-gray-700">RECENTS</h5>
        </div>
        <div className="pl-6">
          {isRecentsOpen &&
            recentProjectList.map(({ projectId, projectName }) => (
              <div
                key={projectId}
                className="mt-2 flex cursor-pointer rounded-md p-2.5 px-2 text-white duration-300 hover:bg-gray-300"
              >
                <h5 className="truncate font-bold text-gray-700">
                  {projectName}
                </h5>
              </div>
            ))}
        </div>
        <div
          className="mt-4 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300"
          onClick={toggleTeams}
        >
          <div className="mr-7 w-3">
            {isTeamsOpen ? (
              <img
                src="/asset/sidebar/sidebar-down-pointer.svg"
                className="h-1.5 w-full"
                alt="sidebar-down-pointer"
              />
            ) : (
              <img
                src="/asset/sidebar/sidebar-right-pointer.svg"
                className="h-2.5 w-full"
                alt="sidebar-right-pointer"
              />
            )}
          </div>
          <h5 className="font-bold text-gray-700">TEAMS</h5>
        </div>
        {isTeamsOpen && (
          <div className="pl-6">
            <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-2 text-white duration-300 hover:bg-gray-300">
              <h5 className="truncate font-bold text-gray-700">Team Item 1</h5>
            </div>
            <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-2 text-white duration-300 hover:bg-gray-300">
              <h5 className="truncate font-bold text-gray-700">Team Item 2</h5>
            </div>
          </div>
        )}
      </div>
      <div className="h-[1px] w-[170px] items-center bg-sidebar-division-color" />
      <div
        className="flex w-[155px] cursor-pointer items-center"
        onClick={openLoginModal}
      >
        <img
          src="/asset/sidebar/sidebar-profile.svg"
          className="h-10"
          alt="sidebar-profile"
        />
        <h5 className="my-1 ml-2 w-full text-center text-[13px] font-bold text-gray-700">
          Sign in
        </h5>
      </div>
    </aside>
  );
}

export default Sidebar;
