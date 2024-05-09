import axios from "./authAxios";
import formatInitializerRequest from "../utils/formatInitializerRequest";

const downloadSpringInitializer = async (initializerSetting) => {
  const formattedSetting = formatInitializerRequest(initializerSetting);
  const { data } = await axios.post("initializer/create/24", formattedSetting);

  return data;
};

export default downloadSpringInitializer;
