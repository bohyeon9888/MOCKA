function Tab({ type, isSelected, title, onClick, onRemove }) {
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
      className={`relative flex h-[36px] w-[154px] cursor-pointer items-center justify-center ${
        isSelected
          ? "border-r border-t bg-white"
          : "border-b border-r border-t bg-background-color opacity-50"
      } flex-shrink-0 text-black`}
      onClick={onClick}
    >
      <div
        className={`absolute left-[16px] flex h-[16px] w-[16px] items-center justify-center rounded-full text-white ${getColorClass(
          type,
        )}`}
      >
        <h5>{type[0]}</h5>
      </div>
      <h5 className="ml-[15px] max-w-[85px] overflow-hidden text-ellipsis whitespace-nowrap font-medium">
        {title}
      </h5>
      <img
        src="/asset/tester/tester-tap-close.svg"
        className="absolute right-[16px] h-2.5"
        alt="tester-tap-close"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(type);
        }}
        style={{ visibility: isSelected ? "visible" : "hidden" }}
      />
    </div>
  );
}

export default Tab;
