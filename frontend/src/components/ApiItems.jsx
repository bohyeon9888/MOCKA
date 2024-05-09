import Method from "./Method";

function ApiItems({ apiMethod, name }) {
  return (
    <div className="flex items-center">
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
