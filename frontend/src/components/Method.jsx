import React from "react";

function Method({ type }) {
  const getColorClass = (type) => {
    switch (type) {
      case "GET":
      case "GE":
        return "bg-get-color";
      case "POST":
      case "PO":
        return "bg-post-color";
      case "PUT":
      case "PU":
        return "bg-put-color";
      case "DELETE":
      case "DE":
        return "bg-delete-color";
      case "PATCH":
      case "PA":
        return "bg-patch-color";
      default:
        return "bg-gray-400";
    }
  };

  const isShortType = type.length === 2; // type이 "GE", "PO", "PU", "DE", "PA"인 경우

  return (
    <div
      className={`flex ${
        isShortType ? "h-[16px] w-[16px]" : "h-[24px] w-[73px]"
      } shrink-0 grow-0 items-center justify-center rounded-[15px] text-white ${getColorClass(type)}`}
    >
      {isShortType ? <h5>{type[0]}</h5> : <h4>{type}</h4>}
    </div>
  );
}

export default Method;
