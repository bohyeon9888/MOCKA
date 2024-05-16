import { useState } from "react";
import Input from "../Input";
import combineClassName from "../../utils/combineClassName";

export default function RequestHeaderBox({ headers, setHeaders }) {
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const addNewHeader = () => {
    setHeaders([
      ...headers,
      {
        id: Math.random(),
        key: "",
        value: "",
      },
    ]);
  };

  const changeKeyHandler = (idx, newKey) => {
    const newHeaders = [...headers];
    newHeaders[idx].key = newKey;
    setHeaders(newHeaders);
  };

  const changeValueHandler = (idx, newValue) => {
    const newHeaders = [...headers];
    newHeaders[idx].value = newValue;
    setHeaders(newHeaders);
  };

  const removeItem = (idx) => {
    setHeaders([
      ...headers.slice(0, idx),
      ...headers.slice(idx + 1, headers.length),
    ]);
  };

  const iconClassName =
    "flex size-[22px] cursor-pointer items-center justify-center rounded-full hover:bg-gray-200";

  return (
    <div>
      <div className="mb-5 flex flex-col space-y-2">
        {headers.length === 0 ? (
          <div className="text-center font-medium text-gray-500">
            No Header Options
          </div>
        ) : (
          headers.map(({ id, key, value }, idx) => (
            <div
              key={id}
              className="flex flex-row items-center space-x-1"
              onMouseEnter={() => {
                setHoveredIdx(idx);
              }}
              onMouseLeave={() => {
                setHoveredIdx(-1);
              }}
            >
              <Input
                value={key}
                changeHandler={(e) => {
                  changeKeyHandler(idx, e.target.value);
                }}
                placeHolder="Key"
              />
              <div className="pb-1 text-2 text-gray-500">:</div>
              <Input
                value={value}
                changeHandler={(e) => {
                  changeValueHandler(idx, e.target.value);
                }}
                placeHolder="Value"
                isGrow
              />
              <div
                className={combineClassName(
                  iconClassName,
                  hoveredIdx === idx ? "opacity-100" : "opacity-0",
                )}
                onClick={() => {
                  removeItem(idx);
                }}
              >
                <img className="size-[12px] " src="/asset/api/api-delete.svg" />
              </div>
            </div>
          ))
        )}
      </div>
      <button
        type="button"
        className="flex h-10 w-full items-center justify-center rounded-[10px] bg-gray-500 opacity-60"
        onClick={addNewHeader}
      >
        <img className="size-4" src="/asset/api/api-plus.svg" />
      </button>
    </div>
  );
}
