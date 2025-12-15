function hideSideBarModal() {
  const sideBarEl = document.querySelector(".side-bar .side-bar-modal");
  const modalInnerEl = sideBarEl.querySelector(".modal-inner");
  const overlayEl = sideBarEl.querySelector(".overlay");
  const sideBarToggleEl = sideBarEl.querySelector(".side-bar-toggle");

  sideBarToggleEl.addEventListener("click", hideModal);
  overlayEl.addEventListener("click", hideModal);

  function hideModal(e) {
    e.stopPropagation();
    modalInnerEl.classList.replace("translate-x-0", "-translate-x-full");
    setTimeout(() => {
      sideBarEl.classList.replace("opacity-100", "opacity-0");
      sideBarEl.classList.replace("visible", "invisible");
    }, 300);
  }
}
export default hideSideBarModal;
