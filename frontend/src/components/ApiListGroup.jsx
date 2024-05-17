import ApiBox from "./ApiBox";
import { useLanguage } from "../contexts/LanguageContext";

export default function ApiListGroup({
  groupId,
  groupName,
  groupUri,
  apiProjects,
}) {
  const { language } = useLanguage();

  const translations = {
    ko: {
      noAPI: "생성된 API가 없습니다.",
    },
    en: {
      noAPI: "No API created.",
    },
  };

  const t = translations[language];

  return (
    <div className="mt-[40px] flex flex-col items-center space-y-5">
      {apiProjects.length === 0 ? (
        <div className="font-medium text-gray-500">{t.noAPI}</div>
      ) : (
        apiProjects.map((api) => (
          <ApiBox key={api.apiId} {...{ ...api, groupId }} />
        ))
      )}
    </div>
  );
}
