import React from "react";

function Button({ type, onClick }) {
  const getBoxSize = (type) => {
    switch (type) {
      case "Generate":
        return "w-[100px]";
      case "Invite":
      case "Apply":
      case "Create":
      case "Save":
      case "Send":
        return "w-[71px]";
      default:
        return "w-[71px]";
    }
  };

  return (
    <div
      className={`flex h-[30px]  shrink-0 grow-0
        cursor-pointer items-center justify-center rounded-[10px] bg-gray-700 text-white ${getBoxSize(type)}`}
      onClick={onClick}
    >
      <h4 className="font-semibold ">{type}</h4>
    </div>
  );
}

export default Button;
