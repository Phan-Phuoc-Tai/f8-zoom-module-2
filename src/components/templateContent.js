export default function templateContent(html) {
  return `
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
                ${html}
              </ul>
            </div>`;
}
