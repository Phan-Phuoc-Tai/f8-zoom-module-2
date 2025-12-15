import section from "../../components/section";
import templateContent from "../../components/templateContent";
import getList from "../../tools/getList";
import cardList from "../../components/cardList";

async function getItemAlbums() {
  const items = await getList("/home/albums-for-you");
  const result = [];
  items.map((item) => {
    let link = `/albums/details/${item.slug}`;
    let html = cardList(link, item.thumbnails, item.title, item.artists);
    result.push(html);
  });
  return result.join("");
}
const html = await getItemAlbums();

function renderAlbums() {
  const albums = templateContent(html);
  return section("Album gợi ý cho bạn", albums);
}

export default renderAlbums;
