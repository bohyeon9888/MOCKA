import React from "react";
import { getProjectDetail } from "../../apis/project";
import { prettyPrintJson } from "pretty-print-json";
import { useNavigate } from "react-router-dom";

function Project({ title, date, projectId }) {
  const navigate = useNavigate();
  const timestamp = Math.floor(new Date() / 1000);
  const baseClassName =
    "flex h-[73px] w-[476px] shrink-0 cursor-pointer items-center justify-between rounded-[20px] border-2 border-box-border-color bg-white duration-200 hover:border-gray-500";
  var myDate = new Date(timestamp * 1000);
  var date =
    myDate.getFullYear() +
    "-" +
    (myDate.getMonth() + 1) +
    "-" +
    myDate.getDate() +
    " " +
    myDate.getHours() +
    ":" +
    myDate.getMinutes();

  /*프로젝트명, 시간 2024-05-05 05:05) */

  const onClick = () => {
    getProjectDetail(projectId).then((data) => {
      navigate("/viewer", {
        state: { data },
      });
    });
  };

  return (
    <div className={baseClassName} onClick={onClick}>
      <h2 className="ml-[50px] tracking-[-0.08em]">{title}</h2>
      <div className="mr-[50px] tracking-[-0.08em]">
        <h5 className="flex  justify-center font-medium">Recent update</h5>
        <h5 className="flex justify-center font-medium">{date}</h5>
      </div>
    </div>
  );
}

export default Project;
