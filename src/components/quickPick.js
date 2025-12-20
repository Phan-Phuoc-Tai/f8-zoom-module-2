import { format } from "../tools/format";
import section from "./section";
import templateContent from "./templateContent";

export default function quickPick(
  title,
  items,
  isPersonalized = false,
  isResult = false
) {
  const html = items
    .map((item) => {
      const link = isPersonalized
        ? `/${item.type}s/details/${item.id}`
        : `/${item.type}s/details/${item.slug}`;
      return `<li>
      <a 
        href= ${link} data-navigo
        class="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-white/20"
      >
        <div class="relative flex items-center justify-center">
          <img
            src=${item.thumbnails}
            class="block w-12 h-12 object-cover rounded-md"
          />
          <i class="absolute fa-solid fa-play text-white invisible"></i>
        </div>
        <div> 
          <h3 class="text-white font-semibold">${item.title}</h3>

          <div class="flex items-center gap-2 text-[14px]">
            ${
              !isResult
                ? item.artists
                  ? `<span class="text-white/60">${item.artists}</span>`
                  : `<span class="text-white/60">0 lượt xem</span>`
                : `<span class="text-white/60">${item.subtitle}</span>`
            }

            ${
              !isResult
                ? `<span class="text-white/60">•</span>
            <span class="text-white/60">${format.views(
              item.popularity
            )} lượt nghe</span>`
                : ""
            }
          </div>
        </div>
      </a>
    </li>
    `;
    })
    .join("");

  if (!isResult) {
    const content = templateContent(html, true);
    return section(title, content);
  }
  return html;
}
