import Cookies from "js-cookie";

export function isAuthenticated() {
  const token = Cookies.get("access_token");
  return !!token;
}

export function login(token) {
  Cookies.set("access_token", token, { expires: 1 });
}

export function logout() {
  Cookies.remove("access_token");
}

export function getToken() {
  return Cookies.get("access_token");
}

export function getValueFromToken(key) {
  const token = getToken().split(" ")[1];
  if (!token) return undefined;

  const base64Url = token.split(".")[1];
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
