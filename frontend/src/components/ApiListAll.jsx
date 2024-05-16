import ApiBox from "./ApiBox";

export default function ApiListAll({ groups }) {
  return (
    <div className="mt-[40px] flex w-full flex-col items-center space-y-12">
      {groups.map(({ groupId, groupName, apiProjects, groupUri }) => (
        <div key={groupId} className="flex w-full flex-col items-center">
          <div className="flex w-4/5 flex-row items-center space-x-3">
            <h2 className="">{groupName}</h2>
            <div className="rounded-[6px] bg-gray-100 px-2 py-[6px] font-Fira font-medium text-red-300">
              {groupUri || "/"}
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col items-center space-y-5">
            {apiProjects.length === 0 ? (
              <div className="font-medium text-gray-500">No API created.</div>
            ) : (
              apiProjects.map((api) => (
                <ApiBox key={api.apiId} {...{ ...api, groupId }} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
