import { useRef, useState, useEffect } from "react";
import combineClassName from "../utils/combineClassName";

export default function MethodOptions({ className, apiMethod, setApiMethod }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const methodArray = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  const colorClasses = {
    GET: "bg-get-color",
    POST: "bg-post-color",
    DELETE: "bg-delete-color",
    PUT: "bg-put-color",
    PATCH: "bg-patch-color",
  };
  const textColorClasses = {
    GET: "text-get-color",
    POST: "text-post-color",
    DELETE: "text-delete-color",
    PUT: "text-put-color",
    PATCH: "text-patch-color",
  };

  const baseClassName = "w-[80px] h-6";
  const optionClassName =
    "cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";
  const buttonClassName =
    "relative inline-flex h-full pr-1 w-full items-center justify-center rounded-full bg-blue-700 text-center text-4 font-medium text-white";

  const combinedClassName = combineClassName(baseClassName, className);
  const combinedButtonClassName = combineClassName(
    buttonClassName,
    colorClasses[apiMethod],
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={combinedClassName} ref={dropdownRef}>
      <button
        className={combinedButtonClassName}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {apiMethod}
        <svg
          className="absolute right-2 ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 mt-1 w-full divide-y divide-gray-100 rounded-lg bg-white shadow shadow dark:bg-gray-700"
        >
          <ul className="py-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {methodArray.map((method) => (
              <li
                key={method}
                className={combineClassName(
                  optionClassName,
                  textColorClasses[method],
                )}
                onClick={() => {
                  setApiMethod(method);
                  setIsOpen(false);
                }}
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
