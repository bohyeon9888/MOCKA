import axios from "axios";
import { login } from "../utils/auth";

export const googleLogin = async (code) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}oauth/callback/google?code=${code}`,
  );

  login(data.accessToken);
  return data;
};

export const tokenRefresh = async () => {
  const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}refresh`);
  login(data.accessToken);
};
