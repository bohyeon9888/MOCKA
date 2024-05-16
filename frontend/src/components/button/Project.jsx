import { getProjectDetail } from "../../apis/project";
import { useNavigate } from "react-router-dom";
import formatDateString from "../../utils/formatDateString";
import { useProjectStore } from "../../store";
import { useLanguage } from "../../contexts/LanguageContext";

function Project({ title, date, projectId }) {
  const navigate = useNavigate();
  const { setProject } = useProjectStore();
  const { language } = useLanguage();

  const translations = {
    ko: {
      createdAt: "생성 날짜",
    },
    en: {
      createdAt: "Created At",
    },
  };

  const t = translations[language];

  const baseClassName =
    "flex h-[73px] w-[476px] shrink-0 cursor-pointer items-center justify-between rounded-[20px] text-gray-700 border-2 border-gray-700 bg-white opacity-60 hover:opacity-100 duration-200";

  const onClick = () => {
    getProjectDetail(projectId).then((data) => {
      setProject(data);
      navigate(`/project/${projectId}`, {
        state: { data },
      });
    });
  };

  return (
    <div className={baseClassName} onClick={onClick}>
      <h2 className="ml-[50px] tracking-[-0.08em]">{title}</h2>
      <div className="mr-[50px] tracking-[-0.08em]">
        <h5 className="flex justify-center font-medium">{t.createdAt}</h5>
        <h5 className="mt-1 flex justify-center font-medium">
          {formatDateString(date)}
        </h5>
      </div>
    </div>
  );
}

export default Project;
