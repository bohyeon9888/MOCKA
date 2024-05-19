import { useProjectStore } from "../store";
import DropDown from "./DropDown";

export default function GroupSelect({ groupId, setGroupId, setDocument }) {
  const { project } = useProjectStore();
  const groupList = project.groups.map(({ groupName, groupId }) => {
    return {
      value: groupId,
      name: groupName,
    };
  });
  const group = groupId
    ? project.groups.filter((group) => group.groupId == groupId)[0]
    : project.groups[0];

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        <span className="text-4 font-semibold">Common URI : </span>
        <span className="ml-1 rounded-[6px] bg-gray-100 p-1 font-Fira text-4 text-red-500">
          {group.groupUri || "/"}
        </span>
      </div>
      <DropDown
        value={group.groupName}
        options={groupList}
        changeHandler={(value) => {
          if (value === groupId) return;
          // const prevUri = project.groups.filter(
          //   (group) => group.groupId == groupId,
          // )[0].groupUri;
          // const nextUri = project.groups.filter(
          //   (group) => group.groupId == value,
          // )[0].groupUri;
          setGroupId(value);
          // setDocument((document) => {
          //   const newUri = document.apiUri.replace(prevUri, nextUri);
          //   return {
          //     ...document,
          //     apiUri: newUri,
          //   };
          // });
        }}
      />
    </div>
  );
}
