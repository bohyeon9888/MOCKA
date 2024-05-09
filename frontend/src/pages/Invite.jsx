import { useSearchParams } from "react-router-dom";
import { useModalStore } from "../store";
import { getInvitationState } from "../apis/invite";
import AcceptModal from "../components/modal/AcceptModal";
import { useEffect } from "react";

export default function Invite() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");
  const { openModal } = useModalStore();

  useEffect(() => {
    getInvitationState(projectId).then((state) => {
      openModal("Invite Project", <AcceptModal />, state);
    });
  }, []);

  return <div></div>;
}
