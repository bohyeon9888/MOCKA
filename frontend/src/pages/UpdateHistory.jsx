// src/pages/UpdateHistory.js
import { useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  ko: {
    message: "모카 서비스 정식 출시!",
    basicServer: "기본 서버 스켈레톤 생성",
    description:
      "지정된 API에 맞게 DTO와 컨트롤러를 포함한 서버의 기초 구조를 생성합니다.",
    back: "뒤로",
  },
  en: {
    message: "Mocka service officially launched!",
    basicServer: "Basic Server Skeleton Generation",
    description:
      "Create a foundational structure for the server, including DTOs and controllers, tailored to the specified API.",
    back: "Back",
  },
};

function UpdateHistory() {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];
  const { message } = location.state || { message: t.message };

  return (
    <div>
      <div className="ml-[105px] mt-[132px] flex items-center">
        <a href="/">
          <img
            src="/asset/home/home-left-pointer.svg"
            className="mr-[30px] h-8 cursor-pointer"
            alt="home-left-pointer"
          />
        </a>
        <h1>{message}</h1>
      </div>
      <div className="ml-[155px] mt-[48px]">
        <h2 className="mb-[15px]">{t.basicServer}</h2>
        <h3>{t.description}</h3>
      </div>
    </div>
  );
}

export default UpdateHistory;
