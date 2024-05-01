import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  function getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(key);
    return encodeURIComponent(value || "");
  }

  useEffect(() => {
    const code = getQueryStringValue("code");
    axios
      .get(`http://localhost:8081/api/oauth/callback/google?code=${code}`)
      .then(({ data }) => {
        console.log(data);
        login(data.accessToken);
        sessionStorage.setItem(
          "profile",
          JSON.stringify({ nickname: data.nickname, profile: data.profile }),
        );
        navigate("/", { replace: true });
      });
  }, []);

  return <div>Login</div>;
}
