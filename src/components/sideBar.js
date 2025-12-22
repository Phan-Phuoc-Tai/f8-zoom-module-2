export const sideBar = () => {
  return `
  <aside class="side-bar">
        <nav class="side-bar-desktop px-2 text-white">
          <ul class="pt-4 pb-3 border-b border-white/70">
            <li>
              <a
                href="/" data-navigo
                class="flex flex-col items-center gap-1 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl active"
              >
                <i class="fa-regular fa-house text-2xl"></i>
                <span class="text-[11px] font-normal">Trang chủ</span>
              </a>
            </li>
            <li>
              <a
                href="/explore" data-navigo
                class="flex flex-col items-center gap-1 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
              >
                <i class="fa-regular fa-compass text-2xl"></i>
                <span class="text-[11px] font-normal">Khám phá</span>
              </a>
            </li>
            <li>
              <a
                href="#!" data-navigo
                class="flex flex-col items-center gap-1 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
              >
                <i class="fa-regular fa-bookmark text-2xl"></i>
                <span class="text-[11px] font-normal">Thư viện</span>
              </a>
            </li>
            <li class="js-vip-side-bar hidden">
              <a
                href="#!"
                class="flex flex-col items-center gap-1 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
              >
                <i class="fa-solid fa-crown text-2xl"></i>
                <span class="text-[11px] font-normal">Nâng cấp</span>
              </a>
            </li>
          </ul>

          <a
            href="/login" data-navigo
            class="js-login-side-bar flex flex-col items-center gap-1 p-3 mt-3 hover:bg-white/10 hover:rounded-2xl"
          >
            <i class="fa-regular fa-user text-2xl"></i>
            <span class="text-[11px] font-normal">Đăng nhập</span>
          </a>
        </nav>
        <div class="side-bar-modal fixed inset-0 z-990 opacity-0 invisible transition duration-400">
          <div
            class="overlay absolute inset-0 bg-[rgba(0,0,0,0.7)] cursor-pointer"
          ></div>
          <div
            class="modal-inner absolute top-0 bottom-0 left-0 w-55 z-999 bg-black border-r border-neutral-600 duration-400 transition -translate-x-full "
          >
            <div class="modal-heading px-4 py-3">
              <div class="flex items-center gap-3">
                <div
                  class="close-modal p-3 text-xl text-white/90 hover:bg-white/30 hover:rounded-full cursor-pointer select-none"
                >
                  <button class="fa-solid fa-xmark cursor-pointer"></button>
                </div>
                <div class="logo">
                  <a
                    href="/"
                    class="flex items-center w-max gap-1.5 cursor-pointer select-none"
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
            </div>
            <nav class="px-3 text-white">
              <ul class="pt-4 pb-3 border-b border-white/70">
                <li>
                  <a
                    href="/" data-navigo
                    class="flex items-center gap-4 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl active"
                  >
                    <i class="fa-regular fa-house text-xl"></i>
                    <span class="text-base font-medium">Trang chủ</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/explore" data-navigo
                    class="flex items-center gap-4 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
                  >
                    <i class="fa-regular fa-compass text-xl"></i>
                    <span class="text-base font-medium">Khám phá</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    class="flex items-center gap-4 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
                  >
                    <i class="fa-regular fa-bookmark text-xl"></i>
                    <span class="text-base font-medium">Thư viện</span>
                  </a>
                </li>
                <li class="js-vip-modal hidden">
                  <a
                    href="#!"
                    class="flex items-center gap-4 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
                  >
                    <i class="fa-solid fa-crown text-xl"></i>
                    <span class="text-base font-medium">Nâng cấp</span>
                  </a>
                </li>
              </ul>

              <a
                href="/login"
                class="js-login-modal flex items-center justify-center gap-4 p-3 mt-3 bg-white/10 rounded-2xl hover:bg-white/20"
              >
                <span class="text-base font-medium">Đăng nhập</span>
              </a>
              <p class="js-desc mt-2 text-[#909090] text-xs leading-loose">
                Đăng nhập để tạo và chia sẻ danh sách phát, nhận nội dung đề
                xuất dành riêng cho bạn.
              </p>
            </nav>
          </div>
        </div>
      </aside>
  `;
};
