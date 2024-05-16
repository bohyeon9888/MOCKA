import { useState, useEffect } from "react";
import Input from "../Input";
import UserBox from "../UserBox";
import validateEmail from "../../utils/validateEmail";
import DropDown from "../DropDown";
import Button from "../button/Button";
import { useModalStore } from "../../store";
import { inviteMembers } from "../../apis/invite";
import { useLanguage } from "../../contexts/LanguageContext";

export default function InviteModal() {
  const { state } = useModalStore();
  const { language } = useLanguage();

  const translations = {
    ko: {
      placeHolder: "예: mocka304@gmail.com",
      instruction: "프로젝트에 초대할 사람의 이메일을 입력해주세요",
      invite: "초대",
      viewer: "뷰어",
      editor: "편집자",
    },
    en: {
      placeHolder: "Example: mocka304@gmail.com",
      instruction:
        "Please enter the email of the person you want to invite to the project",
      invite: "Invite",
      viewer: "Viewer",
      editor: "Editor",
    },
  };

  const t = translations[language];

  // Initial state for role based on language
  const [role, setRole] = useState(t.viewer);
  const [inviteList, setInviteList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Update role when language changes
  useEffect(() => {
    setRole(t.viewer);
  }, [language]);

  const removeItem = (idx) => {
    setInviteList([
      ...inviteList.slice(0, idx),
      ...inviteList.slice(idx + 1, inviteList.length),
    ]);
  };

  const onKeyDownHandler = (e) => {
    if (
      e.target.value !== "" &&
      e.key === "Enter" &&
      validateEmail(inputValue)
    ) {
      if (!inviteList.includes(e.target.value))
        setInviteList([...inviteList, e.target.value]);
      e.target.value = "";
    }
  };

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    const translatedRole = role === t.viewer ? "VIEWER" : "EDITOR";
    inviteMembers({
      teamMember: inviteList.map((email) => {
        return {
          email,
          projectRole: translatedRole,
        };
      }),
      projectId: state.projectId,
    });
  };

  return (
    <div
      className="flex flex-col space-y-[27px] px-5"
      style={{ width: "530px", maxWidth: "100%" }}
    >
      <div className="flex flex-col space-y-1">
        <Input
          placeHolder={t.placeHolder}
          onKeyDownHandler={onKeyDownHandler}
          changeHandler={changeHandler}
          value={inputValue}
          isValid={validateEmail(inputValue)}
          useBorder
          isFull
        />
        <div className="text-medium px-2 text-4 leading-normal text-gray-500">
          {t.instruction}
        </div>
      </div>
      <div>
        {inviteList.map((email, idx) => (
          <UserBox
            key={email}
            email={email}
            removeItem={() => {
              removeItem(idx);
            }}
          />
        ))}
      </div>
      <div className="relative flex w-full flex-row justify-end space-x-[15px]">
        <DropDown
          size="small"
          value={role}
          options={[t.viewer, t.editor]}
          changeHandler={setRole}
        />
        <Button type={t.invite} onClick={onClick} />
      </div>
    </div>
  );
}
