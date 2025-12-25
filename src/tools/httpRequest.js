import axios from "axios";
import { router } from "../../route/router";
import { notice } from "./notice";
import { eventApp } from "./application";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

let refreshPromise = null;
export const logout = () => {
  try {
    eventApp.showLoading();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.navigate("/login");
  } catch {
  } finally {
    notice.hideNotice();
    eventApp.removeLoading();
  }
};
const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

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
      throw new Error("Unauthorized");
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
    if (error.status === 401) {
      if (!refreshPromise) {
        refreshPromise = getNewToken();
      }
      const newToken = await refreshPromise;
      if (newToken) {
        localStorage.setItem("accessToken", newToken.access_token);
        localStorage.setItem("refreshToken", newToken.refresh_token);
        //Gọi lại request bị failed
        return httpRequest(error.config);
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          notice.showSuccess("Vui lòng đăng nhập!");
        } else {
          notice.showSuccess("Phiên đăng nhập hết hạn!");
        }
        logout();
        notice.hideNotice(2000);
        eventApp.removeLoading();
      }
    }
    return Promise.reject(error);
  }
);
export default httpRequest;
