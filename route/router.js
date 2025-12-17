import Navigo from "navigo";
import homePage from "../src/pages/homePage";
import loginPage from "../src/pages/loginPage";
import { eventApp } from "../src/tools/application";
import httpRequest from "../src/tools/httpRequest";
import playListsDetailsPage from "../src/pages/playListDetailsPage";

export const router = new Navigo("/");

async function getData(url) {
  const response = await httpRequest.get(url);
  return response.data;
}

async function getProfile() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const userData = await getData("/auth/me");
    return userData.name;
  }
  return null;
}
const initRouter = async () => {
  const pageContent = document.querySelector(".js-body");

  router.updatePageLinks();
  router
    .on("/", async () => {
      eventApp.showLoading();
      let user = await getProfile();
      const sectionHome = {
        moods: "/moods",
        quickPicks: "/quick-picks",
        albumForYous: "/home/albums-for-you",
        todaysHits: "/home/todays-hits",
        VNMusic: "/playlists/by-country?country=VN",
        personalized: "/home/personalized",
      };

      const [moods, quickPicks, albumForYous, todaysHits, VNMusic] =
        await Promise.all([
          getData(sectionHome.moods),
          getData(sectionHome.quickPicks),
          getData(sectionHome.albumForYous),
          getData(sectionHome.todaysHits),
          getData(sectionHome.VNMusic),
        ]);

      const personalized = user ? await getData(sectionHome.personalized) : "";
      pageContent.innerHTML = await homePage(
        moods.items,
        quickPicks,
        albumForYous,
        todaysHits,
        VNMusic,
        personalized,
        user
      );
      eventApp.init(user);
      router.updatePageLinks();
    })
    .on("/login", async () => {
      pageContent.innerHTML = await loginPage();
      eventApp.init();
    })

    .on("/playlists/details/:slug", async () => {
      pageContent.innerHTML = await playListsDetailsPage();
    })
    .resolve();
};

export default initRouter;
