import fakerJsMap from "../../constants/fakerJsMap";
import DropDown from "../DropDown";
import Input from "../Input";
import { useLanguage } from "../../contexts/LanguageContext";

function RequestBodyItem({
  id,
  arrayList,
  arraySize,
  _key,
  type,
  first,
  second,
  data,
  setItem,
  input,
}) {
  const _data = data;
  const setFirst = (value) => {
    if (first === value) return;
    const newValue = {
      id,
      arrayList,
      arraySize,
      type,
      first,
      second,
      data,
      setItem,
      key: _key,
      input,
    };
    newValue.first = value;
    if (value !== "직접 입력")
      newValue.second = fakerJsMap[type].second[value][0];
    setItem(newValue);
  };

  const setSecond = (value) => {
    if (second === value) return;
    const newValue = {
      id,
      arrayList,
      arraySize,
      type,
      first,
      second,
      data,
      setItem,
      key: _key,
      input,
    };
    newValue.second = value;
    setItem(newValue);
  };

  const setInput = (value) => {
    const newValue = {
      id,
      arrayList,
      arraySize,
      type,
      first,
      second,
      data,
      setItem,
      key: _key,
      input,
    };
    newValue.input = value;
    setItem(newValue);
  };

  const setData = (value) => {
    const newValue = {
      id,
      arrayList,
      arraySize,
      type,
      first,
      second,
      data,
      setItem,
      key: _key,
      input,
    };
    newValue.data = value;
    setItem(newValue);
  };

  const setArraySize = (value) => {
    const newValue = {
      id,
      arrayList,
      arraySize,
      type,
      first,
      second,
      data,
      setItem,
      key: _key,
      input,
    };
    newValue.arraySize = value;
    setItem(newValue);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row items-center space-x-2">
        <Input value={_key} readOnly />
        <div className="pb-1 text-2 text-gray-500">:</div>
        <Input
          value={type}
          readOnly
          style={{
            width: "90px",
            textAlign: "center",
          }}
        />
        {type !== "Object" && (
          <DropDown
            value={first}
            options={fakerJsMap[type].first}
            changeHandler={setFirst}
          />
        )}
        {type !== "Object" &&
          (first === "직접 입력" ? (
            <Input
              value={input}
              changeHandler={(e) => {
                setInput(e.target.value);
              }}
            />
          ) : (
            <DropDown
              value={second}
              options={fakerJsMap[type].second[first]}
              changeHandler={setSecond}
            />
          ))}
        {arrayList && (
          <div className="flex grow items-center space-x-2">
            <Input
              value="Array"
              readOnly
              style={{
                width: "80px",
                textAlign: "center",
              }}
            />
            <div className="font-semibold">x</div>
            <input
              type="number"
              value={arraySize}
              className="h-10 w-14 rounded-[8px] border border-gray-500 pl-2 pr-2 text-4"
              title="Array Size"
              onChange={(e) => {
                setArraySize(e.target.value);
              }}
            />
          </div>
        )}
      </div>
      {data && data !== "null" && data.length > 0 && (
        <div className="ml-6 flex flex-col space-y-2">
          {data.map(
            (
              {
                id,
                arrayList,
                arraySize,
                key,
                type,
                first,
                second,
                data,
                input,
              },
              idx,
            ) => (
              <RequestBodyItem
                key={id}
                _key={key}
                id={id}
                type={type}
                first={first}
                second={second}
                data={data}
                arrayList={arrayList}
                arraySize={arraySize}
                input={input}
                setItem={(value) => {
                  const newData = [..._data];
                  newData[idx] = value;
                  setData(newData);
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default function RequestBodyBox({ body, setBody }) {
  const { language } = useLanguage();

  const translations = {
    ko: {
      NoBodyOption: "요청 본문 없음",
    },
    en: {
      NoBodyOption: "No Request Body",
    },
  };

  const t = translations[language];
  return (
    <div>
      {body.length === 0 ? (
        <div className="text-center font-medium text-gray-500">
          {t.NoBodyOption}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {body.map(
            (
              {
                id,
                arrayList,
                arraySize,
                key,
                type,
                first,
                second,
                data,
                input,
              },
              idx,
            ) => (
              <RequestBodyItem
                key={id}
                _key={key}
                type={type}
                first={first}
                second={second}
                data={data}
                arrayList={arrayList}
                arraySize={arraySize}
                input={input}
                setItem={(value) => {
                  const newBody = [...body];
                  newBody[idx] = value;
                  setBody(newBody);
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
