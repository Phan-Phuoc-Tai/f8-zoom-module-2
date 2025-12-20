import playlistExpand from "./playlistExpand";
import trackList from "./trackList";
function templateExpand(infos, tracks, isPlaylist = true) {
  return `
  <div class="grid grid-cols-2 grid-rows-1">
      <div class="grid-cols-1">
        ${isPlaylist ? playlistExpand(infos) : ""}
      </div>

      <div class="grid-cols-1">
        <ul class="js-tracks js-yScroll flex flex-col gap-2 overscroll-y-contain">
        ${isPlaylist ? trackList(tracks, false) : trackList(tracks)}
        </ul>
      </div>
  </div>
  `;
}

export default templateExpand;
