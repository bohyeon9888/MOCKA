import { useState } from "react";
import combineClassName from "../utils/combineClassName";

export default function DependencyBox({
  name,
  description,
  fixed,
  deleteItem,
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="flex flex-row items-center justify-between pt-2"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <div>
        <div className="mb-[6px] font-semibold">{name}</div>
        <div className="w-[800px] text-[14px] text-gray-500">{description}</div>
      </div>
      <img
        className={combineClassName(
          "mx-4 mt-2 size-6 cursor-pointer opacity-70 duration-100 hover:opacity-100",
          !fixed && isHover ? "visible" : "invisible",
        )}
        src="/asset/invite/invite-delete.svg"
        onClick={deleteItem}
      />
    </div>
  );
}
