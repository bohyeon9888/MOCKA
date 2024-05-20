import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../apis/social";
import { useUserStore } from "../store";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();

  function getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(key);
    return encodeURIComponent(value || "");
  }

  useEffect(() => {
    const code = getQueryStringValue("code");
    googleLogin(code)
      .then((data) => {
        login(data.nickname, data.profile);
      })
      .finally(() => {
        navigate("/");
      });
  }, []);

  return <div></div>;
}
