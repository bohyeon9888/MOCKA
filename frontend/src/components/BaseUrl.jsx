import { React, useState } from "react";

function BaseUrl() {
  const [url, setUrl] = useState("https://finapi.p.ssafy.io/ssafy"); //나중에 받아오는 걸로 바꾸기

  const handleSaveClick = () => {
    console.log("Saved URL : ", url); //잘 저장되네 :)
    localStorage.setItem("baseUrl", url); // 로컬 스토리지에 저장 (확인용)
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("복사됨", url);
      })
      .catch((err) => {
        console.error("복사 안됨.", err);
      });
  };

  return (
    <div className="relative flex h-[34px] w-[300px] items-center">
      <div className="absolute left-[8px] top-[-3px] z-10 bg-white px-[2px]">
        <p className="text-[8px] font-semibold">Base URL</p>
      </div>
      <div className="relative flex w-full items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-[34px] w-full rounded-[6px] border-[1px] border-gray-500 pl-[10px] pr-[50px] text-[12px]"
          placeholder="Please enter the base url"
        />
        <div className="absolute right-[10px] flex">
          <div className="cursor-pointer" onClick={handleSaveClick}>
            <img
              src="/asset/tester/tester-save.svg"
              className="mr-[10px] h-3"
              alt="tester-save"
            />
          </div>
          <div className="cursor-pointer" onClick={handleCopyClick}>
            <img src="/asset/tester/tester-copy.svg" className="h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseUrl;
