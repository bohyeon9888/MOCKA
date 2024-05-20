import combineClassName from "../utils/combineClassName";

export default function Radio({ value, options, changeHandler }) {
  const className = {
    default: {
      radio: "w-4 h-4 border-2 border-gray-700 rounded-full",
      text: "text-gray-700",
    },
    selected: {
      radio: "w-4 h-4 bg-green-500 rounded-full",
      text: "text-green-500 font-medium -tracking-[0.008em]",
    },
    disabled: {
      radio: "w-4 h-4 bg-white border-2 border-gray-300 rounded-full",
      text: "text-gray-300",
    },
  };

  const baseClassName = "flex flex-row items-center space-x-[6px]";
  const textClassName = "text-4 leading-normal";

  const getClassName = (v, disabled) => {
    if (disabled) return className["disabled"];
    return v === value ? className["selected"] : className["default"];
  };

  return (
    <div className="flex space-x-5">
      {options &&
        options.length > 0 &&
        options.map(({ value, disabled }) => (
          <div
            key={value}
            onClick={() => {
              if (!disabled && changeHandler) changeHandler(value);
            }}
            className={combineClassName(
              baseClassName,
              !disabled ? "cursor-pointer" : "",
            )}
          >
            <div className={getClassName(value, disabled).radio} />
            <div
              className={combineClassName(
                textClassName,
                getClassName(value, disabled).text,
              )}
            >
              {value}
            </div>
          </div>
        ))}
    </div>
  );
}
