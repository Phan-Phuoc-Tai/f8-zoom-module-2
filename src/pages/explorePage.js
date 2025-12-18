import cardList from "../components/cardList";
import listCategories from "../components/categories";
import propose from "../components/propose";
import videoList from "../components/videolist";
import { eventApp } from "../tools/application";

async function explorePage(albums, videos, moodsAndGenres) {
  return `<div class="content-container">
    <div class="p-2">
      ${propose()}
      ${cardList("Khám phá Albums mới", albums)}
      ${listCategories("Tâm trạng và thể loại", moodsAndGenres)}
      ${videoList("Video mới nhất", videos)}
      ${eventApp.removeLoading()}

    </div>
  </div>
  `;
}

export default explorePage;
