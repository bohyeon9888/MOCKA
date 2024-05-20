import { useModalStore } from "../store";
import LoginModal from "../components/modal/LoginModal";
import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function Home() {
  const { openModal } = useModalStore();
  const { language } = useLanguage();

  const translations = {
    ko: {
      title: "Mocka",
      subtitle: "문서에서 API 목업과 서버를 쉽게 생성하세요.",
      apiSpecTitle: "API 사양 작성",
      apiSpecDesc: "플랫폼 내에서 원활하게 API 사양을 작성하세요.",
      docMockupTitle: "문서 기반 모형",
      docMockupDesc: "제공된 문서를 기반으로 API 목업을 자동으로 생성합니다.",
      serverGenTitle: "기본 서버 스켈레톤 생성",
      serverGenDesc:
        "지정된 API에 맞춘 DTO 및 컨트롤러를 포함한 서버의 기본 구조를 생성합니다.",
      teamCollabTitle: "통합 팀 협업",
      teamCollabDesc: "팀 구성원 간의 명세서 협업을 제공합니다.",
      getStarted: "시작하기",
    },
    en: {
      title: "Mocka",
      subtitle: "Easily Create API Mockups and Servers from Documents.",
      apiSpecTitle: "API Specification Writing",
      apiSpecDesc: "Seamlessly draft API specifications within the platform.",
      docMockupTitle: "Document-Based Mockup",
      docMockupDesc:
        "Automatically generate API mockups based on provided documents.",
      serverGenTitle: "Basic Server Skeleton Generation",
      serverGenDesc:
        "Create a foundational structure for the server, including DTOs and controllers, tailored to the specified API.",
      teamCollabTitle: "Integrated Team Collaboration",
      teamCollabDesc: "Provides team members collaboration between statements.",
      getStarted: "Get Started",
    },
  };

  const t = translations[language];

  if (isAuthenticated()) return <Navigate to="/" replace />;

  return (
    <div className="flex h-full w-full">
      <div className="flex w-1/2 items-center p-4">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div>
            <div className="ml-3 tracking-[-0.05em]">
              <h1 className="tracking-[-0.05em]">{t.title}</h1>
              <h3 className="mt-3">{t.subtitle}</h3>
            </div>
            <div className="ml-10 mt-[50px] tracking-[-0.05em]">
              <h2>{t.apiSpecTitle}</h2>
              <div className="ml-3 mt-3 tracking-tight">{t.apiSpecDesc}</div>
              <h2 className="mt-10">{t.docMockupTitle}</h2>
              <div className="ml-3 mt-3 tracking-tight">{t.docMockupDesc}</div>
              <h2 className="mt-10">{t.serverGenTitle}</h2>
              <div className="ml-3 mt-3 tracking-tight">{t.serverGenDesc}</div>
              <h2 className="mt-10">{t.teamCollabTitle}</h2>
              <div className="ml-3 mt-3 tracking-tight">{t.teamCollabDesc}</div>
            </div>
          </div>
          <div className="mt-7 flex justify-center">
            <button
              className="rounded-md bg-gray-500 px-6 py-3 font-bold text-white hover:bg-gray-600"
              onClick={() => {
                openModal("", <LoginModal />);
              }}
            >
              {t.getStarted}
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <img
          src="/asset/home/home-introduce.svg"
          className="w-[430px]"
          alt="home-introduce"
        />
      </div>
    </div>
  );
}

export default Home;
