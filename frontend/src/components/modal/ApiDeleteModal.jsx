import { React } from "react";
import { useModalStore, useProjectStore } from "../../store";
import { deleteApi } from "../../apis/api";

function ApiDeleteModal() {
  const { closeModal, state } = useModalStore();

  const Yes = () => {
    alert("Api deleted."); // "Api 삭제됨."
    deleteApi({ projectId: state.projectId, apiId: state.apiId });
    closeModal();
  };

  const No = () => {
    closeModal();
  };

  return (
    <div className="h-[100x] w-[542px]">
      <h3 className="ml-[32px] mt-[20px] pr-[32px]">
        Do you want to delete "{state.apiName}" api?
      </h3>
      <div className="flex items-center justify-center rounded-[10px]"></div>
      <div className="mt-[20px] flex items-center justify-center">
        <div
          className="mr-[28px] flex h-[41px] w-[225px] cursor-pointer items-center justify-center rounded-[10px] bg-green-500 text-center"
          onClick={Yes}
        >
          <h3 className="text-white">Yes</h3>
        </div>
        <div
          className="flex h-[41px] w-[225px] cursor-pointer items-center justify-center rounded-[10px] bg-red-300"
          onClick={No}
        >
          <h3 className="text-white">No</h3>
        </div>
      </div>
    </div>
  );
}

export default ApiDeleteModal;
