import { useState } from "react";
import Input from "../components/Input";
import requestBodyTypes, {
  filteredRequestBodyTypes,
} from "../constants/requestBodyTypes";
import DropDown from "./DropDown";
import combineClassName from "../utils/combineClassName";

export default function RequestBox({
  _key,
  type,
  value,
  changeHandler,
  arrayList,
  arraySize,
  removeItem,
}) {
  const [isHover, setIsHover] = useState(false);

  const iconClassName =
    "flex size-[22px] cursor-pointer items-center justify-center rounded-full hover:bg-gray-200";
  const iconHoverClassName = isHover ? "opacity-1" : "opacity-0";

  const changeKeyHandler = (e) => {
    // if (e.target.value === "") removeItem();
    changeHandler({ key: e.target.value, type, value, arrayList, arraySize });
  };

  const changeValueHandler = (value) => {
    if (value.length === 0) {
      changeHandler({
        key: _key,
        type: "String",
        value: null,
        arrayList: false,
        arraySize: -1,
      });
    } else changeHandler({ key: _key, type, value, arrayList, arraySize });
  };

  const changeTypeHandler = (newType, isSecond) => {
    setIsHover(false);
    if (type === newType) return;
    if (newType === "Object") {
      changeHandler({
        key: _key,
        type: newType,
        arrayList: !!isSecond,
        arraySize: isSecond ? 5 : -1,
        value: [
          {
            key: `key_0`,
            type: "String",
            value: null,
            arrayList: false,
            arraySize: -1,
            id: Math.random(),
          },
        ],
      });
    } else if (newType === "Array") {
      if (arrayList) return;
      changeHandler({
        key: _key,
        type: "String",
        arrayList: true,
        arraySize: 5,
        value: null,
      });
    } else {
      changeHandler({
        key: _key,
        type: newType,
        arrayList: !!isSecond,
        arraySize: isSecond ? 5 : -1,
        value: null,
      });
    }
  };

  const addChildRequest = () => {
    if (!value || value.length === 0) {
      changeValueHandler([
        {
          key: `key_0`,
          type: "String",
          value: null,
          arrayList: false,
          arraySize: -1,
          id: Math.random(),
        },
      ]);
      return;
    }
    let newKeyNum = 0;
    while (value.find(({ key }) => key === `key_${newKeyNum}`)) newKeyNum += 1;
    changeValueHandler([
      ...value,
      {
        key: `key_${newKeyNum}`,
        type: "String",
        value: null,
        arrayList: false,
        arraySize: -1,
        id: Math.random(),
      },
    ]);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div
        className="flex flex-row space-x-2"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <Input value={_key} changeHandler={changeKeyHandler} />
        {arrayList && (
          <DropDown
            value="Array"
            options={requestBodyTypes}
            changeHandler={changeTypeHandler}
          />
        )}
        <DropDown
          value={type}
          options={
            arrayList ? filteredRequestBodyTypes(["Array"]) : requestBodyTypes
          }
          changeHandler={(type) => {
            changeTypeHandler(type, arrayList);
          }}
        />
        <div
          className={combineClassName(
            iconHoverClassName,
            "flex flex-row items-center space-x-1 transition-all",
          )}
        >
          {type === "Object" && (
            <div className={iconClassName} onClick={addChildRequest}>
              <img
                className="size-[17px] "
                src="/asset/api/api-plus-dark.svg"
              />
            </div>
          )}
          <div className={iconClassName}>
            <img className="h-[12px]" src="/asset/api/api-option.svg" />
          </div>
          <div className={iconClassName} onClick={removeItem}>
            <img className="size-[12px] " src="/asset/api/api-delete.svg" />
          </div>
        </div>
      </div>
      {value && value.length > 0 && (
        <div className="m-6 flex flex-col space-y-3">
          {value.map(
            (
              { key, type, value: childValue, arrayList, arraySize, id },
              idx,
            ) => (
              <RequestBox
                key={id}
                _key={key}
                type={type}
                value={childValue}
                arrayList={arrayList}
                arraySize={arraySize}
                changeHandler={({
                  key,
                  type,
                  value: newValue,
                  arrayList,
                  arraySize,
                }) => {
                  const newApiRequest = [...value];
                  newApiRequest[idx] = {
                    key,
                    type,
                    value: newValue,
                    arrayList,
                    arraySize,
                    id,
                  };
                  changeValueHandler(newApiRequest);
                }}
                removeItem={() => {
                  changeValueHandler([
                    ...value.slice(0, idx),
                    ...value.slice(idx + 1, value.length),
                  ]);
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
