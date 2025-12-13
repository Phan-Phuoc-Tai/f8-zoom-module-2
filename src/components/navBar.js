export const NavBar = () => {
  return `
  <aside class="sideBar">
        <nav
          class="px-2 text-white"
        >
          <ul class="pt-4 pb-3 border-b border-white/70">
            <li>
              <a
                href="#!"
                class="flex flex-col items-center gap-1 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl active"
              >
                <i class="fa-regular fa-house text-2xl"></i>
                <span class="text-[11px] font-normal">Trang chủ</span>
              </a>
            </li>
            <li>
              <a
                href="#!"
                class="flex flex-col items-center gap-1 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
              >
                <i class="fa-regular fa-compass text-2xl"></i>
                <span class="text-[11px] font-normal">Khám phá</span>
              </a>
            </li>
            <li>
              <a
                href="#!"
                class="flex flex-col items-center gap-1 p-3 mb-1 hover:bg-white/10 hover:rounded-2xl"
              >
                <i class="fa-regular fa-bookmark text-2xl"></i>
                <span class="text-[11px] font-normal">Thư viện</span>
              </a>
            </li>
          </ul>

          <a
            href="#!"
            class="flex flex-col items-center gap-1 p-3 mt-3 hover:bg-white/10 hover:rounded-2xl"
          >
            <i class="fa-regular fa-user text-2xl"></i>
            <span class="text-[11px] font-normal">Đăng nhập</span>
          </a>
        </nav>
      </aside>
  `;
};
