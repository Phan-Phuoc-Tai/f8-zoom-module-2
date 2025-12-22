import { format } from "../tools/format";

function songDetails(songInfos) {
  const duration = format.timeTrack(songInfos.duration);
  return `<div class="js-track-info sticky top-32 flex flex-col items-center gap-2 sm:gap-5">
                <div class="w-95 sm:w-90 xl:w-100 h-90 xl:h-100  rounded-xl overflow-hidden">
                  <img
                    src=${songInfos.thumbnails}
                    class="w-full h-90 xl:h-100 object-cover"
                  />
                </div>

                <h2 class="font-bold text-center text-2xl xl:text-[28px] text-white">
                  ${songInfos.title}
                </h2>
                
                <div class="flex flex-col items-center justify-center gap-2">
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base text-white/80"
                  >
                    <span>Thời lượng: </span>
                    <span>${duration}</span>
                  </p>
                </div>
              </div>`;
}

export default songDetails;
