<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
>>>>>>> 9ef52f9 (✨ feat: Main, Home, UpdateHistory 수정, ApiBox 수정중)
=======
>>>>>>> 9ef52f94bc706ad517db096bcabfab1ebee72e90
import DropDown from "../components/DropDown";
import Button from "../components/button/Button.jsx";
import Project from "../components/button/Project";

import { useModalStore, useProjectStore } from "../store";
import ApiEditModal from "../components/modal/ApiEditModal.jsx";
import { getProjectList, getRecentProjectList } from "../apis/project.js";

function Home() {
  const [selectedValue, setSelectedValue] = useState("Select"); //초기 선택값
  const { openModal } = useModalStore();
  const { projectList, setProjectList, setRecentProjectList } =
    useProjectStore();

  const options = ["Private", "Public", "Teams"];

  function handleSelect(value) {
    setSelectedValue(value);
  }

  useEffect(() => {
    if (projectList && projectList.length > 0) return;
    getProjectList().then((data) => {
      setProjectList(data);
    });
    getRecentProjectList().then((data) => {
      setRecentProjectList(data);
    });
  }, []);

  return (
    <div className="flex w-full ">
      <div className="ml-[60px] mr-[60px] mt-[60px] w-1/2 items-center justify-center p-4">
        <div className="">
          <h2 className="tracking-[0.02em]">NEW PROJECT</h2>

          <div className="mt-[9px] h-[240px] w-[460px] rounded-[20px] border-[2.5px] border-gray-500 bg-white pl-[47px] pt-[27px]">
            <div className="absolute ml-[295px] mt-[150px]">
              <Button
                type="Create"
                onClick={() => {
                  openModal("API Edit", <ApiEditModal />);
                }}
              />
            </div>
<<<<<<< HEAD
            <h5 className="tracking-[0.1em]">PROJECT NAME</h5>
            <input className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500 bg-white" />
            <h5 className="mt-[15px] tracking-[0.1em]">COMMON URL</h5>
            <input className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500 bg-white" />
            <h5 className="mb-[4px] mt-[15px] tracking-[0.1em]">VISIBILITY</h5>
=======
            <h5 className="tracking-[0.2em]">PROJECT NAME</h5>
            <input
              className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500 bg-white  pl-[10px] text-[12px] "
              placeholder="PROJECT NAME"
            />
            <h5 className="mt-[15px] tracking-[0.2em]">COMMON URL</h5>
            <input
              className="mt-[4px] h-[30px] w-[366px] place-content-start rounded-[4px] border-[1px] border-gray-500  bg-white pl-[10px] text-[12px]"
              placeholder="/api"
            />
            <h5 className="mb-[4px] mt-[15px] tracking-[0.2em]">VISIBILITY</h5>
>>>>>>> 9ef52f9 (✨ feat: Main, Home, UpdateHistory 수정, ApiBox 수정중)
            <DropDown
              value={selectedValue}
              options={options}
              changeHandler={handleSelect}
              size="small"
            />
          </div>

          <div className="mt-7">
<<<<<<< HEAD
<<<<<<< HEAD
            <h2 className="tracking-[-0.02em]">UPDATE HISTORY</h2>

            <div className="mt-[9px] h-[220px] w-[460px] rounded-[20px] border-[2.5px] border-black bg-black">
              <img
                src="/asset/etc/friend.jpg"
                className="h-full w-full rounded-[20px]"
                alt="spcae"
              />
=======
            <h2 className="tracking-[0.08em]">UPDATE HISTORY</h2>

=======
            <h2 className="tracking-[0.08em]">UPDATE HISTORY</h2>

>>>>>>> 9ef52f94bc706ad517db096bcabfab1ebee72e90
            <div className="mt-[9px] h-[150px] w-[460px] rounded-[20px] border-[2.5px] border-gray-500 bg-white pl-[47px] pt-[25px]">
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
<<<<<<< HEAD
>>>>>>> 9ef52f9 (✨ feat: Main, Home, UpdateHistory 수정, ApiBox 수정중)
=======
>>>>>>> 9ef52f94bc706ad517db096bcabfab1ebee72e90
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[60px] mr-[60px] mt-[40px] flex w-1/2  p-4">
        <div className="">
          <img
            src="/asset/home/home-up-pointer.svg"
            className="mx-auto w-[30px] cursor-pointer"
            alt="home-down-pointer"
          />
          <div className="mb-[30px] mt-[32px] flex h-[535px] flex-col space-y-4 overflow-y-scroll py-4 pr-3">
            {projectList.map(({ projectId, projectName }) => (
              <Project
                key={projectId}
                projectId={projectId}
                title={projectName}
                date=""
              />
            ))}
          </div>
          <img
            src="/asset/home/home-down-pointer.svg"
            className="mx-auto  w-[30px] cursor-pointer"
            alt="home-up-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
