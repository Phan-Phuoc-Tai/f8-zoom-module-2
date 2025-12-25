import { router } from "../../route/router";
import quickPick from "../components/quickPick";
import { auth } from "./authentication";
import httpRequest, { logout } from "./httpRequest";
import { notice } from "./notice";

//Tất cả sự kiện của trang
export const eventApp = {
  _query: {
    q: "",
  },

  init(user) {
    this.formEvent();
    this.showSideBarModal();
    this.hideSideBarModal();
    this.sideBarActive();
    this.updateProfile(user);
    this.hideLoginSideBar(user);
    this.showOptions();
    this.hideOptions();
    this.search();
    this.controlScroll();
    this.showSearchMobile();
  },

  showLoading() {
    const loading = document.querySelector(".js-loading");
    const body = document.querySelector(".js-body");
    const spin = document.createElement("div");
    const space = spin.cloneNode(true);
    space.className =
      "fixed inset-0 z-10000 backdrop-blur-lg bg-white/30 flex items-center justify-center";
    spin.className =
      "w-12 h-12 border-4 border-neutral-600 rounded-[50%] border-t-white animate-spin";
    loading.append(space);
    space.append(spin);
    body.classList.add("h-screen", "fixed", "inset-0", "bg-[#0a1a2f]");
  },
  removeLoading(timeout = 0) {
    const loading = document.querySelector(".js-loading");
    const body = document.querySelector(".js-body");
    setTimeout(() => {
      const childList = loading.childNodes;
      childList.forEach((child) => {
        child.remove();
      });
      body.classList.remove("h-screen", "fixed", "inset-0", "bg-[#0a1a2f]");
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
    const changProfileBtnEl = document.querySelector(".js-change-profile");
    const changePasswordBtnEl = document.querySelector(".js-change-password");
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

    if (changProfileBtnEl) {
      changProfileBtnEl.onclick = auth.handleChangeProfile();
    }

    if (changePasswordBtnEl) {
      changePasswordBtnEl.onclick = auth.handleChangePassword();
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
    const itemModal = document.querySelectorAll(".side-bar-modal ul li a");
    const sideBarModalEl = document.querySelector(".side-bar .side-bar-modal");
    const modalInnerEl = sideBarModalEl.querySelector(".modal-inner");
    const loginModal = document.querySelector(".side-bar .js-login-modal");
    items.forEach((item, index) => {
      item.onclick = (e) => {
        e.stopPropagation();
        const itemActive = document.querySelector(
          ".side-bar-desktop ul li .active"
        );
        const itemModalActive = document.querySelector(
          ".side-bar-modal ul li .active"
        );
        itemActive.classList.remove("active");
        itemModalActive.classList.remove("active");
        item.classList.add("active");
        itemModal[index].classList.add("active");
      };
    });

    itemModal.forEach((item, index) => {
      item.onclick = (e) => {
        e.stopPropagation();
        const itemActive = document.querySelector(
          ".side-bar-desktop ul li .active"
        );
        const itemModalActive = document.querySelector(
          ".side-bar-modal ul li .active"
        );
        itemActive.classList.remove("active");
        itemModalActive.classList.remove("active");
        item.classList.add("active");
        items[index].classList.add("active");
        this.hideModal(modalInnerEl, sideBarModalEl);
      };
    });
    loginModal.onclick = () => {
      this.hideModal(modalInnerEl, sideBarModalEl);
    };
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
            <a href="/auth/profile" data-navigo class="block px-4 py-3 text-sm hover:bg-white/10 transition">Thông tin người dùng</a>
          </li>
          <li>
            <a href="/auth/change-password"  data-navigo class="block px-4 py-3 text-sm hover:bg-white/10 transition">Đổi mật khẩu</a>
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
        e.stopPropagation();
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
        notice.showSuccess("Đăng xuất thành công!");
        logout();
      };
    }
  },
  hideOptions() {
    const profile = document.querySelector(".user-profile");
    const options = profile.querySelector(".options");
    document.addEventListener("click", () => {
      if (profile.firstElementChild.innerText !== "Đăng nhập") {
        if (
          options.classList.contains("visible") &&
          options.classList.contains("translate-y-0")
        ) {
          options.classList.remove("visible", "opacity-100", "translate-y-0");
          options.classList.add("invisible", "opacity-0", "translate-y-2");
        }
      }
    });
  },
  search() {
    const searchBtn = document.querySelector(".js-search-input");
    const searchSpace = document.querySelector(".js-search-space");
    const clearSearch = document.querySelector(".js-clear-search");
    const suggestList = document.querySelector(".js-suggest-list");

    searchBtn.addEventListener(
      "input",
      this.debounce(async (e) => {
        const keyword = e.target.value;
        this._query.q = keyword;

        if (keyword) {
          clearSearch.classList.remove("hidden");
          const response = await httpRequest.get(
            `/search/suggestions?q=${this._query.q}`
          );
          searchSpace.classList.remove("invisible", "opacity-0");
          searchSpace.classList.add("visible", "opacity-100");
          this.showSearchItems(response.data, searchSpace);
          const suggestionList = suggestList.childNodes;
          suggestionList.forEach((suggest) => {
            suggest.onclick = async () => {
              searchBtn.value = suggest.innerText;
              this._query.q = suggest.innerText;
              searchBtn.focus();
              const response = await httpRequest.get(
                `/search/suggestions?q=${searchBtn.value}`
              );
              this.showSearchItems(response.data, searchSpace);
            };
          });

          searchBtn.addEventListener("keydown", (e) => {
            const isEnter = e.key === "Enter" ? true : false;
            if (isEnter) {
              this.showLoading();
              this.redirectSearchPage(this._query.q);
              this.hideSearchSpace(null, searchSpace);
              searchBtn.blur();
              this.removeLoading(300);
            } else {
              return;
            }
          });
        } else {
          this.hideSearchSpace(clearSearch, searchSpace);
        }
        clearSearch.onclick = () => {
          searchBtn.value = "";
          this.hideSearchSpace(clearSearch, searchSpace);
          searchBtn.focus();
        };
      })
    );
  },
  showSearchItems(data, searchSpace) {
    const suggestionsEl = document.querySelector(".js-suggestions");
    const resultsEl = document.querySelector(".js-results");
    const suggestList = document.querySelector(".js-suggest-list");
    const resultList = document.querySelector(".js-result-list");
    const noResult = searchSpace.querySelector(".no-result");
    const suggestionsData = data.suggestions;
    const resultsData = data.completed;
    if (noResult) {
      noResult.remove();
    }

    if (
      suggestionsEl.classList.contains("hidden") ||
      resultsEl.classList.contains("hidden")
    ) {
      suggestionsEl.classList.remove("hidden");
      resultsEl.classList.remove("hidden");
    }

    const suggestions = suggestionsData
      .map((suggestion) => {
        return `<li class=" p-2 text-white text-sm rounded-md hover:bg-white/10 cursor-pointer">${suggestion}</li>`;
      })
      .join("");

    if (suggestionsData.length && resultsData.length) {
      suggestList.innerHTML = suggestions;
      resultList.innerHTML = quickPick("", resultsData, true, true);
    } else {
      const noResult = document.createElement("h4");
      noResult.classList.add("no-result", "p-4", "text-white/80", "rounded-md");
      noResult.innerText = `Không tìm thấy kết quả`;
      suggestionsEl.classList.add("hidden");
      resultsEl.classList.add("hidden");
      searchSpace.prepend(noResult);
    }
  },
  hideSearchSpace(clearSearch, searchSpace) {
    if (clearSearch) {
      clearSearch.classList.add("hidden");
    }
    searchSpace.classList.add("invisible", "opacity-0");
    searchSpace.classList.remove("visible", "opacity-100");
  },
  debounce(callback, timeout = 500) {
    let id;
    return (...args) => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        callback.apply(null, args);
      }, timeout);
    };
  },
  redirectSearchPage(key) {
    const url = `keyword=${key}`;
    router.navigate(`/search?${url}`);
  },

  showSearchMobile() {
    const searchEl = document.querySelector(".js-search");
    const searchMobileBtn = document.querySelector(".js-search-mobile");
    const hideMobileSearch = document.querySelector(".js-hide-search");
    const searchBtn = document.querySelector(".js-search-input");
    if (searchMobileBtn) {
      searchMobileBtn.onclick = (e) => {
        e.stopPropagation();
        searchEl.classList.toggle("hidden");
        searchEl.classList.toggle("flex");
        searchEl.classList.toggle("showSearch");
        searchBtn.classList.toggle("bg-neutral-600");
        hideMobileSearch.classList.replace(
          "fa-magnifying-glass",
          "fa-arrow-left"
        );
      };
    }
    if (hideMobileSearch) {
      hideMobileSearch.onclick = (e) => {
        e.stopPropagation();
        searchEl.classList.toggle("hidden");
        searchEl.classList.toggle("flex");
        searchEl.classList.toggle("showSearch");
        searchBtn.classList.toggle("bg-neutral-600");
        hideMobileSearch.classList.replace(
          "fa-arrow-left",
          "fa-magnifying-glass"
        );
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
        const widthItemChild = xScroll.querySelector("li a");
        let distance = widthItemChild.offsetWidth * 2 + 40;
        nextBtn.classList.remove("pointer-events-none", "text-white/30");
        nextBtn.classList.add(
          "cursor-pointer",
          "text-white",
          "hover:bg-white/20"
        );
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          xScroll.scrollLeft += distance;

          previousBtn.classList.remove("pointer-events-none", "text-white/30");
          previousBtn.classList.add(
            "cursor-pointer",
            "text-white",
            "hover:bg-white/20"
          );

          if (
            xScroll.scrollLeft + distance + xScroll.offsetWidth >=
            xScrollScrollWidth
          ) {
            nextBtn.classList.add("pointer-events-none", "text-white/30");
            nextBtn.classList.remove(
              "cursor-pointer",
              "text-white",
              "hover:bg-white/20"
            );
          }
        });
        previousBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          xScroll.scrollLeft -= distance;

          if (xScroll.scrollLeft <= distance) {
            previousBtn.classList.add("pointer-events-none", "text-white/30");
            previousBtn.classList.remove(
              "cursor-pointer",
              "text-white",
              "hover:bg-white/20"
            );
          } else {
            nextBtn.classList.remove("pointer-events-none", "text-white/30");
            nextBtn.classList.add(
              "cursor-pointer",
              "text-white",
              "hover:bg-white/20"
            );
          }
        });
      }
    });
  },
  //content : End
  /*===================================================*/
  //footer : Begin
  showFooter(song = true) {
    let footerEl;
    if (song) {
      footerEl = document.querySelector(".js-footer");
    } else {
      footerEl = document.querySelector(".js-footer-video");
    }
    footerEl.classList.remove("hidden");
  },

  hideFooter(song = true) {
    let footerEl;
    if (song) {
      footerEl = document.querySelector(".js-footer");
    } else {
      footerEl = document.querySelector(".js-footer-video");
    }
    footerEl.classList.add("hidden");
  },
  //footer : End
};
