import config from "../config.json";
import section from "./section";

export default function propose() {
  let html = getTagName();
  let content = `
            <div class="relative">
              <nav>
                <ul class="flex-col md:flex-row flex items-center gap-4 pb-4 md:pb-14 justify-between">
                ${html}
                </ul>
              </nav>
            </div>
  `;
  return section("", content);
}

function proposeDetail(tagName, address) {
  return `
    <li class="w-full md:w-[calc(100%/3)]">
       <a
         href=${address}  data-navigo
         class="flex items-center gap-3 py-4 md:py-2 xl:py-4 px-6 md:px-2 xl:px-6 w-full bg-white/10 rounded-lg text-lg xl:text-xl text-center text-white font-bold hover:bg-white/20 cursor-pointer"
       >
         <i class="fa-solid fa-compact-disc"></i>
         <span>${tagName}</span>
       </a>
     </li>
  `;
}

function getTagName() {
  const tagNames = config.proposeTagName;
  let html = tagNames
    .map((element) => {
      return proposeDetail(element.name, element.address);
    })
    .join("");
  return html;
}
