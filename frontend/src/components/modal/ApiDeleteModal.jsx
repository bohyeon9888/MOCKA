import { useModalStore, useProjectStore } from "../../store";
import { deleteApi } from "../../apis/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { getProjectDetail } from "../../apis/project";

function ApiDeleteModal() {
  const { closeModal, state } = useModalStore();
  const { project, setProject } = useProjectStore();
  const { language } = useLanguage();

  const translations = {
    ko: {
      deleteMessage: `"${state.apiName}" API를 삭제하시겠습니까?`,
      yes: "예",
      no: "아니오",
      alertMessage: "API 삭제됨.",
    },
    en: {
      deleteMessage: `Do you want to delete "${state.apiName}" API?`,
      yes: "Yes",
      no: "No",
      alertMessage: "API deleted.",
    },
  };

  const t = translations[language];

  const Yes = () => {
    deleteApi({ projectId: state.projectId, apiId: state.apiId }).then(() => {
      setTimeout(() => {
        getProjectDetail(project.projectId).then((data) => {
          setProject(data);
        });
      }, 100);
      closeModal();
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

export default ApiDeleteModal;
