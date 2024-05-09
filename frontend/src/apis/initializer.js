import axios from "./authAxios";
import formatInitializerRequest from "../utils/formatInitializerRequest";

const downloadSpringInitializer = async ({
  initializerSetting,
  projectName,
}) => {
  const formattedSetting = formatInitializerRequest(initializerSetting);
  const { data } = await axios({
    method: "post",
    url: `${import.meta.env.VITE_BASE_URL}initializer/create/1`,
    data: formattedSetting,
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${projectName || "projectName"}.zip`);
  document.body.append(link);
  link.click();

  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);

  return data;
};

export default downloadSpringInitializer;
