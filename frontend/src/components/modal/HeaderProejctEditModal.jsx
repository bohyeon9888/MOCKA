import React from "react";
import ProjectEditModal from "./ProjectEditModal";
import ProjectDeleteModal from "./ProjectDeleteModal";
import { useModalStore } from "../../store";

function HeaderProjectEditModal() {
  const { openModal } = useModalStore();

  const openProjectEditModal = () => {
    openModal("Edit Project", <ProjectEditModal />);
  };

  const openProjectDeleteModal = () => {
    openModal("Delete Project", <ProjectDeleteModal />);
  };

  return (
    <div className="flex flex-col space-y-[27px] px-5">
      <div className="relative h-[120px] w-[144px] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] bg-secondary-color pt-[25px]">
        <div
          className="ml-[25px] flex cursor-pointer items-center"
          onClick={openProjectEditModal}
        >
          <img
            src="/asset/header/header-rename.svg"
            className="mr-[14px] h-4"
            alt="header-rename"
          />
          <h4 className="font-medium">Rename</h4>
        </div>
        <div
          className="absolute left-0 right-0 mx-auto h-[1px] w-[90%] bg-gray-300"
          style={{ top: "50%" }}
        ></div>
        <div
          className="ml-[25px] mt-[40px] flex cursor-pointer items-center"
          onClick={openProjectDeleteModal}
        >
          <img
            src="/asset/header/header-delete.svg"
            className="mr-[17px] h-4"
            alt="header-delete"
          />
          <h4 className="font-medium">Delete</h4>
        </div>
      </div>
    </div>
  );
}

export default HeaderProjectEditModal;
