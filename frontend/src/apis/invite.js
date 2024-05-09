import axios from "./authAxios";

const inviteMembers = async ({ projectId, teamMember }) => {
  await axios.post("invite", {
    projectId,
    teamMember,
  });
};

const getInvitationState = async (projectId) => {
  const { data } = await axios.get(`invite/${projectId}`);

  return data;
};

const answerInvitation = async (projectId, answer) => {
  const { data } = await axios.post(`invite/${projectId}`, { answer });

  return data;
};

export { inviteMembers, getInvitationState, answerInvitation };
