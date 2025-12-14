const Videos = () => {
  return `
  <section class="videos mt-20">
            <h2 class="mb-4 text-white font-bold text-[45px]">
              Video nhạc mới
            </h2>
            <div class="relative">
              <div class="absolute right-0 -top-15 flex items-center gap-4">
                <button
                  class="flex items-center justify-center bg-white/5 w-10 h-10 rounded-full text-white/30 pointer-events-none"
                >
                  <i class="fa-solid fa-angle-left"></i>
                </button>
                <button
                  class="flex items-center justify-center bg-white/5 w-10 h-10 rounded-full text-white/30 pointer-events-none"
                >
                  <i class="fa-solid fa-angle-right"></i>
                </button>
              </div>

              <ul class="flex gap-3 pb-14 overflow-x-auto scroll-smooth">
                <li>
                  <a href="#!" class="flex flex-col gap-4 px-3 py-2 rounded-md">
                    <div
                      class="relative flex items-center justify-center w-100 h-55"
                    >
                      <img
                        src="https://picsum.photos/seed/video-nhc-c-in-video-40-39/320/180"
                        class="block w-full object-cover rounded-md"
                      />
                      <i
                        class="absolute fa-solid fa-play text-3xl text-white invisible"
                      ></i>
                    </div>
                    <div>
                      <h3 class="text-white font-semibold">
                        Nhạc Cổ Điển Video 40
                      </h3>
                      <p class="text-[14px] text-white/60">277 N lượt xem</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#!" class="flex flex-col gap-4 px-3 py-2 rounded-md">
                    <div
                      class="relative flex items-center justify-center w-100 h-55"
                    >
                      <img
                        src="https://picsum.photos/seed/video-nhc-c-in-video-40-39/320/180"
                        class="block w-full object-cover rounded-md"
                      />
                      <i
                        class="absolute fa-solid fa-play text-3xl text-white invisible"
                      ></i>
                    </div>
                    <div>
                      <h3 class="text-white font-semibold">
                        Nhạc Cổ Điển Video 40
                      </h3>
                      <p class="text-[14px] text-white/60">277 N lượt xem</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#!" class="flex flex-col gap-4 px-3 py-2 rounded-md">
                    <div
                      class="relative flex items-center justify-center w-100 h-55"
                    >
                      <img
                        src="https://picsum.photos/seed/video-nhc-c-in-video-40-39/320/180"
                        class="block w-full object-cover rounded-md"
                      />
                      <i
                        class="absolute fa-solid fa-play text-3xl text-white invisible"
                      ></i>
                    </div>
                    <div>
                      <h3 class="text-white font-semibold">
                        Nhạc Cổ Điển Video 40
                      </h3>
                      <p class="text-[14px] text-white/60">277 N lượt xem</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </section>
  `;
};
