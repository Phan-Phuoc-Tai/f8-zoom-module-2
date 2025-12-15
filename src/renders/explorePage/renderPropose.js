import config from "../../config.json";
import section from "../../components/section";
import propose from "../../components/propose";
function renderPropose() {
  let items = getTagName();
  let content = `
            <div class="relative">
              <nav>
                <ul class="flex items-center gap-4 pb-14 justify-between">
                ${items}
                </ul>
              </nav>
            </div>
  `;
  return section("", content);
}

function getTagName() {
  const tagNames = config.proposeTagName;
  let result = [];
  tagNames.map((element) => {
    result.push(propose(element.name, element.link));
  });
  return result.join("");
}

export default renderPropose;
