// src/pages/Home.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import Button from "../components/button/Button.jsx";
import Project from "../components/button/Project";
import { useProjectStore } from "../store";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import {
  createProject,
  getProjectList,
  getRecentProjectList,
} from "../apis/project.js";

function Home() {
  const { language } = useLanguage();

  const translations = {
    ko: {
      updateMessage: "v0.1 모카 서비스 정식 출시!",
      newProject: "새 프로젝트",
      projectName: "프로젝트 이름",
      commonUri: "공통 URI",
      visibility: "공개 범위",
      updateHistory: "업데이트 내역",
      noProjects: "프로젝트 없음",
      noProjectsMessage: "프로젝트가 없습니다. 새 프로젝트를 만들어주세요.",
      create: "생성",
      select: "선택",
      options: ["비공개", "공개", "팀"],
    },
    en: {
      updateMessage: "v0.1 Mocka service officially launched!",
      newProject: "NEW PROJECT",
      projectName: "PROJECT NAME",
      commonUri: "COMMON URI",
      visibility: "VISIBILITY",
      updateHistory: "UPDATE HISTORY",
      noProjects: "No Projects",
      noProjectsMessage: "You have no projects. Please create a new project.",
      create: "Create",
      select: "Select",
      options: ["Private", "Public", "Teams"],
    },
  };

  const t = translations[language];
  const [visibility, setVisibility] = useState(t.select);
  const [projectName, setProjectName] = useState("");
  const [commonUri, setCommonUri] = useState("");
  const {
    project,
    setProject,
    projectList,
    setProjectList,
    setRecentProjectList,
  } = useProjectStore();

  function handleSelect(value) {
    setVisibility(value);
  }

  useEffect(() => {
    if (project) setProject(null);
    if (projectList && projectList.length > 0) return;
    getProjectList().then((data) => {
      setProjectList(data);
    });
    getRecentProjectList().then((data) => {
      setRecentProjectList(data);
    });
  }, []);

  const createNewProject = () => {
    if (
      !projectName ||
      !commonUri ||
      visibility === t.select ||
      projectName.trim() === "" ||
      commonUri.trim() === ""
    )
      return;
    createProject({ projectName, commonUri, visibility }).then(() => {
      setTimeout(() => {
        getProjectList().then((data) => {
          setProjectList(data);
        });
      }, 100);
    });
  };

  useEffect(() => {
    setVisibility(t.select); // Update the visibility state when the language changes
  }, [language]);

  return (
    <div className="flex h-full w-full items-center">
      <div className="mb-10 flex w-1/2 flex-col items-center justify-center">
        <div>
          <h2 className="tracking-[0.02em]">{t.newProject}</h2>

          <div className="mt-[9px] h-[240px] w-[460px] rounded-[20px] border-2 border-gray-500 bg-white pl-[47px] pt-[27px]">
            <div className="absolute ml-[295px] mt-[150px]">
              <Button type={t.create} onClick={createNewProject}>
                {t.create}
              </Button>
            </div>
            <h5 className="tracking-[0.1em]">{t.projectName}</h5>
            <input
              className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500 bg-white p-2"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
            <h5 className="mt-[15px] tracking-[0.1em]">{t.commonUri}</h5>
            <input
              className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500 bg-white p-2"
              value={commonUri}
              onChange={(e) => {
                setCommonUri(e.target.value);
              }}
            />
            <h5 className="mb-[4px] mt-[15px] tracking-[0.1em]">
              {t.visibility}
            </h5>
            <DropDown
              value={visibility}
              options={t.options}
              changeHandler={handleSelect}
              size="small"
            />
          </div>
        </div>
        <div className="mt-7">
          <h2 className="tracking-[-0.02em]">{t.updateHistory}</h2>
          <div className="mt-[9px] h-[150px] w-[460px] rounded-[20px] border-2 border-gray-500 bg-white pl-[47px] pt-[25px]">
            <h4 className="mb-[10px] cursor-pointer">
              <Link
                to="/update-history"
                state={{
                  message: t.updateMessage,
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {t.updateMessage}
              </Link>
            </h4>
          </div>
        </div>
      </div>
      <div className="p- flex w-1/2 flex-col items-center justify-center">
        <img
          src="/asset/home/home-up-pointer.svg"
          className="mx-auto w-[20px] cursor-pointer"
          alt="home-down-pointer"
        />
        <div className="mb-[30px] mt-[32px] flex h-[480px] flex-col space-y-4 overflow-y-scroll py-4 pr-3">
          {projectList.map(({ projectId, projectName, createdAt }) => (
            <Project
              key={projectId}
              projectId={projectId}
              title={projectName}
              date={createdAt}
            />
          ))}
          {projectList && projectList.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center">
              <h2>{t.noProjects}</h2>
              <div className="mt-3 text-3 text-gray-500">
                {t.noProjectsMessage}
              </div>
            </div>
          )}
        </div>
        <img
          src="/asset/home/home-down-pointer.svg"
          className="mx-auto  w-[20px] cursor-pointer"
          alt="home-up-pointer"
        />
      </div>
    </div>
  );
}

export default Home;
