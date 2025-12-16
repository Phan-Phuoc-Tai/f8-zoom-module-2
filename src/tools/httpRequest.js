import axios from "axios";
import { router } from "../../route/router";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

let refreshPromise = null;
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  router.navigate("/");
};
const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await fetch(
      `https://youtube-music.f8team.dev/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch {
    return false;
  }
};

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    if (error.status === 401) {
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      if (newToken) {
        //lưu vào localStorage
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        //Gọi lại request bị failed
        return httpRequest(error.config);
      } else {
        //logout
        logout();
      }
    }
    return Promise.reject(error);
  }
);
export default httpRequest;
