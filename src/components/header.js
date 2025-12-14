export const Header = async () => {
  return `
  <header class="header">
        <nav class="flex items-center gap-10 px-4 py-3.5 bg-[#030303]/90">
          <div class="flex items-center ml-2 gap-3">
            <div
              class="side-bar-toggle p-3 text-xl text-white/90 hover:bg-white/30 hover:rounded-full cursor-pointer select-none"
            >
              <button class="fa-solid fa-bars cursor-pointer"></button>
            </div>
            <div class="logo">
              <a
                href="#!"
                class="flex items-center w-max lg:mr-10 gap-1.5 px-3 py-1.5 cursor-pointer select-none"
              >
                <img
                  src="./public/images/logo.png"
                  alt="YouTube Music Logo"
                  class="block w-10 h-10 object-cover"
                />
                <h1 class="text-xl text-white">Music</h1>
              </a>
            </div>
          </div>
          <div class="flex justify-between items-center gap-5 w-full">
            <div
              class="flex items-center justify-center mr-auto lg:w-118 px-4 py-1 bg-[#292929]/80"
            >
              <button
                class="fa-solid fa-magnifying-glass text-white/70 cursor-pointer select-none"
              ></button>
              <input
                type="text"
                placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ"
                class="px-3 py-2 outline-none w-full text-white"
              />
              <button class="text-white cursor-pointer select-none hidden">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="text-white/90 text-xl">
              <button
                class="p-3 hover:bg-white/20 hover:rounded-full cursor-pointer select-none"
              >
                <i class="fa-brands fa-chromecast"></i>
              </button>
              <button
                class="p-3 hover:bg-white/20 hover:rounded-full cursor-pointer select-none"
              >
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>
            <div
              class="px-4 py-2 lg:mr-10 rounded-full bg-white/90 font-semibold hover:bg-white/80 hover:rounded-full cursor-pointer select-none"
            >
              <a href="#!">Đăng nhập</a>
            </div>
          </div>
        </nav>
      </header>
  `;
};
