export const footer = () => {
  return `
  <footer>
        <section class="js-footer fixed left-0 right-0 bg-neutral-800 bottom-0 z-200 hidden">
          <div class="player-wrapper">
            <div
              class="progress-bar relative top-0 left-0 right-0 h-2.5 rounded-lg bg-white cursor-pointer hover:opacity-85"
            >
              <div
                class="progress absolute top-0 left-0 h-2.5 rounded-lg bg-red-600 "
              >
                <span
                  class="absolute -top-0.5 right-0 block w-3.5 h-3.5 rounded-full bg-red-600 translate-x-[50%]"
                ></span>
              </div>
            </div>
            <div
              class="js-player player flex items-center justify-between gap-1 px-2 md:px-4 py-2 bg-neutral-800"
            >
              <div class="left-player flex items-center gap-1 lg:gap-3">
                <div class="player-control flex items-center gap-0.5 lg:gap-3 text-white">
                  <button
                    class="previous-btn p-1 sm:p-2 lg:p-3 text-lg hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-backward-step"></i>
                  </button>
                  <button
                    class="play-btn p-1 sm:p-2 lg:p-3 text-3xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-play"></i>
                  </button>
                  <button
                    class="next-btn p-1 sm:p-2 lg:p-3 text-lg hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-forward-step"></i>
                  </button>
                </div>
                <div class="player-timer hidden sm:block text-sm lg:text-base text-white/80">
                  <span>00:00</span>
                  <span>/</span>
                  <span>00:00</span>
                </div>
              </div>
              <div class="middle-player w-60 flex items-center gap-2 lg:gap-6">
                <div class="w-10 h-10">
                  <img
                    src="https://picsum.photos/seed/album-nhc-in-t-album-7-6/400/400"
                    alt=""
                    class="w-full object-cover rounded-sm"
                  />
                </div>

                <div class="max-w-40 md:max-w-max">
                  <h3 class="text-base text-white font-semibold truncate">
                    Nhạc Điện Tử Album 7 - Bài 1
                  </h3>
                  <p class="text-xs text-white/80">Không rõ nghệ sĩ</p>
                </div>

                <div class="hidden sm:flex items-center lg:gap-2">
                  <button
                    class="p-1 lg:p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-regular fa-thumbs-down"></i>
                  </button>
                  <button
                    class="p-1 lg:p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                </div>
                <div class="hidden sm:block">
                  <button
                    class="p-1 lg:p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </div>
              
              <div class="right-player flex items-center">
                <div class="hidden md:flex items-center gap-1 lg:gap-6">
                  <div class="group volume-group relative flex items-center ">
                    <div class=" absolute right-10 flex items-center px-2 py-1 rounded-lg shadow-lg bg-neutral-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200">
                      <input type="range" min="0" max="100" value="10" class="volume-control w-32 accent-white cursor-pointer">
                    </div>
                    <button
                      class="p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer "
                    >
                      <i class="volume-btn fa-solid fa-volume-low"></i>
                    </button>
                  </div>
                  <button
                    class="repeat-btn p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-repeat"></i>
                  </button>
                  <button
                    class="shuffle-btn p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-shuffle"></i>
                  </button>
                </div>
                <button
                  class="show-act-btn inline md:hidden p-1 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                >
                  <i class="fa-solid fa-caret-left"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="js-footer-video fixed left-0 right-0 bg-neutral-800 bottom-0 z-200 hidden">
          <div class="player-wrapper">
            <div
              class="progress-bar relative top-0 left-0 right-0 h-2.5 rounded-lg bg-white cursor-pointer hover:opacity-85"
            >
              <div
                class="progress absolute top-0 left-0 h-2.5 rounded-lg bg-red-600 "
              >
                <span
                  class="absolute -top-0.5 right-0 block w-3.5 h-3.5 rounded-full bg-red-600 translate-x-[50%]"
                ></span>
              </div>
            </div>
            <div
              class="js-player player flex items-center justify-between gap-1 px-2 md:px-4 py-2 bg-neutral-800"
            >
              <div class="left-player flex items-center gap-1 lg:gap-3">
                <div class="player-control flex items-center gap-0.5 lg:gap-3 text-white">
                  <button
                    class="previous-btn p-1 sm:p-2 lg:p-3 text-lg hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-backward-step"></i>
                  </button>
                  <button
                    class="play-btn p-1 sm:p-2 lg:p-3 text-3xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-play"></i>
                  </button>
                  <button
                    class="next-btn p-1 sm:p-2 lg:p-3 text-lg hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-forward-step"></i>
                  </button>
                </div>
                <div class="player-timer hidden sm:block text-sm lg:text-base text-white/80">
                  <span>00:00</span>
                  <span>/</span>
                  <span>00:00</span>
                </div>
              </div>
              <div class="middle-player w-60 sm:w-auto flex items-center gap-2 lg:gap-6">
                <div class="w-10 h-10">
                  <img
                    src="https://picsum.photos/seed/album-nhc-in-t-album-7-6/400/400"
                    alt=""
                    class="h-full object-cover rounded-sm"
                  />
                </div>

                <div class="max-w-40 md:max-w-max">
                  <h3 class="text-base text-white font-semibold truncate">
                    Nhạc Điện Tử Album 7 - Bài 1
                  </h3>
                  <p class="text-xs text-white/80">Không rõ nghệ sĩ</p>
                </div>

                <div class="hidden sm:flex items-center lg:gap-2">
                  <button
                    class="p-1 lg:p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-regular fa-thumbs-down"></i>
                  </button>
                  <button
                    class="p-1 lg:p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                </div>
                <div class="hidden sm:block">
                  <button
                    class="p-1 lg:p-2 text-white text-xl hover:bg-gray-600 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
              </div>
              
              <div class="right-player flex items-center">
                <div class="hidden md:flex items-center gap-1 lg:gap-6">
                  <div class="group volume-group relative flex items-center ">
                    <div class=" absolute right-10 flex items-center px-2 py-1 rounded-lg shadow-lg bg-neutral-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200">
                      <input type="range" min="0" max="100" value="10" class="volume-control w-32 accent-white cursor-pointer">
                    </div>
                    <button
                      class="p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer "
                    >
                      <i class="volume-btn fa-solid fa-volume-low"></i>
                    </button>
                  </div>
                  <button
                    class="repeat-btn p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-repeat"></i>
                  </button>
                  <button
                    class="shuffle-btn p-2 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                  >
                    <i class="fa-solid fa-shuffle"></i>
                  </button>
                </div>
                <button
                  class="show-act-btn inline md:hidden p-1 text-white text-xl hover:bg-white/20 hover:rounded-full cursor-pointer"
                >
                  <i class="fa-solid fa-caret-left"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
        
      </footer>
  `;
};
