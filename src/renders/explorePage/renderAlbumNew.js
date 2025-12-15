import section from "../../components/section";
import templateContent from "../../components/templateContent";
import getList from "../../tools/getList";
import cardList from "../../components/cardList";

async function getItemAlbums() {
  const data = await getList("/explore/albums");
  const items = data.items;
  const result = [];
  items.map((item) => {
    let link = `/albums/details/${item.slug}`;
    let html = cardList(link, item.thumb, item.name, item.albumType);
    result.push(html);
  });
  return result.join("");
}
const html = await getItemAlbums();

function renderAlbumNews() {
  const albums = templateContent(html);
  return section("Khám phá Albums mới", albums);
}

export default renderAlbumNews;
