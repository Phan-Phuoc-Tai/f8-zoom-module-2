//File chính

import "./assets/styles.css";
import app from "./app";
import initRouter from "../route/router";
import { sideBar } from "./components/sideBar";
import showSideBarModal from "./events/header/showSideBarModal";
import hideSideBarModal from "./events/header/hideSideBarModal";

const root = document.querySelector("#app");
const render = async function () {
  root.innerHTML = await app();
};

await render();
await initRouter();

const application = {
  init() {
    this.showSideBarModal();
    this.hideSideBarModal();
  },

  showSideBarModal,
  hideSideBarModal,
};
application.init();
