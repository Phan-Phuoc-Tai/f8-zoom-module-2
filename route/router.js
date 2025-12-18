import Navigo from "navigo";
import config from "../src/config.json";
import homePage from "../src/pages/homePage";
import loginPage from "../src/pages/loginPage";
import { eventApp } from "../src/tools/application";
import httpRequest from "../src/tools/httpRequest";
import playListsDetailsPage from "../src/pages/playListDetailsPage";
import explorePage from "../src/pages/explorePage";
import { playSong } from "../src/tools/playSong";
import songsDetailsPage from "../src/pages/songsDetailsPage";

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

function mutateItems(data, size = 4) {
  const items = [];
  items.push(data.categories, data.lines);
  return items.flat(Infinity).reduce(
    (acc, item) => {
      if (acc[acc.length - 1].length < size) {
        acc[acc.length - 1].push(item);
      } else {
        acc.push([item]);
      }
      return acc;
    },
    [[]]
  );
}

function duplicateTrack(tracks) {
  const tracksTitle = tracks.map((track) => track.id);
  const indexTitleDuplicate = tracksTitle.findIndex((item, index) => {
    return tracksTitle.indexOf(item) !== index;
  });
  const newTracks = tracks.filter((track, index) => {
    return tracks.indexOf(tracks[indexTitleDuplicate]) !== index;
  });
  return newTracks;
}

const initRouter = async () => {
  const pageContent = document.querySelector(".js-body");

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
    .on("/explore", async () => {
      eventApp.showLoading();
      let user = await getProfile();
      const sectionExplore = {
        albums: "/explore/albums",
        videos: "/explore/videos",
        meta: "/explore/meta",
      };

      const [albums, videos, meta] = await Promise.all([
        getData(sectionExplore.albums),
        getData(sectionExplore.videos),
        getData(sectionExplore.meta),
      ]);
      const moodsAndGenres = mutateItems(meta);
      pageContent.innerHTML = await explorePage(
        albums.items,
        videos.items,
        moodsAndGenres
      );
      eventApp.init(user);
      router.updatePageLinks();
    })

    .on("/playlists/details/:slug", async () => {
      eventApp.showLoading();
      let user = await getProfile();
      const locationHref = router.link(window.location.href);
      const address = locationHref.slice(
        locationHref.lastIndexOf(`${config.playlist}`)
      );
      const playListInfos = await getData(address);
      const tracks = playListInfos.tracks;
      httpRequest.post(`/events/play`, { playlistId: playListInfos.id });
      pageContent.innerHTML = await playListsDetailsPage(playListInfos, tracks);
      eventApp.init(user);
      playSong.init();
      router.updatePageLinks();
    })

    .on("/songs/details/:id", async () => {
      eventApp.showLoading();
      let user = await getProfile();
      const locationHref = router.link(window.location.href);
      const address = locationHref.slice(
        locationHref.lastIndexOf(`${config.songs}`)
      );
      const songsInfo = await getData(address);
      const tracks = [
        ...songsInfo.album.tracks,
        ...songsInfo.playlists[0].tracks,
      ];
      const newTracks = duplicateTrack(tracks);
      pageContent.innerHTML = await songsDetailsPage(songsInfo, newTracks);
      eventApp.init(user);
      eventApp.showFooter();
      playSong.init();
      router.updatePageLinks();
    })
    .resolve();
};

export default initRouter;
