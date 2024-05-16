import React, { useState, useEffect } from "react";
import { useModalStore, useProjectStore } from "../../store";
import { useLanguage } from "../../contexts/LanguageContext";

function ProjectEditModal() {
  const { project } = useProjectStore();
  const [inputValue, setInputValue] = useState(project.projectName);
  const [isValid, setIsValid] = useState(true); // 유효성 검사 결과 상태
  const { closeModal } = useModalStore();
  const { language } = useLanguage();

  const translations = {
    ko: {
      name: "이름",
      editProject: "프로젝트 수정",
      spacesNotAllowed: "공백은 허용되지 않습니다.",
      update: "업데이트",
      cancel: "취소",
      projectNameChanged: "프로젝트 이름이 변경되었습니다.",
      whitespaceNotAllowed: "프로젝트 이름에는 공백이 허용되지 않습니다.",
    },
    en: {
      name: "Name",
      editProject: "Edit Project",
      spacesNotAllowed: "Spaces are not allowed.",
      update: "Update",
      cancel: "Cancel",
      projectNameChanged: "Project name changed.",
      whitespaceNotAllowed: "Whitespace is not allowed in project name.",
    },
  };

  const t = translations[language];

  useEffect(() => {
    // inputValue가 변경될 때마다 공백을 검사
    const containsWhitespace = inputValue.includes(" ");
    setIsValid(!containsWhitespace);
  }, [inputValue]); // inputValue에 의존

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const update = () => {
    if (isValid) {
      project.projectName = inputValue; //프로젝트 이름 변경
      alert(t.projectNameChanged);
      closeModal();
    } else {
      alert(t.whitespaceNotAllowed);
    }
  };

  const cancel = () => {
    closeModal();
  };

  return (
    <div className="h-[190px] w-[542px]">
      <h4 className="ml-[32px] mt-[20px] w-full text-2">{t.name}</h4>
      <div className="flex items-center justify-center rounded-[10px]">
        <input
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          className={`mt-[20px] h-[50px] w-[478px] rounded-[10px] ${
            isValid
              ? "border-gray-200 bg-gray-100"
              : "border-red-500 bg-red-100"
          } pl-[20px] pr-[10px] text-[15px]`}
          placeholder={t.editProject}
        />
      </div>
      {!isValid ? (
        <div className="mr-[32px] mt-[5px] text-right text-sm text-red-500">
          {t.spacesNotAllowed}
        </div>
      ) : (
        <div className="mr-[32px] mt-[5px] text-right text-sm text-white">
          &nbsp;
        </div>
      )}
      <div className="mt-[10px] flex items-center justify-center">
        <div
          className="mr-[28px] flex h-[41px] w-[225px] cursor-pointer items-center justify-center rounded-[10px] bg-green-500 text-center"
          onClick={update}
        >
          <h3 className="text-white">{t.update}</h3>
        </div>
        <div
          className="flex h-[41px] w-[225px] cursor-pointer items-center justify-center rounded-[10px] bg-red-300"
          onClick={cancel}
        >
          <h3 className="text-white">{t.cancel}</h3>
        </div>
      </div>
    </div>
  );
}

export default ProjectEditModal;
