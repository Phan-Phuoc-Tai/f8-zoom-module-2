import videoDetails from "./videoDetails";
import videos from "./videos";
function templateVideoDetails(infos, videoList) {
  return `
  <div class="grid grid-cols-[6fr_4fr] grid-rows-1 gap-4">
      <div class="grid-cols-1 auto-cols-[70%]">
      ${videoDetails(infos)}
      </div>

      <div class="grid-cols-1 auto-cols-[30%]">
        <ul class="js-videos js-yScroll flex flex-col gap-2 overscroll-y-auto">
        ${videos(videoList, false)}
        </ul>
      </div>
  </div>
  `;
}
export default templateVideoDetails;
