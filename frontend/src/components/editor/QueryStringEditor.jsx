import Input from "../Input";
import isValidURI from "../../utils/validateURI";
import DropDown from "../DropDown";
import javaPrimitiveTypes from "../../constants/javaPrimitiveTypes";

export default function QueryStringEditor({ parameters, apiUri, setApiUri }) {
  const changeApiUri = (idx, type) => {
    if (!isValidURI(apiUri)) return;

    const newParameters = [...parameters];
    newParameters[idx].type = type;
    const [sliced] = apiUri.split("?");

    setApiUri(
      `${sliced}?${newParameters.map(({ key, type }) => `${key}=${type}`).join("&")}`,
    );
  };

  return (
    <div className="flex flex-col space-y-3">
      {parameters.map(({ key, type }, idx) => (
        <div key={key} className="flex flex-row space-x-2">
          <Input readOnly value={key} />
          <DropDown
            value={type}
            options={javaPrimitiveTypes}
            changeHandler={(type) => {
              changeApiUri(idx, type);
            }}
          />
        </div>
      ))}
    </div>
  );
}
