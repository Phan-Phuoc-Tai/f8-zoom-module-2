import { format } from "../tools/format";

export default function details(playListInfos) {
  const duration = format.timeDetails(playListInfos.duration);
  const songCount = `${playListInfos.songCount} bài hát`;
  return `<div class="sticky top-32 flex flex-col items-center gap-5">
                <div class="w-100 h-100 rounded-xl overflow-hidden">
                  <img
                    src=${playListInfos.thumbnails}
                    class="w-100 h-100 object-cover"
                  />
                </div>

                <h2 class="font-bold text-center text-[28px] text-white">
                  ${playListInfos.title}
                </h2>
                <p class="font-normal text-center text-lg text-white/70">
                  ${playListInfos.description}
                </p>
                <div class="flex flex-col items-center justify-center gap-2">
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base text-white/80"
                  >
                    <span>${songCount}</span>
                    <span class="mx-1">•</span>
                    <span>${duration}</span>
                  </p>
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base text-white/80"
                  >
                    <span>Các nghệ sĩ: </span>
                    <span>${playListInfos.artists}</span>
                  </p>
                </div>
              </div>`;
}
