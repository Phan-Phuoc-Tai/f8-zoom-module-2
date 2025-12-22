import { format } from "../tools/format";

function videoDetails(videosInfo) {
  const duration = format.timeDetails(videosInfo.duration);
  const views = format.views(videosInfo.popularity);

  return `<div class="js-video-info sticky top-32 flex flex-col items-center gap-5">
                <div id="videoPlayer" class="w-full lg:w-100 xl:w-full h-68 sm:h-100 xl:h-130">
                  
                </div>

                <h2 class="font-bold text-center text-[28px] text-white">
                  ${videosInfo.title}
                </h2>
                
                <div class="flex flex-col items-center justify-center gap-2">
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base text-white/80"
                  >
                    <span>Thời lượng: </span>
                    <span>${duration}</span>
                    
                  </p>
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base text-white/80"
                  >
                    <span>${views}</span>
                    <span> lượt xem</span>
                  </p>
                </div>
              </div>`;
}

export default videoDetails;
