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
