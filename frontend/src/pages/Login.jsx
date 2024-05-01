import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    axios
      .post("http://localhost:8081/api/oauth/callback/google", {
        code,
      })
      .then(({ data }) => {
        console.log(data);
        login(data.accessToken);
        sessionStorage.setItem(
          "profile",
          JSON.stringify({ nickname: data.nickname, profile: data.profile }),
        );
        navigate("/home");
      });
  }, []);

  return <div>Login</div>;
}
