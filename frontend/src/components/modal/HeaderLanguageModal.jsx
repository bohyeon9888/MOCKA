// src/components/HeaderLanguageModal.js
import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

function HeaderLanguageModal() {
  const { setLanguage } = useLanguage();

  return (
    <div className="flex flex-col space-y-[27px] px-5">
      <div className="relative h-[120px] w-[120px] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] bg-secondary-color pt-[25px]">
        <div
          className="ml-[25px] flex cursor-pointer items-center"
          onClick={() => setLanguage("ko")}
        >
          <h4 className="font-medium">한국어</h4>
        </div>
        <div
          className="absolute left-0 right-0 mx-auto h-[1px] w-[90%] bg-gray-300"
          style={{ top: "50%" }}
        ></div>
        <div
          className="ml-[25px] mt-[40px] flex cursor-pointer items-center"
          onClick={() => setLanguage("en")}
        >
          <h4 className="font-medium">English</h4>
        </div>
      </div>
    </div>
  );
}

export default HeaderLanguageModal;
