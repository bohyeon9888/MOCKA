import combineClassName from "../utils/combineClassName";

export default function Input({
  placeHolder,
  value,
  readOnly,
  isFull,
  changeHandler,
  useBorder,
  isValid,
  onKeyDownHandler,
}) {
  const commonClassName = isFull
    ? "bg-gray-100 px-3 py-2 text-4 w-full rounded-[10px] h-10 outline-none"
    : "bg-gray-100 px-3 py-2 text-4 w-input rounded-[10px] h-10 outline-none";
  const borderClassName = isValid
    ? "border-2 border-green-300"
    : "border-2 border-red-500";

  const className = useBorder
    ? combineClassName(commonClassName, borderClassName)
    : commonClassName;

  return (
    <input
      className={className}
      placeholder={placeHolder}
      value={value}
      onChange={changeHandler}
      readOnly={readOnly}
      onKeyDown={onKeyDownHandler}
    />
  );
}
