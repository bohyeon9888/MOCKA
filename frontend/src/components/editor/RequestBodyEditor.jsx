import RequestBox from "../RequestBox";
import Switch from "../Switch";

export default function RequestBodyEditor({ apiRequest, setApiRequest }) {
  const addNewRequest = () => {
    let newKeyNum = 0;
    while (apiRequest.find(({ key }) => key === `key ${newKeyNum}`))
      newKeyNum += 1;
    setApiRequest([
      ...apiRequest,
      {
        key: `key ${newKeyNum}`,
        type: "String",
        value: null,
        arrayList: false,
        arraySize: -1,
        id: Math.random(),
      },
    ]);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <Switch />
        <div className="leading-none">
          <div className="font-Fira text-4 font-medium tracking-tight">
            multipart/form-data
          </div>
          <div className="text-[10px] text-gray-500">
            Using multipart/form-data content type for this request
          </div>
        </div>
      </div>
      <div className="flex-col space-y-3">
        {apiRequest &&
          apiRequest.length > 0 &&
          apiRequest.map(
            ({ key, type, value, arrayList, arraySize, id }, idx) => (
              <RequestBox
                key={id}
                _key={key}
                type={type}
                value={value}
                arrayList={arrayList}
                arraySize={arraySize}
                changeHandler={({ key, type, value, arrayList, arraySize }) => {
                  const newApiRequest = [...apiRequest];
                  newApiRequest[idx] = {
                    key,
                    type,
                    value,
                    arrayList,
                    id,
                    arraySize,
                  };
                  setApiRequest(newApiRequest);
                }}
                removeItem={() => {
                  setApiRequest([
                    ...apiRequest.slice(0, idx),
                    ...apiRequest.slice(idx + 1, apiRequest.length),
                  ]);
                }}
              />
            ),
          )}
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center rounded-[10px] bg-gray-500 opacity-60"
          onClick={addNewRequest}
        >
          <img className="size-4" src="/asset/api/api-plus.svg" />
        </button>
      </div>
    </div>
  );
}
