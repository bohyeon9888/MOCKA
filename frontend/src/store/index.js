import createUserStore from "./user";
import createProjectStore from "./project";
import createModalStore from "./modal";

const useUserStore = createUserStore();
const useProjectStore = createProjectStore();
const useModalStore = createModalStore();

export { useUserStore, useProjectStore, useModalStore };
