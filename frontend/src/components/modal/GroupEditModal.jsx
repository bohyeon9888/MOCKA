import { useEffect, useState } from "react";
import ContentBox from "../ContentBox";
import Input from "../Input";
import Button from "../button/Button";
import { createGroup } from "../../apis/group";
import { useModalStore, useProjectStore } from "../../store";
import { getProjectDetail } from "../../apis/project";
import { useLanguage } from "../../contexts/LanguageContext";

export default function GroupEditModal() {
  const [groupName, setGroupName] = useState("");
  const [groupUri, setGroupUri] = useState("/");
  const { project, setProject } = useProjectStore();
  const { closeModal } = useModalStore();
  const { language } = useLanguage();

  const translations = {
    ko: {
      groupName: "그룹 이름",
      groupUri: "그룹 공통 URI",
      create: "생성",
    },
    en: {
      groupName: "Group Name",
      groupUri: "Group Common URI",
      create: "Create",
    },
  };

  const t = translations[language];

  const changeUriHandler = (e) => {
    const regex = /\//;
    const lowerCase = e.target.value.toLowerCase();
    setGroupUri(regex.test(lowerCase) ? lowerCase : "/" + lowerCase);
  };

  const changeNameHandler = (e) => {
    setGroupName(e.target.value);
  };

  const onClick = () => {
    if (groupName.trim() === "") return;
    createGroup({
      projectId: project.projectId,
      groupName,
      groupUri,
    }).then(() => {
      getProjectDetail(project.projectId).then((data) => {
        setProject(data);
        closeModal();
      });
    });
  };

  return (
    <div className="flex flex-col space-y-5 px-5 pt-2">
      <ContentBox title={t.groupName}>
        <Input isFull value={groupName} changeHandler={changeNameHandler} />
      </ContentBox>
      <ContentBox title={t.groupUri}>
        <Input isFull value={groupUri} changeHandler={changeUriHandler} />
      </ContentBox>
      <div className="h-0 w-[500px]" />
      <div className="mt-4 flex justify-end">
        <Button type={t.create} onClick={onClick} />
      </div>
    </div>
  );
}
