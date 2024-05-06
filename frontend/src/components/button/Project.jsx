import React from "react";

function Project({ title, date }) {
  const timestamp = Math.floor(new Date() / 1000);
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
  return (
    <div className="mb-[35px] flex h-[73px] w-[476px] cursor-pointer items-center justify-between rounded-[20px] border-2 border-box-border-color bg-white">
      <h2 className="ml-[50px] tracking-[-0.08em]">{title}</h2>
      <div className="mr-[50px] tracking-[-0.08em]">
        <h5 className="flex  justify-center font-medium">Recent update</h5>
        <h5 className="flex justify-center font-medium">{date}</h5>
      </div>
    </div>
  );
}

export default Project;
