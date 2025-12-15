import section from "../../components/section";
import templateContent from "../../components/templateContent";
import getList from "../../tools/getList";
import videos from "../../components/videos";

async function getItemVideos() {
  const data = await getList("/explore/videos");
  const items = data.items;
  const result = [];
  items.map((item) => {
    let link = `/videos/details/${item.id}`;
    let views = Math.floor(item.views / 1000);
    let html = videos(link, item.thumb, item.name, views);
    result.push(html);
  });
  return result.join("");
}
const html = await getItemVideos();

function renderVideoNews() {
  const videos = templateContent(html);
  return section("Video nhạc mới", videos);
}

export default renderVideoNews;
