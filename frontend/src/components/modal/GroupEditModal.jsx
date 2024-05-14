import { useEffect, useState } from "react";
import ContentBox from "../ContentBox";
import Input from "../Input";
import Button from "../button/Button";
import { createGroup } from "../../apis/group";
import { useModalStore, useProjectStore } from "../../store";
import { getProjectDetail } from "../../apis/project";

export default function GroupEditModal() {
  const [groupName, setGroupName] = useState("");
  const [groupUri, setGroupUri] = useState("/");
  const { project, setProject } = useProjectStore();
  const { closeModal } = useModalStore();

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
    <div className="flex w-[500px] flex-col space-y-5 px-5 pt-2">
      <ContentBox title="Group Name">
        <Input isFull value={groupName} changeHandler={changeNameHandler} />
      </ContentBox>
      <ContentBox title="Group Common URI">
        <Input isFull value={groupUri} changeHandler={changeUriHandler} />
      </ContentBox>
      <div className="mt-4 flex justify-end">
        <Button type="Create" onClick={onClick} />
      </div>
    </div>
  );
}
