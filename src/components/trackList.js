import { format } from "../tools/format";

function trackList(tracks, notSong = true) {
  return tracks
    .map((track, index) => {
      const link = notSong
        ? `href="/${track.type}s/details/${track.id}"`
        : `data-track-id=${track.id}`;
      const duration = format.timeTrack(track.duration);
      return `<li class="list-none">
                  <a
                    ${link} data-navigo
                    class="flex items-center gap-3 sm:gap-5 lg:gap-3 xl:gap-4 px-2 xl:px-3 py-2 rounded-md cursor-pointer hover:bg-white/20"
                  >
                    <p class="w-6 text-base lg:text-[14px] text-center text-white">${
                      index + 1
                    }</p>
                    <div class="relative flex items-center justify-center">
                      <img
                        src=${track.thumbnails}
                        class="block w-12 h-12 object-cover rounded-md"
                      />
                      <i
                        class="absolute fa-solid fa-play text-white invisible"
                      ></i>
                    </div>
                    <div class="mr-auto">
                      <h3 class="text-white text-base sm:text-lg lg:text-sm xl:text-base font-semibold truncate">
                        ${track.title}
                      </h3>
                      <p class="text-base lg:text-[14px] text-white/60">${
                        track.artists ?? "Không rõ nghệ sĩ"
                      }</p>
                    </div>
                    <div class=" text-white/50">
                      <span class="text-base lg:text-[14px] font-medium">${duration}</span>
                    </div>
                  </a>
                </li>`;
    })
    .join("");
}

export default trackList;
