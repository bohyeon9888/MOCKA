import axios from "axios";
import { getToken } from "../utils/auth";
import { tokenRefresh } from "./social";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (e) => {
    return Promise.reject(e);
  },
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await tokenRefresh();
        const accessToken = getToken();
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return authAxios(error.config);
      } catch (e) {
        console.log(e);
      }
    }
  },
);

export default authAxios;
