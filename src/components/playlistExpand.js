function playlistExpand(songInfos) {
  return `<div class="js-track-info sticky top-32 flex flex-col items-center gap-5">
                <div class="w-100 h-100 rounded-xl overflow-hidden ">
                  <img
                    src=${songInfos.thumbnails}
                    class="w-100 h-100 object-cover shadow-[0_0_25px_#0d948880]"
                  />
                </div>
                <div class="flex flex-col items-center justify-center">
                  <h2 class="text-xl font-semibold text-teal-400">
                  ${songInfos.title}
                </h2>
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base italic text-white/80"
                  >
                    Không rõ nghệ sĩ</p>
                </div>

                <div>

                </div>
              </div>`;
}

export default playlistExpand;
