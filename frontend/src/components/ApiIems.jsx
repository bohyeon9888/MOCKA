import React from "react";
import Method from "./Method";
import { useProjectStore } from "../store";

function ApiItems() {
  const methodType = "POST";
  const apiNameText = "ApiTest Name";
  return (
    <div className="flex items-center">
      <Method
        type={methodType}
        size={{ width: "40", height: "17" }}
        fontSize="8px"
      />
      <p className="ml-[10px] text-[10px] font-bold">{apiNameText}</p>
    </div>
  );
}

export default ApiItems;
