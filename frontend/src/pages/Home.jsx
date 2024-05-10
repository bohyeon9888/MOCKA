import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import Button from "../components/button/Button.jsx";
import Project from "../components/button/Project";
import { useProjectStore } from "../store";

import {
  createProject,
  getProjectList,
  getRecentProjectList,
} from "../apis/project.js";

function Home() {
  const [visibility, setVisibility] = useState("Select");
  const [projectName, setProjectName] = useState("");
  const [commonUri, setCommonUri] = useState("");
  const {
    project,
    setProject,
    projectList,
    setProjectList,
    setRecentProjectList,
  } = useProjectStore();
  const options = ["Private", "Public", "Teams"];

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
      visibility === "Select" ||
      projectName.trim() === "" ||
      commonUri.trim() === ""
    )
      return;
    createProject({ projectName, commonUri, visibility }).then(() => {
      getProjectList().then((data) => {
        setProjectList(data);
      });
    });
  };

  return (
    <div className="flex h-full w-full items-center">
      <div className="mb-10 flex w-1/2 flex-col items-center justify-center">
        <div>
          <h2 className="tracking-[0.02em]">NEW PROJECT</h2>

          <div className="mt-[9px] h-[240px] w-[460px] rounded-[20px] border-2 border-gray-500 bg-white pl-[47px] pt-[27px]">
            <div className="absolute ml-[295px] mt-[150px]">
              <Button type="Create" onClick={createNewProject} />
            </div>
            <h5 className="tracking-[0.1em]">PROJECT NAME</h5>
            <input
              className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500 bg-white p-2"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
            <h5 className="mt-[15px] tracking-[0.1em]">COMMON URI</h5>
            <input
              className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500 bg-white p-2"
              value={commonUri}
              onChange={(e) => {
                setCommonUri(e.target.value);
              }}
            />
            <h5 className="mb-[4px] mt-[15px] tracking-[0.1em]">VISIBILITY</h5>
            <DropDown
              value={visibility}
              options={options}
              changeHandler={handleSelect}
              size="small"
            />
          </div>
        </div>
        <div className="mt-7">
          <h2 className="tracking-[-0.02em]">UPDATE HISTORY</h2>
          <div className="mt-[9px] h-[150px] w-[460px] rounded-[20px] border-2 border-gray-500 bg-white pl-[47px] pt-[25px]">
            <h4 className="mb-[10px] cursor-pointer">
              <Link
                to="/update-history"
                state={{
                  message: "v0.1 Mocka service officially launched!",
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                v0.1 Mocka service officially launched!
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
              <h2>No Projects</h2>
              <div className="mt-3 text-3 text-gray-500">
                You have no projects.
              </div>
              <div className="mt-1 text-3 text-gray-500">
                Please create a new project.
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
