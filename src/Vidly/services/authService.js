import http from "./httpService";

const apiEndpoint = "http://localhost:3900/api" + "/auth";

export function login(email, password) {
  return http.post(apiEndpoint, {
    email: email,
    password: password,
  });
}
