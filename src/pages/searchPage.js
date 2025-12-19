import cardList from "../components/cardList";
import quickPick from "../components/quickPick";
import videoList from "../components/videoList";

async function searchPage(keyword, song, playlist, videos, albums) {
  return `<div class="content-container">
      <div class="p-2">
        <h2 class="mb-20 text-5xl font-semibold text-white">Kết quả cho "<span>${keyword}</span>"</h2>
        ${song ? quickPick("Bài hát", song) : ""}
        ${playlist ? cardList("Playlists", playlist) : ""}
        ${albums ? cardList("Playlists", albums) : ""}
        ${videos ? videoList("Video", videos) : ""}
      
      </div>
    </div>
    `;
}
export default searchPage;
