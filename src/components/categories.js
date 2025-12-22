import section from "./section";
import templateContent from "./templateContent";

function categories(link, color, name) {
  return `
  <a
        href=${link} data-navigo
        class="flex items-center bg-[#292929] h-12 rounded-lg overflow-hidden"
      >
        <span style="background-color:${color}" class="block h-full w-2"></span>
        <span
          class="block w-full px-2 text-[14px] font-semibold text-white text-center"
        >${name}</span
        >
      </a>    
  
  `;
}

//tạo innerHtml của thẻ li
function getItem(arr) {
  const result = [];
  arr.map((element) => {
    let link = `/categories/${element.slug}`;
    result.push(categories(link, element.color, element.name));
  });
  return result.join("");
}

function listCategories(title, categoriesList) {
  let html = categoriesList
    .map((categories) => {
      let content = `<li class="flex flex-col gap-5 w-42 md:w-48 lg:w-52 xl:w-59 shrink-0 mr-2">${getItem(
        categories
      )}</li>`;
      return content;
    })
    .join("");
  return section(title, templateContent(html));
}

export default listCategories;
