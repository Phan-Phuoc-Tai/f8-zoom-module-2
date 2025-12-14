import Navigo from "navigo";
import HomePage from "../src/pages/homePage";

const router = new Navigo("/");

const initRouter = async () => {
  const pageContent = document.querySelector(".js-body");
  router
    .on("/", async () => {
      pageContent.innerHTML = await HomePage();
    })
    .on("/explore", () => {
      pageContent.innerHTML = Home(); //rename
    })
    .on("/library", () => {
      pageContent.innerHTML = Home(); //rename
    })
    .on("/login", () => {
      pageContent.innerHTML = Home(); //rename
    })
    .resolve();
};

export default initRouter;
