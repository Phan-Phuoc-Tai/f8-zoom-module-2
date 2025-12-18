import { router } from "../../route/router";
import { eventApp } from "./application";
import httpRequest from "./httpRequest";
import { notice } from "./notice";
import validation from "./validation";

//xử lý login,register, logout, change-password, change-profile, ghi lại lịch sử nghe nhạc(events/play)
export const auth = {
  _api: {
    login: "/auth/login",
    register: "/auth/register",
  },
  init() {
    this.handleLogin();
    this.handleRegister();
  },

  handleLogin() {
    const formLogin = document.querySelector(".js-form-login");
    //validate email, password: mai viết code
    formLogin.onsubmit = async (e) => {
      e.preventDefault();
      const email = formLogin.querySelector(".js-email").value;
      const password = formLogin.querySelector(".js-password").value;
      const isValidEmail = validation.email(email);
      const isValidPassword = validation.password(password);

      try {
        if (!isValidEmail.type) {
          throw new Error(`${isValidEmail.message}`);
        }
        if (!isValidPassword.type) {
          throw new Error(`${isValidPassword.message}`);
        }

        const loginData = await this.requestLogin(email, password);
        eventApp.removeLoading(0);
        if (loginData) {
          localStorage.setItem("accessToken", loginData.access_token);
          localStorage.setItem("refreshToken", loginData.refresh_token);
          notice.showSuccess(
            "Đăng nhập thành công! Xin vui lòng đợi trong giây lát!"
          );
        }
        router.navigate("/");
      } catch (e) {
        eventApp.removeLoading();
        notice.showError(e.message);
      } finally {
        notice.hideNotice();
      }
    };
  },

  async requestLogin(email, password) {
    try {
      eventApp.showLoading();
      const response = await httpRequest.post(
        `${this._api.login}`,
        JSON.stringify({ email, password })
      );

      return response.data;
    } catch {
      eventApp.removeLoading();
      notice.showError(
        "Email hoặc mật khẩu không chính xác! Xin vui lòng thử lại!"
      );
    }
  },

  handleRegister() {
    const formRegister = document.querySelector(".js-form-register");
    //validate email, password: mai viết code
    formRegister.onsubmit = async (e) => {
      e.preventDefault();
      const username = formRegister.querySelector(".js-username").value;
      const email = formRegister.querySelector(".js-email-register").value;
      const password = formRegister.querySelector(
        ".js-password-register"
      ).value;
      const passwordConformation = formRegister.querySelector(
        ".js-password-conformation"
      ).value;
      const isValidEmail = validation.email(email);
      const isValidPassword = validation.password(password);
      const isValidUsername = validation.username(username);
      const isValidPasswordConformation = validation.passwordConformation(
        passwordConformation,
        password
      );
      try {
        if (!isValidEmail.type) {
          throw new Error(`${isValidEmail.message}`);
        }
        if (!isValidUsername.type) {
          throw new Error(`${isValidUsername.message}`);
        }
        if (!isValidPassword.type) {
          throw new Error(`${isValidPassword.message}`);
        }
        if (!isValidPasswordConformation.type) {
          throw new Error(`${isValidPasswordConformation.message}`);
        }
        const registerData = await this.requestRegister(
          username,
          email,
          password,
          passwordConformation
        );
        if (registerData) {
          localStorage.setItem("accessToken", registerData.access_token);
          localStorage.setItem("refreshToken", registerData.refresh_token);

          eventApp.removeLoading();
          notice.showSuccess(
            "Đăng ký thành công! Xin vui lòng đợi trong giây lát!"
          );
          router.navigate("/");
        }
      } catch (e) {
        notice.showError(e.message);
      } finally {
        notice.hideNotice();
      }
    };
  },

  async requestRegister(name, email, password, confirmPassword) {
    try {
      eventApp.showLoading();
      const response = await httpRequest.post(
        `${this._api.register}`,
        JSON.stringify({ name, email, password, confirmPassword })
      );
      return response.data;
    } catch {
      eventApp.removeLoading();
      notice.showError(
        "Email đã được đăng ký! Xin vui lòng sử dụng email khác!"
      );
    }
  },
};
