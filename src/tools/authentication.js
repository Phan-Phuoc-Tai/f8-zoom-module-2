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
    profile: "/auth/me",
    changePassword: "/auth/change-password",
  },
  init() {
    this.handleLogin();
    this.handleRegister();
    this.handleChangeProfile();
  },
  sanitizeText(str) {
    return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  },
  handleLogin() {
    const formLogin = document.querySelector(".js-form-login");
    formLogin.firstElementChild.focus();

    formLogin.onsubmit = async (e) => {
      e.preventDefault();
      const email = formLogin.querySelector(".js-email").value;
      const password = formLogin.querySelector(".js-password").value;
      const isValidEmail = validation.email(email);
      const isValidPassword = validation.password(password, false);

      try {
        eventApp.showLoading();
        if (!isValidEmail.type) {
          throw new Error(`${isValidEmail.message}`);
        }
        if (!isValidPassword.type) {
          throw new Error(`${isValidPassword.message}`);
        }

        const loginData = await this.requestLogin(
          this.sanitizeText(email),
          this.sanitizeText(password)
        );
        eventApp.removeLoading(0);
        if (loginData) {
          localStorage.setItem("accessToken", loginData.access_token);
          localStorage.setItem("refreshToken", loginData.refresh_token);
          notice.showSuccess(
            "Đăng nhập thành công! Xin vui lòng đợi trong giây lát!"
          );
          router.navigate("/");
        }
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
    formRegister.firstElementChild.focus();
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
          this.sanitizeText(username),
          this.sanitizeText(email),
          this.sanitizeText(password),
          this.sanitizeText(passwordConformation)
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

  async getProfile() {
    const response = await httpRequest.get(this._api.profile);
    return response.data;
  },

  async handleChangeProfile() {
    const formChangeProfile = document.querySelector(".js-change-profile");
    formChangeProfile.firstElementChild.focus();
    const profile = await this.getProfile();
    const username = formChangeProfile.querySelector(".js-username");
    const email = formChangeProfile.querySelector(".js-email");

    username.value = profile.name;
    email.value = profile.email;
    formChangeProfile.addEventListener("submit", async (e) => {
      e.preventDefault();
      const isValidUsername = validation.username(username.value);
      const isValidEmail = validation.email(email.value);

      try {
        if (!isValidUsername.type) {
          throw new Error(`${isValidUsername.message}`);
        }

        if (!isValidEmail.type) {
          throw new Error(`${isValidEmail.message}`);
        }

        const changeProfileData = await this.requestChangeProfile(
          this.sanitizeText(username.value),
          this.sanitizeText(email.value)
        );
        if (changeProfileData === 200) {
          eventApp.removeLoading(0);
          notice.showSuccess("Cập nhật thông tin thành công!");
          router.navigate("/");
        }
      } catch (e) {
        eventApp.removeLoading(0);
        notice.showError(e.message);
      } finally {
        notice.hideNotice();
      }
    });
  },

  async requestChangeProfile(name, email) {
    try {
      eventApp.showLoading();
      const response = await httpRequest.patch(this._api.profile, {
        name,
        email,
      });
      return response.status;
    } catch {}
  },

  handleChangePassword() {
    const formChangePassword = document.querySelector(".js-change-password");
    formChangePassword.firstElementChild.focus();
    formChangePassword.addEventListener("submit", async (e) => {
      e.preventDefault();
      const oldPassword =
        formChangePassword.querySelector(".js-old-password").value;
      const password = formChangePassword.querySelector(".js-password").value;
      const confirmPassword = formChangePassword.querySelector(
        ".js-confirm-password"
      ).value;

      const isValidOldPassword = validation.password(oldPassword, true);
      const isValidPassword = validation.password(password, true);
      const isValidPasswordConformation = validation.passwordConformation(
        confirmPassword,
        password
      );

      try {
        if (!isValidOldPassword.type) {
          throw new Error(isValidOldPassword.message);
        }
        if (!isValidPassword.type) {
          throw new Error(isValidPassword.message);
        }
        if (!isValidPasswordConformation.type) {
          throw new Error(isValidPasswordConformation.message);
        }
        const changePasswordData = await this.requestChangePassword(
          this.sanitizeText(oldPassword),
          this.sanitizeText(password),
          this.sanitizeText(confirmPassword)
        );
        if (changePasswordData === 200) {
          eventApp.removeLoading();
          notice.showSuccess("Đổi mật khẩu thành công!");
          router.navigate("/");
        }
      } catch (e) {
        eventApp.removeLoading();
        notice.showError(e.message);
      } finally {
        notice.hideNotice();
      }
    });
  },
  async requestChangePassword(oldPassword, password, confirmPassword) {
    try {
      eventApp.showLoading();
      const response = await httpRequest.patch(this._api.changePassword, {
        oldPassword,
        password,
        confirmPassword,
      });
      return response.status;
    } catch {}
  },
};
