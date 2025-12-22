import videoDetails from "./videoDetails";
import videos from "./videos";
function templateVideoDetails(infos, videoList) {
  return `
  <div class="grid lg:grid-cols-[5fr_5fr] xl:grid-cols-[6fr_4fr] grid-rows-1 gap-4">
      <div class="grid-cols-1 lg:auto-cols-[50%] xl:auto-cols-[70%]">
      ${videoDetails(infos)}
      </div>

      <div class="grid-cols-1 lg:auto-cols-[50%] xl:auto-cols-[30%]">
        <ul class="js-videos js-yScroll flex flex-col gap-2 overscroll-y-auto">
        ${videos(videoList, false)}
        </ul>
      </div>
  </div>
  `;
}
export default templateVideoDetails;
