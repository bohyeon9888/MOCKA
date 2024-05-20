const filterTabs = (tabs, project) => {
  console.log(tabs, project);
  if (!tabs || tabs.length === 0) return [];
  return tabs.filter(({ apiId, groupId }) => {
    const group = project.groups.filter((g) => g.groupId === groupId);
    if (group.length === 0) return false;
    const api = group.apiProjects.filter((a) => a.apiId === apiId);
    if (api.length === 0) return false;
    return true;
  });
};

export default filterTabs;
