export function getToken() {
  return localStorage.getItem("token"); // assuming backend sends JWT to localStorage
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}
