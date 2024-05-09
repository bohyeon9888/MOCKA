import Cookies from "js-cookie";

export function isAuthenticated() {
  const token = Cookies.get("accessToken");
  if (!token) return false;

  const username = getValueFromToken("username");
  const profile = getValueFromToken("profile");

  const isLogin = !!(username && profile);
  if (!isLogin) logout();

  return isLogin;
}

export function login(accessToken) {
  const nextHalfDay = new Date();
  nextHalfDay.setTime(nextHalfDay.getTime() + 12 * 60 * 60 * 1000);

  Cookies.set("accessToken", accessToken, { expires: nextHalfDay });
}

export function logout() {
  Cookies.remove("accessToken");
}

export function getToken() {
  return Cookies.get("accessToken");
}

export function getValueFromToken(key) {
  const token = getToken();
  if (!token) return undefined;

  const base64Url = token.split(".")[1];
  if (!base64Url) return undefined;
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload)[key];
}
