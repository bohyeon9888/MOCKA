import ApiBox from "./ApiBox";

export default function ApiListGroup({
  groupId,
  groupName,
  groupUri,
  apiProjects,
}) {
  return (
    <div className="mt-[40px] flex flex-col items-center space-y-5">
      {apiProjects.length === 0 ? (
        <div className="font-medium text-gray-500">No API created.</div>
      ) : (
        apiProjects.map((api) => <ApiBox key={api.apiId} {...api} />)
      )}
    </div>
  );
}
