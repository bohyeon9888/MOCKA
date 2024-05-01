import axios from "axios";
import { getToken } from "../utils/auth";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) config.headers["Authorization"] = accessToken;

    return config;
  },
  (e) => {
    return Promise.reject(e);
  },
);

export default authAxios;
