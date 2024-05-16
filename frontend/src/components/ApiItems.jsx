import { useSearchParams } from "react-router-dom";
import Method from "./Method";
import updateQueryParam from "../utils/updateQueryParam";

function ApiItems({ apiMethod, name, apiId }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = () => {
    updateQueryParam({
      key: "apiId",
      value: apiId,
      searchParams,
      setSearchParams,
    });
  };

  return (
    <div className="flex cursor-pointer items-center rounded-md p-[6px] px-4 duration-300 hover:bg-gray-300" onClick={onClick} >
      <Method
        type={apiMethod}
        size={{ width: "40", height: "18" }}
        fontSize="11px"
      />
      <p className="mb-[1px] ml-[10px] text-[11px] font-semibold">{name}</p>
    </div>
  );
}

export default ApiItems;
