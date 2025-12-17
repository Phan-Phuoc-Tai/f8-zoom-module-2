import section from "./section";
import templateContent from "./templateContent";

export default function cardList(title, items) {
  const html = items
    .map((item) => {
      const link = `${item.type}s/details/${item.slug}`;
      return `
  <li>
              <a href=${link} class="flex flex-col gap-4 px-3 py-2 rounded-md">
                <div
                  class="relative flex items-center justify-center w-55 h-55"
                >
                  <img
                    src=${item.thumbnails}

                    class="block w-full h-full object-cover rounded-md"
                  />
                  <i
                    class="absolute fa-solid fa-play text-3xl text-white invisible"
                  ></i>
                </div>
                <div>
                  <h3 class="text-white font-semibold">
                    ${item.title}
                  </h3>
                  <p class="text-[14px] text-white/60">${item.artists}</p>
                </div>
              </a>
            </li>
  `;
    })
    .join("");
  const content = templateContent(html);
  return section(title, content);
}
