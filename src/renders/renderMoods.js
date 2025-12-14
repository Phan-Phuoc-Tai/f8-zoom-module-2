import httpRequest from "../tools/httpRequest";
import section from "../components/section";
import templateContent from "../components/templateContent";

async function getItemMoods() {
  const response = await httpRequest.get("/moods");
  const items = await response.data.items;
  const result = [];
  items.map((item) => {
    const html = `
    <li>
      <a
      href="/moods/${item.slug}"
      class="block py-2 px-3 bg-white/10 rounded-lg text-[14px] text-center text-white hover:bg-white/20 cursor-pointer"
      >${item.name}</a>
    </li>`;
    result.push(html);
  });
  return result.join("");
}
const html = await getItemMoods();

function renderMoods() {
  const moods = templateContent(html);
  return section("", moods);
}

export default renderMoods;
