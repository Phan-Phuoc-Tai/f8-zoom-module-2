import Navigo from "navigo";
import homePage from "../src/pages/homePage";
import explorePage from "../src/pages/explorePage";
import loginPage from "../src/pages/login";
import playlistPage from "../src/pages/playlistPage";

const router = new Navigo("/");

const initRouter = async () => {
  const pageContent = document.querySelector(".js-body");
  router
    .on("/", async () => {
      pageContent.innerHTML = homePage();
    })
    .on("/explore", () => {
      pageContent.innerHTML = explorePage();
    })
    .on("/library", () => {
      pageContent.innerHTML = loginPage(); //rename NOTICE
    })
    .on("/login", () => {
      pageContent.innerHTML = loginPage();
    })
    .on("/playlist/details/", () => {
      pageContent.innerHTML = playlistPage();
    })
    .resolve();
};

export default initRouter;
