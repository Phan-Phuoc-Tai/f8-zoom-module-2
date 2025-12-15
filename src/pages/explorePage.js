import renderAlbumNews from "../renders/explorePage/renderAlbumNew";
import renderMoodAndGenres from "../renders/explorePage/renderMoodAndGenres";
import renderPropose from "../renders/explorePage/renderPropose";
import renderVideoNews from "../renders/explorePage/renderVideos";

function explorePage() {
  return `<div class="content-container">
    <div class="p-2">
    ${renderPropose()}
    ${renderAlbumNews()}
    ${renderMoodAndGenres()}
    ${renderVideoNews()}
    </div>
  </div>
  `;
}

export default explorePage;
