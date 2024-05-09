import React from "react";

function Tab({ type, isSelected, title }) {
  const getColorClass = (type) => {
    switch (type) {
      case "GET":
        return "bg-get-color";
      case "POST":
        return "bg-post-color";
      case "PUT":
        return "bg-put-color";
      case "DELETE":
        return "bg-delete-color";
      case "PATCH":
        return "bg-patch-color";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div
      className={`flex h-[36px] shrink-0 grow-0 cursor-pointer items-center justify-center bg-background-color text-primary-color
      ${isSelected === "true" ? "w-[134px]" : "w-[114px]"}`}
    >
      {/* <div
        className={`fixed ml-[16px] mr-[108px] flex h-[16px] w-[16px] shrink-0 grow-0 items-center justify-center rounded-[15px] text-white ${getColorClass(type)}`}
      > */}
      <div
        className={`absolute ml-[16px] mr-[108px] flex h-[16px] w-[16px] shrink-0 grow-0 items-center justify-center rounded-[15px] text-white ${getColorClass(type)}`}
      >
        <h5>{type[0]}</h5>
      </div>
      <h5 className="absolute ml-[5px] max-w-[75px] overflow-hidden text-ellipsis font-medium">
        {title}
      </h5>
      {isSelected === "true" ? (
        <img
          src="/asset/tester/tester-tap-close.svg"
          className="absolute ml-[108px] mr-[16px] h-2.5 shrink-0 grow-0"
          alt="tester-tap-close"
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tab;
