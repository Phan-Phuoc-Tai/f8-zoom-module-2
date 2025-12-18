export const footer = () => {
  return `
  <footer>
        <section class="js-footer fixed left-0 right-0 bottom-0 z-200 hidden">
          <div class="player-wrapper">
            <div
              class="progress-bar relative top-0 left-0 right-0 h-2.5 bg-white cursor-pointer hover:opacity-85"
            >
              <div
                class="progress absolute top-0 left-0 h-2.5 bg-red-600 "
              >
                <span
                  class="absolute -top-0.5 right-0 block w-3.5 h-3.5 rounded-full bg-red-600 translate-x-[50%]"
                ></span>
              </div>
            </div>
            <div
              class="player flex items-center justify-between px-4 py-2 bg-neutral-800"
            >
              <div class="left-player flex items-center gap-3">
                <div class="player-control flex items-center gap-3 text-white">
                  <button
                    class="previous-btn p-3 text-lg hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-backward-step"></i>
                  </button>
                  <button
                    class="play-btn p-3 text-3xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-play"></i>
                  </button>
                  <button
                    class="next-btn p-3 text-lg hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-forward-step"></i>
                  </button>
                </div>
                <div class="player-timer text-white/80">
                  <span>00:00</span>
                  <span>/</span>
                  <span>00:00</span>
                </div>
              </div>
              <div class="middle-player flex items-center gap-6">
                <div class="w-10 h-10">
                  <img
                    src="https://picsum.photos/seed/album-nhc-in-t-album-7-6/400/400"
                    alt=""
                    class="object-cover rounded-sm"
                  />
                </div>

                <div>
                  <h3 class="text-base text-white font-semibold">
                    Nhạc Điện Tử Album 7 - Bài 1
                  </h3>
                  <p class="text-xs text-white/80">Không rõ nghệ sĩ</p>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-regular fa-thumbs-down"></i>
                  </button>
                  <button
                    class="p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                </div>
                <div>
                  <button
                    class="p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </div>
              <div class="right-player flex items-center gap-6">
                <button
                  class="p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                >
                  <i class="fa-solid fa-volume-high"></i>
                </button>
                <button
                  class="p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                >
                  <i class="fa-solid fa-repeat"></i>
                </button>
                <button
                  class="p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                >
                  <i class="fa-solid fa-shuffle"></i>
                </button>
                
              </div>
            </div>
          </div>
        </section>
      </footer>
  `;
};
