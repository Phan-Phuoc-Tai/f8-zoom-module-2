export const details = (html) => {
  return `
  
<div class="sticky top-32 flex flex-col items-center gap-5">
                <div class="w-100 h-100 rounded-xl overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/party-hits/640/360"
                    class="w-100 h-100 object-cover"
                  />
                </div>

                <h2 class="font-bold text-center text-[28px] text-white">
                  Party Hits
                </h2>
                <p class="font-normal text-center text-lg text-white/70">
                  Top party tracks
                </p>
                <div class="flex flex-col items-center justify-center gap-2">
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base text-white/80"
                  >
                    <span>20 bài hát</span>
                    <span class="mx-1">•</span>
                    <span>1 giờ 14 phút</span>
                  </p>
                  <p
                    class="flex items-center justify-center gap-1 font-normal text-base text-white/80"
                  >
                    <span>Các nghệ sĩ: </span>
                    <span>Various Artists</span>
                  </p>
                </div>
              </div>

<ul class="flex flex-col gap-2 overscroll-y-auto">
                <li>
                  <a
                    href="#!"
                    class="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white/20"
                  >
                    <p class="w-6 text-center text-white">1</p>
                    <div class="relative flex items-center justify-center">
                      <img
                        src="https://picsum.photos/seed/party-hits/640/360"
                        alt=""
                        class="block w-12 h-12 object-cover rounded-md"
                      />
                      <i
                        class="absolute fa-solid fa-play text-white invisible"
                      ></i>
                    </div>
                    <div class="mr-auto">
                      <h3 class="text-white text-base font-semibold">
                        Party Hits
                      </h3>
                      <p class="text-[14px] text-white/60">Various Artists</p>
                    </div>
                    <div class="text-white/50">
                      <span>00:00</span>
                    </div>
                  </a>
                </li>
                
              </ul>

  `;
};
