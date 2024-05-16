// src/pages/Sidebar.js
import { useState } from "react";
import { useModalStore, useProjectStore, useUserStore } from "../store";
import LoginModal from "./modal/LoginModal";
import GroupList from "./sidebar/GroupList";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function Sidebar() {
  const { openModal } = useModalStore();
  const { recentProjectList, project } = useProjectStore();
  const [isRecentsOpen, setIsRecentsOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const { user } = useUserStore();
  const { language } = useLanguage();

  const translations = {
    ko: {
      projectList: "프로젝트 목록",
      recents: "최근 항목",
      signIn: "로그인",
    },
    en: {
      projectList: "PROJECT LIST",
      recents: "RECENTS",
      signIn: "Sign in",
    },
  };

  const t = translations[language];

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
    <aside
      style={{
        height: "calc(100vh - 44px)",
      }}
      className="flex w-[216px] shrink-0 flex-col items-center space-y-3 bg-secondary-color py-5"
    >
      <div className="flex h-10 justify-center">
        <h5 className="text-center text-3 font-bold leading-10 text-gray-700">
          {project ? project.projectName : t.projectList}
        </h5>
      </div>
      <div className="h-[1px] w-[170px] items-center border border-dashed bg-sidebar-division-color" />
      <div
        className="flex w-full flex-col px-3"
        style={{
          height: "calc(100% - 124px)",
        }}
      >
        {!project && (
          <>
            <div
              className="flex w-full cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300"
              onClick={toggleRecents}
            >
              <div className="mr-7 w-3">
                {isRecentsOpen ? (
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
              <h5 className="font-bold text-gray-700">{t.recents}</h5>
            </div>
            <div className="pl-6">
              {isRecentsOpen &&
                recentProjectList.map(({ projectId, projectName }) => (
                  <Link
                    to={`/project/${projectId}`}
                    key={projectId}
                    className="mt-2 flex cursor-pointer rounded-md p-2.5 px-2 text-white duration-300 hover:bg-gray-300"
                  >
                    <h5 className="truncate font-bold text-gray-700">
                      {projectName}
                    </h5>
                  </Link>
                ))}
            </div>
          </>
        )}
        {project && <GroupList />}
      </div>
      <div className="h-[1px] w-[170px] items-center bg-sidebar-division-color" />
      <div
        className="flex h-10 w-[155px] cursor-pointer items-center"
        onClick={openLoginModal}
      >
        <img
          src={user ? user.profile : "/asset/sidebar/sidebar-profile.svg"}
          className="h-10 rounded-full"
          alt="sidebar-profile"
        />
        <h5 className="my-1 ml-2 w-full shrink text-center text-[13px] font-bold text-gray-700">
          {user ? user.nickname : t.signIn}
        </h5>
      </div>
    </aside>
  );
}

export default Sidebar;
