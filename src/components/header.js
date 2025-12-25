export default function header() {
  return `<header class="header">
        <nav class="flex items-center gap-0.5 px-4 py-3.5 bg-[#030303]/90">
          <div class="flex items-center lg:ml-2 gap-1 lg:gap-3">
            <div
              class="side-bar-toggle p-3 text-xl text-white/90 hover:bg-white/30 hover:rounded-full cursor-pointer select-none"
            >
              <button class="fa-solid fa-bars cursor-pointer"></button>
            </div>
            <div class="logo">
              <a
                href="/" data-navigo
                class="flex items-center w-max mr-4 xl:mr-10 gap-1.5 px-0 lg:px-3 py-1.5 cursor-pointer select-none"
              >
                <img
                  src="/images/logo.png"
                  alt="YouTube Music Logo"
                  class="block w-10 h-10 object-cover"
                />
                <h1 class="text-xl text-white">Music</h1>
              </a>
            </div>
          </div>
          <div class="flex justify-between items-center gap-5 w-full">
            <div
              class="js-search relative hidden md:flex items-center justify-center w-full md:w-75 lg:w-118 px-4 py-1 bg-[#292929]/80 rounded-md gap-4 md:gap-0"
            >
              <button
                class=" text-white/70 select-none"
              >
              <i class="sm:js-hide-search fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                type="text"
                placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ"
                spellcheck="false"
                class="js-search-input rounded-md px-3 md:py-1 py-2 outline-none w-full md:max-w-full  text-white"
              />
              <button class="js-clear-search text-white hover:text-red-500 cursor-pointer select-none hidden">
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class= "js-search-space absolute top-15 md:top-13 left-0 z-300 rounded-lg w-full md:w-118 bg-[#121212] invisible opacity-0 transition-all duration-300">
                <div class="js-suggestions p-2 border-b border-white/30">
                  <h4 class="text-white/60">Gợi ý</h4>
                  <ul class="js-suggest-list p-1">
                   
                  </ul>
                </div>
                <div class="js-results p-2">
                  <h4 class="text-white/60">Kết quả</h4>
                  <ul class="js-result-list p-1">
                  </ul>
                </div>
              </div>
            </div>

            <div class="ml-auto text-white/90 text-xl">
              <button class=" js-search-mobile md:hidden p-3 hover:bg-white/20 hover:rounded-full cursor-pointer select-none"
              >
              <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              <button
                class="hidden sm:inline p-3 hover:bg-white/20 hover:rounded-full cursor-pointer select-none"
              >
                <i class="fa-brands fa-chromecast"></i>
              </button>
              
            </div>
            
            <div class="user-profile">
            </div>
            
          </div>
        </nav>
      </header>`;
}
