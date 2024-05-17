import fakerJsMap from "../../constants/fakerJsMap";
import DropDown from "../DropDown";
import Input from "../Input";
import { useLanguage } from "../../contexts/LanguageContext";

export default function RequestPathVariableBox({
  pathVariables,
  setPathVariables,
}) {
  const setFirst = (idx, type, value) => {
    if (value === pathVariables[idx].first) return;

    const newQuery = [...pathVariables];
    newQuery[idx].first = value;
    if (value !== "직접 입력")
      newQuery[idx].second = fakerJsMap[type].second[value];
    setPathVariables(newQuery);
  };

  const setSecond = (idx, value) => {
    if (value === pathVariables[idx].second) return;
    const newQuery = [...pathVariables];
    newQuery[idx].second = value;
    setPathVariables(newQuery);
  };

  const setInput = (idx, value) => {
    const newQuery = [...pathVariables];
    newQuery[idx].input = value;
    setPathVariables(newQuery);
  };

  const setMin = (idx, value) => {
    const newQuery = [...pathVariables];
    newQuery[idx].min = value;
    setPathVariables(newQuery);
  };

  const setMax = (idx, value) => {
    const newQuery = [...pathVariables];
    newQuery[idx].max = value;
    setPathVariables(newQuery);
  };

  const { language } = useLanguage();

  const translations = {
    ko: {
      // NoPathOption: "경로 변수 없음",
      NoPathOption: "Path Variable 없음",
    },
    en: {
      NoPathOption: "No Path Variables",
    },
  };

  const t = translations[language];

  return (
    <div>
      {pathVariables.length === 0 ? (
        <div className="text-center font-medium text-gray-500">
          {t.NoPathOption}
        </div>
      ) : (
        <div>
          {pathVariables.map(
            ({ key, data, first, second, min, max, input }, idx) => (
              <div key={key} className="flex flex-row items-center space-x-2">
                <Input value={key} readOnly />
                <div className="pb-1 text-2 text-gray-500">:</div>
                <Input
                  value={data}
                  readOnly
                  style={{
                    width: "90px",
                    textAlign: "center",
                  }}
                />
                <DropDown
                  value={first}
                  options={fakerJsMap[data].first}
                  changeHandler={(value) => {
                    setFirst(idx, data, value);
                  }}
                />
                {first === "직접 입력" ? (
                  <Input
                    value={input}
                    changeHandler={(e) => {
                      setInput(idx, e.target.value);
                    }}
                  />
                ) : (
                  <>
                    <DropDown
                      value={second}
                      options={fakerJsMap[data].second[first]}
                      changeHandler={(value) => {
                        setSecond(idx, value);
                      }}
                    />
                    {/* {min !== undefined && (
                      <Input
                        value={min}
                        isNumber
                        changeHandler={(e) => {
                          const value = Math.max(
                            Math.min(e.target.value, max),
                            fakerJsMap[data].min,
                          );
                          setMin(idx, value);
                        }}
                      />
                    )}
                    {max !== undefined && (
                      <Input
                        isNumber
                        value={max}
                        changeHandler={(e) => {
                          const value = Math.min(
                            Math.max(e.target.value, min),
                            fakerJsMap[data].max,
                          );
                          setMax(idx, value);
                        }}
                      />
                    )} */}
                  </>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
