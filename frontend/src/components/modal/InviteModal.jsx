import { useState } from "react";
import Input from "../Input";
import UserBox from "../UserBox";
import validateEmail from "../../utils/validateEmail";
import DropDown from "../DropDown";
import Button from "../button/Button";
import { useModalStore } from "../../store";
import { inviteMembers } from "../../apis/invite";

export default function InviteModal() {
  const [inviteList, setInviteList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [role, setRole] = useState("Viewer");
  const { state } = useModalStore();

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
    inviteMembers({
      teamMember: inviteList.map((email) => {
        return {
          email,
          projectRole: role.toUpperCase(),
        };
      }),
      projectId: state.projectId,
    });
  };

  return (
    <div className="flex flex-col space-y-[27px] px-5">
      <div className="flex flex-col space-y-1">
        <Input
          placeHolder="Example: mocka304@gmail.com"
          onKeyDownHandler={onKeyDownHandler}
          changeHandler={changeHandler}
          value={inputValue}
          isValid={validateEmail(inputValue)}
          useBorder
          isFull
        />
        <div className="text-medium px-2 text-4 leading-normal text-gray-500">
          Please enter the email of the person you want to invite to the project
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
      <div className="flex w-full flex-row justify-end space-x-[15px]">
        <DropDown
          size="small"
          value={role}
          options={["Viewer", "Editor"]}
          changeHandler={setRole}
        />
        <Button type="Invite" onClick={onClick} />
      </div>
    </div>
  );
}
