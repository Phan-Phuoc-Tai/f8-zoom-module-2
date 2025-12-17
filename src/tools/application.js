import { router } from "../../route/router";
import { auth } from "./authentication";
import { logout } from "./httpRequest";

//Tất cả sự kiện của trang
export const eventApp = {
  init(user) {
    this.formEvent();
    this.showSideBarModal();
    this.hideSideBarModal();
    this.sideBarActive();
    this.updateProfile(user);
    this.hideLoginSideBar(user);
    this.showOptions();
    this.controlScroll();
  },

  showLoading() {
    const loading = document.querySelector(".js-loading");
    const body = document.querySelector(".js-body");
    const spin = document.createElement("div");
    const space = spin.cloneNode(true);
    space.className =
      "fixed inset-0 z-10000 backdrop-blur-xl bg-white/40 flex items-center justify-center";
    spin.className =
      "w-12 h-12 border-4 border-neutral-600 rounded-[50%] border-t-white animate-spin";
    loading.append(space);
    space.append(spin);
    body.classList.toggle("h-screen");
  },
  removeLoading(timeout = 0) {
    const loading = document.querySelector(".js-loading");
    const body = document.querySelector(".js-body");
    setTimeout(() => {
      loading.firstElementChild.remove();
      body.classList.toggle("h-screen");
    }, timeout);
    return "";
  },

  //form: Begin
  formEvent() {
    const loginEl = document.querySelector(".js-login");
    const goLoginEl = document.querySelector(".js-go-login");
    const loginBtnEl = document.querySelector(".js-login-btn");
    const registerEl = document.querySelector(".js-register");
    const goRegisterEl = document.querySelector(".js-go-register");
    const registerBtnEl = document.querySelector(".js-register-btn");
    const emailLoginEl = document.querySelector(".js-email");
    const emailRegisterEl = document.querySelector(".js-email-register");
    if (goRegisterEl) {
      goRegisterEl.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleFormToggle(registerEl, loginEl);
        emailRegisterEl.focus();
      });
    }
    if (goLoginEl) {
      goLoginEl.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleFormToggle(loginEl, registerEl);
        emailLoginEl.focus();
      });
    }
    if (loginBtnEl) {
      loginBtnEl.onclick = auth.handleLogin();
    }
    if (registerBtnEl) {
      registerBtnEl.onclick = auth.handleRegister();
    }
  },
  handleFormToggle(showElement, hideElement) {
    showElement.classList.replace("opacity-0", "opacity-100");
    showElement.classList.replace("invisible", "visible");
    showElement.classList.replace("hidden", "flex");

    hideElement.classList.replace("opacity-100", "opacity-0");
    hideElement.classList.replace("visible", "invisible");
    hideElement.classList.replace("flex", "hidden");
  },
  //form: End
  /*===================================================*/
  //sideBar: Begin
  showSideBarModal() {
    const sideBarToggleEl = document.querySelector(".side-bar-toggle");
    const sideBarModalEl = document.querySelector(".side-bar .side-bar-modal");
    const modalInnerEl = sideBarModalEl.querySelector(".modal-inner");
    sideBarToggleEl.addEventListener("click", (e) => {
      e.stopPropagation();
      sideBarModalEl.classList.replace("opacity-0", "opacity-100");
      sideBarModalEl.classList.replace("invisible", "visible");
      modalInnerEl.classList.replace("-translate-x-full", "translate-x-0");
    });
  },
  hideSideBarModal() {
    const sideBarModalEl = document.querySelector(".side-bar .side-bar-modal");
    const modalInnerEl = sideBarModalEl.querySelector(".modal-inner");
    const overlayEl = sideBarModalEl.querySelector(".overlay");
    const closeModalEl = sideBarModalEl.querySelector(".close-modal");

    closeModalEl.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideModal(modalInnerEl, sideBarModalEl);
    });

    overlayEl.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hideModal(modalInnerEl, sideBarModalEl);
    });
  },
  hideModal(modalInnerEl, sideBarModalEl) {
    modalInnerEl.classList.replace("translate-x-0", "-translate-x-full");
    setTimeout(() => {
      sideBarModalEl.classList.replace("opacity-100", "opacity-0");
      sideBarModalEl.classList.replace("visible", "invisible");
    }, 300);
  },
  sideBarActive() {
    const items = document.querySelectorAll(".side-bar-desktop ul li a");
    items.forEach((item) => {
      item.onclick = (e) => {
        e.stopPropagation();
        const itemActive = document.querySelector(
          ".side-bar-desktop ul li .active"
        );
        itemActive.classList.remove("active");
        item.classList.add("active");
      };
    });
  },

  hideLoginSideBar(user) {
    const ulSideBar = document.querySelector(".side-bar-desktop ul");
    const ulModal = document.querySelector(".side-bar-modal ul");
    const loginSideBar = document.querySelector(".js-login-side-bar");
    const loginModal = document.querySelector(".js-login-modal");
    const descModal = document.querySelector(".js-desc");
    const vipSideBar = document.querySelector(".js-vip-side-bar");
    const vipModal = document.querySelector(".js-vip-modal");

    if (user) {
      loginSideBar.classList.add("hidden");
      loginModal.classList.add("hidden");
      descModal.classList.add("hidden");
      ulSideBar.classList.remove("border-b", "border-white/70");
      ulModal.classList.remove("border-b", "border-white/70");
      vipSideBar.classList.remove("hidden");
      vipModal.classList.remove("hidden");
    }
  },
  //sideBar: End
  /*===================================================*/
  //header <updateProfile>, <showOptions>: Begin
  updateProfile(user) {
    const userProfile = document.querySelector(".user-profile");
    let avatar;
    if (user) {
      avatar = `
        <button
          class="w-10 h-10 lg:mr-10 rounded-full bg-white/20 text-white text-center font-semibold hover:bg-white/40 cursor-pointer select-none"
        >
        ${user.charAt(0)}
        </button>
        <ul class="options absolute right-10 mt-2 w-52 rounded-xl overflow-hidden bg-[#1f1f1f] shadow-lg border border-white/10 text-white transition-all duration-150 z-50 opacity-0 invisible translate-y-2 cursor-pointer">
          <li>
            <a href="/auth/profile" class="block px-4 py-3 text-sm hover:bg-white/10 transition">Thông tin người dùng</a>
          </li>
          <li>
            <a href="/auth/change-password" class="block px-4 py-3 text-sm hover:bg-white/10 transition">Đổi mật khẩu</a>
          </li> 
          <li>
            <a class="js-logout-btn block px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition">Đăng xuất</a>
          </li>
        </ul>`;
    } else {
      avatar = `<a
                href="/login"
                data-navigo
                class="px-4 py-2 lg:mr-10 rounded-full bg-white/90 font-semibold hover:bg-white/80 hover:rounded-full cursor-pointer select-none"
              >
                Đăng nhập
              </a>`;
    }
    userProfile.innerHTML = avatar;
    router.updatePageLinks();
  },
  showOptions() {
    const profile = document.querySelector(".user-profile");
    const options = profile.querySelector(".options");
    if (options) {
      profile.addEventListener("click", (e) => {
        options.classList.toggle("invisible");
        options.classList.toggle("opacity-0");
        options.classList.toggle("translate-y-2");

        options.classList.toggle("visible");
        options.classList.toggle("opacity-100");
        options.classList.toggle("translate-y-0");
      });
      const logoutBtn = options.querySelector(".js-logout-btn");
      logoutBtn.onclick = (e) => {
        e.stopPropagation();
        logout();
      };
    }
  },

  //header <updateProfile>, <showOptions>: End
  /*===================================================*/

  //content : Begin
  controlScroll() {
    const xScrolls = document.querySelectorAll(".js-xScroll");

    xScrolls.forEach((xScroll) => {
      const xScrollScrollWidth = xScroll.scrollWidth;
      const xScrollClientWidth = xScroll.clientWidth;
      if (xScrollScrollWidth > xScrollClientWidth) {
        const controls = xScroll.previousElementSibling;
        const nextBtn = controls.querySelector(".js-next-btn");
        const previousBtn = controls.querySelector(".js-previous-btn");
        nextBtn.classList.remove("pointer-events-none", "text-white/30");
        nextBtn.classList.add(
          "cursor-pointer",
          "text-white",
          "hover:bg-white/20"
        );
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          xScroll.scrollLeft += 512;
          previousBtn.classList.remove("pointer-events-none", "text-white/30");
          previousBtn.classList.add(
            "cursor-pointer",
            "text-white",
            "hover:bg-white/20"
          );
        });
        previousBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          xScroll.scrollLeft -= 512;
        });
      }
    });
  },

  //content : End
};
