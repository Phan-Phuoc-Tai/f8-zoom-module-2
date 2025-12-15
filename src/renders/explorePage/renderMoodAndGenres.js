import section from "../../components/section";
import templateContent from "../../components/templateContent";
import getList from "../../tools/getList";
import categories from "../../components/categories";

//chia items thành 6 khối
async function getCategories(url) {
  const data = await getList(url);
  const items = data.items;
  const maxLength = 4;
  const result = [];
  items.reduce((arr, item) => {
    if (arr.length < maxLength) {
      arr.push(item);
    } else {
      arr = [item];
    }
    if (arr.length === maxLength) {
      result.push(arr);
    }
    return arr;
  }, []);
  return result;
}

let lineList = await getCategories("/lines");
let categoriesList = await getCategories("/categories");
let newCategoriesList = [...lineList, ...categoriesList].reverse();
//tạo html của thẻ li
function getItem(arr) {
  const result = [];
  arr.map((element) => {
    let link = `/categories/${element.slug}`;
    result.push(categories(link, element.color, element.name));
  });

  console.log(result);

  return result.join("");
}

function renderMoodAndGenres() {
  let html = newCategoriesList
    .map((categories) => {
      let content = `<li class="flex flex-col gap-5 w-52 shrink-0 mr-2">${getItem(
        categories
      )}</li>`;
      return content;
    })
    .join("");
  return section("Tâm trạng và thể loại", templateContent(html));
}

export default renderMoodAndGenres;
