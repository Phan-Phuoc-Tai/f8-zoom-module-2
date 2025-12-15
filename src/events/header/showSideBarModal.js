function showSideBarModal() {
  const sideBarToggleEl = document.querySelector(".side-bar-toggle");
  const sideBarEl = document.querySelector(".side-bar .side-bar-modal");
  const sideBarModalEl = sideBarEl.querySelector(".modal-inner");
  sideBarToggleEl.addEventListener("click", (e) => {
    e.stopPropagation();
    sideBarEl.classList.replace("opacity-0", "opacity-100");
    sideBarEl.classList.replace("invisible", "visible");
    sideBarModalEl.classList.replace("-translate-x-full", "translate-x-0");
  });
}
export default showSideBarModal;
