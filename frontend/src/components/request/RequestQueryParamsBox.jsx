import fakerJsMap from "../../constants/fakerJsMap";
import DropDown from "../DropDown";
import Input from "../Input";

export default function RequestQueryParamsBox({
  queryParameters,
  setQueryParameters,
}) {
  const setFirst = (idx, type, value) => {
    if (value === queryParameters[idx].first) return;

    const newQuery = [...queryParameters];
    newQuery[idx].first = value;
    if (value !== "직접 입력")
      newQuery[idx].second = fakerJsMap[type].second[value];
    setQueryParameters(newQuery);
  };

  const setSecond = (idx, value) => {
    if (value === queryParameters[idx].second) return;
    const newQuery = [...queryParameters];
    newQuery[idx].second = value;
    setQueryParameters(newQuery);
  };

  const setInput = (idx, value) => {
    const newQuery = [...queryParameters];
    newQuery[idx].input = value;
    setQueryParameters(newQuery);
  };
  const setMin = (idx, value) => {
    const newQuery = [...queryParameters];
    newQuery[idx].min = value;
    setQueryParameters(newQuery);
  };

  const setMax = (idx, value) => {
    const newQuery = [...queryParameters];
    newQuery[idx].max = value;
    setQueryParameters(newQuery);
  };

  return (
    <div>
      {queryParameters.length === 0 ? (
        <div className="text-center font-medium text-gray-500">
          No Query Parameters
        </div>
      ) : (
        <div>
          {queryParameters.map(
            ({ key, type, first, second, min, max, input }, idx) => (
              <div key={key} className="flex flex-row items-center space-x-2">
                <Input value={key} readOnly />
                <div className="pb-1 text-2 text-gray-500">:</div>
                <Input
                  value={type}
                  readOnly
                  style={{
                    width: "90px",
                    textAlign: "center",
                  }}
                />
                <DropDown
                  value={first}
                  options={fakerJsMap[type].first}
                  changeHandler={(value) => {
                    setFirst(idx, type, value);
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
                      options={fakerJsMap[type].second[first]}
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
                            fakerJsMap[type].min,
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
                            fakerJsMap[type].max,
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
