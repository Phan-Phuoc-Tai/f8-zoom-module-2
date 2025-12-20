export default function templateContent(html, isQuickPicks = false) {
  const className =
    isQuickPicks === false
      ? `js-xScroll xScroll flex gap-3 pb-14 overflow-x-auto scroll-smooth`
      : `js-xScroll xScroll grid grid-rows-4 grid-flow-col overflow-x-auto auto-cols-[33.33%] gap-3 pb-14`;
  return `
  <div class="relative">
              <div class="absolute right-0 -top-15 flex items-center gap-4">
                <button
                  class="js-previous-btn flex items-center justify-center bg-white/5 w-10 h-10 rounded-full text-white/30 pointer-events-none"
                >
                  <i class="fa-solid fa-angle-left"></i>
                </button>
                <button
                  class="js-next-btn flex items-center justify-center bg-white/5 w-10 h-10 rounded-full text-white/30 pointer-events-none"
                >
                  <i class="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <ul class="${className}">
                ${html}
              </ul>
            </div>`;
}
