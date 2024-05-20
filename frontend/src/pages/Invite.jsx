import { useSearchParams } from "react-router-dom";
import { useModalStore } from "../store";
import { getInvitationState } from "../apis/invite";
import AcceptModal from "../components/modal/AcceptModal";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Invite() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const { openModal } = useModalStore();
  const { language } = useLanguage();

  const text = {
    en: {
      modalTitle: "Invite Project",
    },
    ko: {
      modalTitle: "프로젝트 초대",
    },
  };

  const lang = text[language];

  useEffect(() => {
    getInvitationState(projectId).then((state) => {
      openModal(lang.modalTitle, <AcceptModal />, state);
    });
  }, [projectId, lang.modalTitle]);

  return <div></div>;
}
