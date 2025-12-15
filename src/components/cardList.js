function cardList(link, thumbnails, title, subTitle) {
  return `
  <li>
              <a href=${link} class="flex flex-col gap-4 px-3 py-2 rounded-md">
                <div
                  class="relative flex items-center justify-center w-55 h-55"
                >
                  <img
                    src=${thumbnails}

                    class="block w-full h-full object-cover rounded-md"
                  />
                  <i
                    class="absolute fa-solid fa-play text-3xl text-white invisible"
                  ></i>
                </div>
                <div>
                  <h3 class="text-white font-semibold">
                    ${title}
                  </h3>
                  <p class="text-[14px] text-white/60">${subTitle}</p>
                </div>
              </a>
            </li>
  `;
}
export default cardList;
