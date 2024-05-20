import Input from "../Input";
import DropDown from "../DropDown";
import javaPrimitiveTypes from "../../constants/javaPrimitiveTypes";

export default function pathVariableEditor({
  pathVariable,
  setPathVariableType,
}) {
  return (
    <div className="flex flex-col space-y-3">
      {pathVariable &&
        pathVariable.length > 0 &&
        pathVariable.map(({ key, type }, idx) => (
          <div key={key} className="flex flex-row space-x-2">
            <Input readOnly value={key} />
            <DropDown
              value={type}
              options={javaPrimitiveTypes}
              changeHandler={(type) => {
                setPathVariableType(idx, type);
              }}
            />
          </div>
        ))}
    </div>
  );
}
