import section from "../../components/section";
import templateContent from "../../components/templateContent";
import getList from "../../tools/getList";
import cardList from "../../components/cardList";

async function getItemTodaysHits() {
  const items = await getList("/home/todays-hits");
  const result = [];
  items.map((item) => {
    let link = `/playlists/details/${item.slug}`;
    let html = cardList(link, item.thumbnails, item.title, item.artists);
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
