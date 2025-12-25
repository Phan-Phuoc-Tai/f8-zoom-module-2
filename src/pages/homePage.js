import cardList from "../components/cardList";
import quickPick from "../components/quickPick";
import tagList from "../components/tagList";
import { eventApp } from "../tools/application";

async function homePage(
  moods,
  quickPicks,
  albumForYous,
  todaysHits,
  VNMusic,
  personalized,
  user
) {
  return `<div class="content-container">
    <div class="p-2">
      ${
        user
          ? `<h2 class="mb-20 text-4xl lg:text-5xl font-semibold text-white">👋 Chào mừng <span>${user}</span></h2>`
          : ""
      }
      ${tagList("", moods)}
      ${user ? quickPick("Nghe gần đây", personalized, true) : ""}
      ${quickPick("Quick Picks", quickPicks)}
      ${cardList("Album gợi ý cho bạn", albumForYous)}
      ${cardList("Today's Hits", todaysHits)}
      ${cardList("Nhạc Việt", VNMusic)}
      ${eventApp.removeLoading(500)}

    </div>
  </div>
  `;
}

export default homePage;
