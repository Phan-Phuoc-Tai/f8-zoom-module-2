import Navigo from "navigo";
import homePage from "../src/pages/homePage";
import loginPage from "../src/pages/loginPage";
import { eventApp } from "../src/tools/application";

export const router = new Navigo("/");

const initRouter = async () => {
  const pageContent = document.querySelector(".js-body");
  router.updatePageLinks();
  router
    .on("/", async () => {
      pageContent.innerHTML = await homePage();
    })
    .on("/login", async () => {
      pageContent.innerHTML = await loginPage();
      eventApp.init();
    })
    .resolve();
};

export default initRouter;
