export const notice = {
  showNotice(msg, type) {
    const toastEl = document.querySelector(".toast");
    const toastMessageEl = document.createElement("div");

    toastMessageEl.classList.add("toast-message");
    toastEl.classList.add("show");

    toastMessageEl.innerText = msg;
    toastMessageEl.classList.add(type);
    toastEl.prepend(toastMessageEl);
  },

  showSuccess(msg, type = "success") {
    this.showNotice(msg, type);
  },

  showError(msg, type = "error") {
    this.showNotice(msg, type);
  },
  hideNotice(timeout = 1300) {
    const toastEl = document.querySelector(".toast");
    const toastMessageEls = toastEl.querySelectorAll(".toast-message");

    toastMessageEls.forEach((toastMessageEl) => {
      setTimeout(() => {
        toastEl.classList.remove("show");
        toastMessageEl.remove();
      }, `${timeout + 200}`);
    });
  },
};
