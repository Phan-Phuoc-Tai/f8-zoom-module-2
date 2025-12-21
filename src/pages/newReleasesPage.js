import cardList from "../components/cardList";
import videoList from "../components/videoList";
import { eventApp } from "../tools/application";

async function newReleasesPage(releases, videos) {
  return `<div class="content-container">
    <div class="p-2">
      ${cardList("Bản phát hành mới", releases)}
      ${videoList("Video nhạc nhất", videos)}
      ${eventApp.removeLoading()}

    </div>
  </div>
  `;
}

export default newReleasesPage;
