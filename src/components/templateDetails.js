import details from "../components/details";
import songDetails from "./songDetails";
import trackList from "./trackList";
function templateDetails(infos, tracks, isSong = false) {
  return `
  <div class="grid grid-cols-2 grid-rows-1">
      <div class="grid-cols-1">
        ${isSong ? songDetails(infos) : details(infos)}
      </div>

      <div class="grid-cols-1">
        <ul class="js-tracks js-yScroll flex flex-col gap-2 overscroll-y-auto">
        ${isSong ? trackList(tracks, false) : trackList(tracks)}
        </ul>
      </div>
  </div>
  `;
}
export default templateDetails;
