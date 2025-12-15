import section from "../../components/section";
import templateContent from "../../components/templateContent";
import getList from "../../tools/getList";
import cardList from "../../components/cardList";

async function getItemVNMusics() {
  const items = await getList("/playlists/by-country?country=VN");
  const result = [];
  items.map((item) => {
    let link = `/playlists/details/${item.slug}`;
    let html = cardList(link, item.thumbnails, item.title, item.artists);
    result.push(html);
  });
  return result.join("");
}
const html = await getItemVNMusics();

function renderVNMusics() {
  const VNMusics = templateContent(html);
  return section("Nhạc Việt", VNMusics);
}

export default renderVNMusics;
