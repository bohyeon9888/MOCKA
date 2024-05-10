import { React } from "react";
import { useModalStore, useProjectStore } from "../../store";
import { deleteProject } from "../../apis/project";

function ProjectDeleteModal() {
  const { project } = useProjectStore(); //프로젝트 이름
  const { closeModal } = useModalStore();

  const Yes = () => {
    alert("Project deleted."); // "프로젝트 삭제됨."
    deleteProject(project.projectId);
    closeModal();
  };

  const No = () => {
    closeModal();
  };

  return (
    <div className="h-[100x] w-[542px]">
      <h3 className="ml-[32px] mt-[20px] pr-[32px]">
        Do you want to delete "{project.projectName}" project?
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

export default ProjectDeleteModal;
