import httpRequest from "../tools/httpRequest";
import section from "../components/section";
import templateContent from "../components/templateContent";

async function getItemTodaysHits() {
  const response = await httpRequest.get("/home/todays-hits");
  const items = await response.data;
  const result = [];

  items.map((item) => {
    const html = `
    <li>
              <a href="#!" class="flex flex-col gap-4 px-3 py-2 rounded-md">
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
            </li>`;
    result.push(html);
  });
  return result.join("");
}
const html = await getItemTodaysHits();

function renderTodaysHits() {
  const hits = templateContent(html);
  return section("Today's Hits", hits);
}

export default renderTodaysHits;
