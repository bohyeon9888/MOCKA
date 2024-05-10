import ApiBox from "./ApiBox";

export default function ApiListAll({ groups }) {
  return (
    <div className="mt-[40px] flex w-full flex-col items-center space-y-12">
      {groups.map(({ groupId, groupName, apiProjects }) => (
        <div key={groupId} className="flex w-full flex-col items-center">
          <h2 className="w-4/5">{groupName}</h2>
          <div className="mt-4 flex w-full flex-col items-center space-y-5">
            {apiProjects.length > 0 &&
              apiProjects.map((api) => <ApiBox key={api.apiId} {...api} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
