import cardList from "../components/cardList";
import quickPick from "../components/quickPick";
import videoList from "../components/videoList";
import { eventApp } from "../tools/application";
import { format } from "../tools/format";

async function searchPage(keyword, song, playlist, videos, albums) {
  return `<div class="content-container">
      <div class="p-2">
        <h2 class="mb-20 text-2xl font-semibold text-white">Kết quả cho "<span>${format.keyWord(
          keyword
        )}</span>"</h2>
        ${song ? quickPick("Bài hát", song, true) : ""}
        ${playlist ? cardList("Playlists", playlist) : ""}
        ${albums ? cardList("Playlists", albums) : ""}
        ${videos ? videoList("Video", videos) : ""}
      </div>
    </div>
    `;
}
export default searchPage;
