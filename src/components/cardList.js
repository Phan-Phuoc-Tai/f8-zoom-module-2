import section from "./section";
import templateContent from "./templateContent";

export default function cardList(title, items) {
  const html = items
    .map((item) => {
      const link = `${item.type ?? "album"}s/details/${item.slug}`;
      return `
  <li>
              <a href=${link} data-navigo class="flex flex-col gap-4 lg:px-3 py-1 lg:py-2 rounded-md  w-40 lg:w-55 ">
                <div
                  class="relative flex items-center justify-center h-40 lg:h-55"
                >
                  <img
                    src=${item.thumbnails ?? item.thumb}
                    class="block w-full h-full object-cover rounded-md"
                  />
                  <i
                    class="absolute fa-solid fa-play text-3xl text-white invisible"
                  ></i>
                </div>
                <div>
                  <h3 class="text-white font-semibold truncate">
                    ${item.title ?? item.name}
                  </h3>
                  <p class="text-[14px] text-white/60">
                  ${item.artists ?? item.albumType ?? ""}</p>
                </div>
              </a>
            </li>
  `;
    })
    .join("");
  const content = templateContent(html);
  return section(title, content);
}
