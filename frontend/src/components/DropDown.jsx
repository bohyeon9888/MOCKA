import { useState, useEffect, useRef } from "react";
import combineClassName from "../utils/combineClassName";

export default function DropDown({ value, options, changeHandler, size }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const baseClassName =
    size === "small" ? "w-[110px] h-[30px]" : "w-[110px] h-10";
  const optionClassName =
    "cursor-pointer block px-4 py-2 text-5 font-normal hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";
  const buttonClassName = combineClassName(
    "relative justify-between inline-flex h-full w-full items-center pl-2 pr-2 text-5 border-gray-500 border",
    size === "small" ? "rounded-[4px]" : "rounded-[10px]",
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
    <div className={baseClassName} ref={dropdownRef}>
      <button
        className={buttonClassName}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {value}
        <img
          className="w-[10px]"
          src={`/asset/home/home-${isOpen ? "up" : "down"}-pointer.svg`}
        />
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="relative z-20 mt-1 max-h-[120px] w-full divide-y divide-gray-100 overflow-y-scroll rounded-lg bg-white shadow dark:bg-gray-700"
        >
          <ul className="py-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li
                key={option?.value || option}
                className={optionClassName}
                onClick={() => {
                  if (changeHandler) changeHandler(option?.value || option);
                  setIsOpen(false);
                }}
              >
                {option?.name || option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
