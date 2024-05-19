import React from "react";
import { useModalStore, useProjectStore } from "../../store";
import { deleteProject } from "../../apis/project";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

function ProjectDeleteModal() {
  const { project } = useProjectStore(); //프로젝트 이름
  const { closeModal } = useModalStore();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const translations = {
    ko: {
      deleteMessage: `"${project.projectName}" 프로젝트를 삭제하시겠습니까?`,
      projectDeleted: "프로젝트가 삭제되었습니다.",
      yes: "예",
      no: "아니요",
    },
    en: {
      deleteMessage: `Do you want to delete "${project.projectName}" project?`,
      projectDeleted: "Project deleted.",
      yes: "Yes",
      no: "No",
    },
  };

  const t = translations[language];

  const Yes = () => {
    deleteProject(project.projectId).then(() => {
      closeModal();
      navigate(`/?lang=${language}`);
    });
  };

  const No = () => {
    closeModal();
  };

  return (
    <div className="h-[100px] w-[542px]">
      <h3 className="ml-[32px] mt-[20px] pr-[32px]">{t.deleteMessage}</h3>
      <div className="flex items-center justify-center rounded-[10px]"></div>
      <div className="mt-[20px] flex items-center justify-center">
        <div
          className="mr-[28px] flex h-[41px] w-[225px] cursor-pointer items-center justify-center rounded-[10px] bg-green-500 text-center"
          onClick={Yes}
        >
          <h3 className="text-white">{t.yes}</h3>
        </div>
        <div
          className="flex h-[41px] w-[225px] cursor-pointer items-center justify-center rounded-[10px] bg-red-300"
          onClick={No}
        >
          <h3 className="text-white">{t.no}</h3>
        </div>
      </div>
    </div>
  );
}

export default ProjectDeleteModal;
