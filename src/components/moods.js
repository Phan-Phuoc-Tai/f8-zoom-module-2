export const Moods = () => {
  return `
  <section class="moods mt-20">
            <h2 class="mb-4 text-white font-bold text-5xl"></h2>
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
              <nav>
                <ul class="flex items-center gap-6 pb-14">
                  <li>
                    <a
                      href="#!"
                      class="block py-2 px-3 bg-white/10 rounded-lg text-[14px] text-center text-white hover:bg-white/20 cursor-pointer"
                      >Năng Lượng</a
                    >
                  </li>
                  <li>
                    <a
                      href="#!"
                      class="block py-2 px-3 bg-white/10 rounded-lg text-[14px] text-center text-white hover:bg-white/20 cursor-pointer"
                      >Thư Giãn</a
                    >
                  </li>
                  <li>
                    <a
                      href="#!"
                      class="block py-2 px-3 bg-white/10 rounded-lg text-[14px] text-center text-white hover:bg-white/20 cursor-pointer"
                      >Tập Luyện</a
                    >
                  </li>
                  <li>
                    <a
                      href="#!"
                      class="block py-2 px-3 bg-white/10 rounded-lg text-[14px] text-center text-white hover:bg-white/20 cursor-pointer"
                      >Tập Trung</a
                    >
                  </li>
                  <li>
                    <a
                      href="#!"
                      class="block py-2 px-3 bg-white/10 rounded-lg text-[14px] text-center text-white hover:bg-white/20 cursor-pointer"
                      >Đi Lại</a
                    >
                  </li>
                </ul>
              </nav>
            </div>
          </section>
  `;
};
