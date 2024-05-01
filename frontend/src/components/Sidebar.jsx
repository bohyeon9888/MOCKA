import React, { useState } from "react";

function Sidebar() {
  const [isRecentsOpen, setIsRecentsOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);

  const toggleRecents = () => {
    setIsRecentsOpen(!isRecentsOpen);
  };

  const toggleTeams = () => {
    setIsTeamsOpen(!isTeamsOpen);
  };

  /*
              <li onClick={toggleMode} className="cursor-pointer">
              {isEditMode ? (
                <img
                  src="/public/asset/header/header-edit-mode.svg"
                  className="h-5 cursor-pointer"
                  alt="header-edit-mode"
                />
              ) : (
                <img
                  src="/public/asset/header/header-viewer-mode.svg"
                  className="h-5 cursor-pointer"
                  alt="header-edit-mode"
                />
              )}
            </li>
  */

  return (
    <aside className="sidebar relative bottom-0 top-0 h-full w-[216px] overflow-y-auto bg-gray-100 p-2 text-center lg:left-0">
      <div className="text-xl text-gray-700">
        <div className="mt-1 flex justify-center p-5">
          <h5 className="text-center font-bold text-gray-700">PROJECT LIST</h5>
        </div>
        <div className="mx-auto my-1 h-[1px] w-[170px] items-center border border-dashed bg-sidebar-division-color" />
      </div>
      <div className="mt-5">
        <div
          className="mt-4 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300"
          onClick={toggleRecents}
        >
          <div className="mr-7 w-3">
            {isRecentsOpen ? (
              <img
                src="/public/asset/sidebar/sidebar-down-pointer.svg"
                className="h-1.5 w-full"
                alt="sidebar-down-pointer"
              />
            ) : (
              <img
                src="/public/asset/sidebar/sidebar-right-pointer.svg"
                className="h-2.5 w-full"
                alt="sidebar-right-pointer"
              />
            )}
          </div>
          <h5 className="font-bold text-gray-700">RECENTS</h5>
        </div>
        {isRecentsOpen && (
          <div className="pl-12">
            <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300">
              <h5 className="ml-3 font-bold text-gray-700">Recent Item 1</h5>
            </div>
            <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300">
              <h5 className="ml-3 font-bold text-gray-700">Recent Item 2</h5>
            </div>
          </div>
        )}
        <div
          className="mt-4 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300"
          onClick={toggleTeams}
        >
          <div className="mr-7 w-3">
            {isTeamsOpen ? (
              <img
                src="/public/asset/sidebar/sidebar-down-pointer.svg"
                className="h-1.5 w-full"
                alt="sidebar-down-pointer"
              />
            ) : (
              <img
                src="/public/asset/sidebar/sidebar-right-pointer.svg"
                className="h-2.5 w-full"
                alt="sidebar-right-pointer"
              />
            )}
          </div>
          <h5 className="font-bold text-gray-700">TEAMS</h5>
        </div>
        {isTeamsOpen && (
          <div className="pl-12">
            <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300">
              <h5 className="ml-3 font-bold text-gray-700">Team Item 1</h5>
            </div>
            <div className="mt-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300">
              <h5 className="ml-3 font-bold text-gray-700">Team Item 2</h5>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full text-xl text-gray-700">
        <div className="mx-auto my-1 h-[1px] w-[170px] items-center bg-sidebar-division-color" />
        <div className="mt-1 flex justify-center p-5">
          <img
            src="/public/asset/sidebar/sidebar-profile.svg"
            className="absolute left-6 h-10 cursor-pointer"
            alt="sidebar-profile"
          />
          <h5 className="my-1 ml-2 text-center font-bold text-gray-700">
            Login
          </h5>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
