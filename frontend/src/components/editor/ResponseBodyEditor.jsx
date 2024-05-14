import responseCode from "../../constants/responseCode";
import DropDown from "../DropDown";
import ResponseBox from "../ResponseBox";
import Switch from "../Switch";

export default function ResponseBodyEditor({
  apiResponse,
  apiResponseIsArray,
  apiResponseSize,
  setApiResponse,
  setApiResponseIsArray,
  setApiResponseSize,
}) {
  const addNewResponse = () => {
    let newKeyNum = 0;
    while (apiResponse.find(({ key }) => key === `key_${newKeyNum}`))
      newKeyNum += 1;
    setApiResponse([
      ...apiResponse,
      {
        key: `key_${newKeyNum}`,
        type: "String",
        value: null,
        arrayList: false,
        arraySize: -1,
        id: Math.random(),
        fakerLocale: "KO",
        fakerMajor: "name",
        fakerSub: "fullName",
      },
    ]);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <Switch
            value={apiResponseIsArray}
            changeHandler={(value) => {
              setApiResponseIsArray(value);
            }}
          />
          <div className="leading-none">
            <div className="font-Fira text-4 font-medium tracking-tight">
              isArray
            </div>
            <div className="text-[10px] text-gray-500">
              Return response as an array
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col space-y-3">
        {apiResponse &&
          apiResponse.length > 0 &&
          apiResponse.map(
            (
              {
                key,
                type,
                value,
                arrayList,
                arraySize,
                id,
                fakerLocale,
                fakerMajor,
                fakerSub,
              },
              idx,
            ) => (
              <ResponseBox
                key={id}
                _key={key}
                type={type}
                value={value}
                arrayList={arrayList}
                arraySize={arraySize}
                fakerLocale={fakerLocale}
                fakerMajor={fakerMajor}
                fakerSub={fakerSub}
                changeHandler={({
                  key,
                  type,
                  value,
                  arrayList,
                  arraySize,
                  fakerLocale,
                  fakerMajor,
                  fakerSub,
                }) => {
                  const newApiResponse = [...apiResponse];
                  newApiResponse[idx] = {
                    key,
                    type,
                    value,
                    arrayList,
                    arraySize,
                    id,
                    fakerLocale,
                    fakerMajor,
                    fakerSub,
                  };
                  setApiResponse(newApiResponse);
                }}
                removeItem={() => {
                  setApiResponse([
                    ...apiResponse.slice(0, idx),
                    ...apiResponse.slice(idx + 1, apiResponse.length),
                  ]);
                }}
              />
            ),
          )}
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center rounded-[10px] bg-gray-500 opacity-60"
          onClick={addNewResponse}
        >
          <img className="size-4" src="/asset/api/api-plus.svg" />
        </button>
      </div>
      <div className="flex flex-col space-y-[10px]">
        <div>
          <div className="text-[14px] font-medium">Successful Status Code</div>
          <div className="text-5 font-medium leading-normal text-gray-500">
            When receive a successful response, this status code will be
            returned.
          </div>
        </div>
        <DropDown value={200} options={responseCode} />
      </div>
    </div>
  );
}
