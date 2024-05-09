export default function CheckBox({ isChecked }) {
  const defaultClassName =
    "size-4 border-2 border-gray-500 rounded-[2px] duration-100 ";
  const checkedClassName =
    "flex items-center justify-center size-4 border-2 border-green-600 rounded-[2px] bg-green-600 duration-100";
  return (
    <div className={isChecked ? checkedClassName : defaultClassName}>
      {isChecked && <img className="size-4" src="/asset/etc/check.svg" />}
    </div>
  );
}
