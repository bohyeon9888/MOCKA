import React from "react";

function Method({ type, size, fontSize }) {
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
  const defaultSize = isShortType
    ? { height: 16, width: 16 }
    : { height: 24, width: 73 };
  const finalSize = size
    ? { width: `${size.width}px`, height: `${size.height}px` }
    : defaultSize;
  const defaultFontSize = isShortType ? "12px" : "16px";
  const finalFontSize = fontSize || defaultFontSize;

  return (
    <div
      className={`flex items-center justify-center rounded-[15px] text-white ${getColorClass(type)}`}
      style={{
        height: finalSize.height,
        width: finalSize.width,
        fontSize: finalFontSize,
      }}
    >
      {
        isShortType ? (
          <h5>{type[0]}</h5>
        ) : (
          <h4 style={{ fontSize: finalFontSize }}>{type}</h4>
        ) // 폰트 크기를 직접 <h4> 태그에 적용
      }
    </div>
  );
}

export default Method;
