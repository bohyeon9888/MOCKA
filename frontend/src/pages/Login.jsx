import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../apis/social";

export default function Login() {
  const navigate = useNavigate();

  function getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(key);
    return encodeURIComponent(value || "");
  }

  useEffect(() => {
    const code = getQueryStringValue("code");
    googleLogin(code).finally(() => {
      navigate("/");
    });
  }, []);

  return <div>Login ...</div>;
}
