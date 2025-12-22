import section from "./section";
import templateContent from "./templateContent";

export default function tagList(title, items) {
  const html = items
    .map((item) => {
      return `
    <li>
      <a
      href="/moods/${item.slug}" data-navigo
      class="block w-max py-2 px-3 bg-white/10 rounded-lg text-[14px] text-center text-white hover:bg-white/20 cursor-pointer"
      >${item.name}</a>
    </li>`;
    })
    .join("");
  const content = templateContent(html);
  return section(title, content);
}
