import renderAlbums from "../renders/homePage/renderAlbums";
import renderMoods from "../renders/homePage/renderMoods";
import renderQuickPicks from "../renders/homePage/renderQuickPicks";
import renderTodaysHits from "../renders/homePage/renderTodaysHits";
import renderVNMusics from "../renders/homePage/renderVNMusic";

function homePage() {
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

export default homePage;
