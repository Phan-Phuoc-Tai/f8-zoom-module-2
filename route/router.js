import Navigo from "navigo";
import config from "../src/config.json";
import homePage from "../src/pages/homePage";
import loginPage from "../src/pages/loginPage";
import { eventApp } from "../src/tools/application";
import httpRequest from "../src/tools/httpRequest";
import playListsDetailsPage from "../src/pages/playListDetailsPage";
import explorePage from "../src/pages/explorePage";
import songsDetailsPage from "../src/pages/songsDetailsPage";
import { track } from "../src/tools/track";
import changeProfile from "../src/pages/changProfilePage";
import searchPage from "../src/pages/searchPage";
import albumsDetailsPage from "../src/pages/albumsDetailsPage";

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
  const items = data;
  // items.push(data.categories, data.lines);
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
  const tracksId = tracks.map((track) => track.id);
  const duplicatesIndex = [];
  tracksId.filter((id, index) => {
    if (tracksId.indexOf(id) !== index) {
      duplicatesIndex.push(index);
    }
  });
  const newTracks = tracks.filter((track, index) => {
    return !duplicatesIndex.includes(index);
  });
  return newTracks;
}

function assignType(list) {
  return list.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});
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
      eventApp.hideFooter();
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
      const moodsAndGenres = mutateItems([meta.categories, meta.lines]);
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

      router.updatePageLinks();
    })
    .on("/albums/details/:slug", async () => {
      eventApp.showLoading();
      let user = await getProfile();
      const locationHref = router.link(window.location.href);
      const address = locationHref.slice(
        locationHref.lastIndexOf(`${config.albums}`)
      );
      const albumsInfo = await getData(
        `${address}?limit=${config.albumsLimit}`
      );
      const tracks = albumsInfo.tracks;

      httpRequest.post(`/events/play`, { albumId: albumsInfo.id });
      pageContent.innerHTML = await albumsDetailsPage(albumsInfo, tracks);
      eventApp.init(user);
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
      const tracks =
        songsInfo.album.tracks.length > songsInfo.related.length
          ? [
              ...songsInfo.album.tracks,
              ...songsInfo.playlists[0].tracks,
              ...songsInfo.related,
            ]
          : [...songsInfo.related];

      const newTracks = duplicateTrack(tracks);
      pageContent.innerHTML = await songsDetailsPage(songsInfo, newTracks);
      eventApp.init(user);
      eventApp.showFooter();
      track.autoPlay(newTracks[0]);
      track.init();
      router.updatePageLinks();
    })
    .on("/auth/profile", async () => {
      let user = await getProfile();
      pageContent.innerHTML = await changeProfile();
      eventApp.init(user);
      eventApp.hideFooter();
    })
    .on("/auth/change-password", async () => {
      let user = await getProfile();
      pageContent.innerHTML = await changeProfile(true);
      eventApp.init(user);
      eventApp.hideFooter();
    })
    .on("/search?", async () => {
      let user = await getProfile();
      const locationHref = router.link(window.location.href);
      const key = locationHref.slice(locationHref.lastIndexOf(`=`) + 1);
      const response = await getData(`${config.searchKeyWord}${key}`);
      const listCompleted = duplicateTrack(response.completed);
      const listOfKey = assignType(listCompleted);
      const [song, playlist, videos, albums] = [
        listOfKey.song,
        listOfKey.playlist,
        listOfKey.video,
        listOfKey.album,
      ];

      pageContent.innerHTML = await searchPage(
        key,
        song,
        playlist,
        videos,
        albums
      );
      eventApp.init(user);
    })
    .resolve();
};

export default initRouter;
