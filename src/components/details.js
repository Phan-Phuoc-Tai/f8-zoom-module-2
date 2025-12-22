import moment from "moment";
import { format } from "../tools/format";

export default function details(infos, isPlaylist = true) {
  const duration = format.timeDetails(infos.duration);
  const songCount = `${infos.songCount} bài hát`;
  return `<div class="sticky top-32 flex flex-col items-center gap-2 sm:gap-5">
                <div class="w-95 sm:w-90 xl:w-100 h-90 xl:h-100  rounded-xl overflow-hidden">
                  <img
                    src=${infos.thumbnails}
                    class="w-full h-90 xl:h-100 object-cover"
                  />
                </div>

                <h2 class="font-bold text-center text-[28px] text-white">
                  ${infos.title}
                </h2>
                ${
                  isPlaylist
                    ? `<p class="font-normal text-center text-lg text-white/70">
                  ${infos.description}
                </p>`
                    : ""
                }
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
                    ${
                      isPlaylist
                        ? `<span>Các nghệ sĩ: </span>
                    <span>${infos.artists}</span>`
                        : `<p class="font-normal text-base text-white/80"><span>${format.views(
                            infos.popularity
                          )}</span><span> lượt nghe</span></p>
                          <p class="font-normal text-base text-white/80"><span>Loại album: </span><span>${
                            infos.albumType
                          }</span></p><p class="font-normal text-base text-white/80"><span>Phát hành: </span><span>${moment(
                            `${infos.releaseDate}`
                          ).format("DD/MM/yyyy")}</span></p>`
                    }
                  </p>
                </div>
              </div>`;
}
