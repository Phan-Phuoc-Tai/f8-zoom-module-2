export const QuickPicks = () => {
  return `
  <section class="quickPicks mt-20">
      <h2 class="mb-4 text-white font-bold text-[45px]">Quick Picks</h2>
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

        <ul class="flex flex-col max-w-[33.33%] gap-3 pb-14">
          <li>
            <a
              href="#!"
              class="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white/20"
            >
              <div class="relative flex items-center justify-center">
                <img
                  src="https://picsum.photos/seed/party-hits/640/360"
                  alt=""
                  class="block w-12 h-12 object-cover rounded-md"
                />
                <i class="absolute fa-solid fa-play text-white invisible"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold">Party Hits</h3>
                <div class="flex items-center gap-2 text-[14px]">
                  <span class="text-white/60">Various Artists</span>
                  <span class="text-white/60">•</span>
                  <span class="text-white/60">200 lượt nghe</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a
              href="#!"
              class="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white/20"
            >
              <div class="relative flex items-center justify-center">
                <img
                  src="https://picsum.photos/seed/party-hits/640/360"
                  alt=""
                  class="block w-12 h-12 object-cover rounded-md"
                />
                <i class="absolute fa-solid fa-play text-white invisible"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold">Party Hits</h3>
                <div class="flex items-center gap-2 text-[14px]">
                  <span class="text-white/60">Various Artists</span>
                  <span class="text-white/60">•</span>
                  <span class="text-white/60">200 lượt nghe</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a
              href="#!"
              class="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white/20"
            >
              <div class="relative flex items-center justify-center">
                <img
                  src="https://picsum.photos/seed/party-hits/640/360"
                  alt=""
                  class="block w-12 h-12 object-cover rounded-md"
                />
                <i class="absolute fa-solid fa-play text-white invisible"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold">Party Hits</h3>
                <div class="flex items-center gap-2 text-[14px]">
                  <span class="text-white/60">Various Artists</span>
                  <span class="text-white/60">•</span>
                  <span class="text-white/60">200 lượt nghe</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a
              href="#!"
              class="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white/20"
            >
              <div class="relative flex items-center justify-center">
                <img
                  src="https://picsum.photos/seed/party-hits/640/360"
                  alt=""
                  class="block w-12 h-12 object-cover rounded-md"
                />
                <i class="absolute fa-solid fa-play text-white invisible"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold">Party Hits</h3>
                <div class="flex items-center gap-2 text-[14px]">
                  <span class="text-white/60">Various Artists</span>
                  <span class="text-white/60">•</span>
                  <span class="text-white/60">200 lượt nghe</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  `;
};
