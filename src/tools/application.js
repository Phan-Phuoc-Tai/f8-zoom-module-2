import httpRequest from "./httpRequest";

//Tất cả sự kiện của trang
export const eventApp = {
  _api: {
    login: "/auth/login",
  },

  init() {
    this.formToggle();
    this.submitLogin();
  },
  formToggle() {
    const loginEl = document.querySelector(".login");
    const registerEl = document.querySelector(".register");
    const registerBtnEl = document.querySelector(".register-btn");
    const loginBtnEl = document.querySelector(".login-btn");

    registerBtnEl.addEventListener("click", () => {
      this.handleFormToggle(registerEl, loginEl);
    });
    loginBtnEl.addEventListener("click", () => {
      this.handleFormToggle(loginEl, registerEl);
    });
  },
  handleFormToggle(showElement, hideElement) {
    showElement.classList.replace("opacity-0", "opacity-100");
    showElement.classList.replace("invisible", "visible");
    showElement.classList.replace("hidden", "flex");
    showElement.classList.replace("active-form", "hidden-form");

    hideElement.classList.replace("opacity-100", "opacity-0");
    hideElement.classList.replace("visible", "invisible");
    hideElement.classList.replace("flex", "hidden");
    hideElement.classList.replace("hidden-form", "active-form");
  },

  submitLogin() {
    const activeForm = document.querySelector(".active-form");
    const formLogin = activeForm.querySelector(".form-login");

    //validate email, password: mai viết code
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = formLogin.querySelector(".js-email").value;
      const password = formLogin.querySelector(".js-password").value;

      try {
        const loginData = await this.requestLogin(email, password);

        if (loginData) {
          localStorage.setItem("accessToken", loginData.access_token);
          localStorage.setItem("refreshToken", loginData.refresh_token);

          //chuyển sang trang home
          this.showMessage(
            "Đăng nhập thành công! Xin ui lòng đợi trong giây lát!"
          );
        }
      } catch {
        this.showMessage("Đăng nhập thất bại! Xin vui lòng thử lại!", "error");
      } finally {
        setTimeout(() => {
          this.hideMessage();
        }, 1000);
      }
    });
  },

  async requestLogin(email, password) {
    const response = await httpRequest.post(
      `${this._api.login}`,
      JSON.stringify({ email, password })
    );
    return response.data;
  },

  showMessage(msg, type = "success") {
    const toastEl = document.querySelector(".toast");
    toastEl.classList.add("show", type);
    toastEl.innerText = msg;
  },

  hideMessage(type = "success") {
    const toastEl = document.querySelector(".toast");
    toastEl.classList.remove("show", type);
  },
};
