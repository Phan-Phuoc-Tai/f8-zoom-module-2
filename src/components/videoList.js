import { format } from "../tools/format";
import section from "./section";
import templateContent from "./templateContent";

function videoList(title, items) {
  const html = items
    .map((item) => {
      const link = `${
        item.type
          ? `${item.type}s/details/${item.slug}`
          : `videos/details/${item.id}`
      }`;

      return `<li>
    <a href=${link} data-navigo class="flex flex-col gap-4 py-2 rounded-md">
      <div
        class="relative flex items-center justify-center w-60 md:w-80 lg:w-85 xl:w-100 "
      >
        <img
          src=${item.thumbnails ?? item.thumb}
          class="w-full h-45 lg:h-50 xl:h-60 object-cover rounded-md"
        />
        <i
          class="absolute fa-solid fa-play text-3xl text-white invisible"
        ></i>
      </div>
      <div>
        <h3 class="text-white font-semibold">
          ${item.name ?? item.title}
        </h3>
        <p class="text-[14px] text-white/60">${
          item.views
            ? `${format.views(item.views)}`
            : `${format.views(item.popularity)}`
        } lượt xem</p>
      </div>
    </a>
  </li>
  `;
    })
    .join("");
  const content = templateContent(html);
  return section(title, content);
}
export default videoList;
