import renderAlbums from "../renders/renderAlbums";
import renderMoods from "../renders/renderMoods";
import renderQuickPicks from "../renders/renderQuickPicks";
import renderTodaysHits from "../renders/renderTodaysHits";
import renderVNMusics from "../renders/renderVNMusic";

function HomePage() {
  return `<div class="content-container">
    <div class="p-2">
    ${renderMoods()}
    ${renderQuickPicks()}
    ${renderAlbums()}
    ${renderTodaysHits()}
    ${renderVNMusics()}
    </div>
  </div>
  `;
}

export default HomePage;
