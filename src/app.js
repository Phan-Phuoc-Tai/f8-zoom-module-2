import { header } from "./components/header";
import { footer } from "./components/footer";
import { sideBar } from "./components/sideBar";

export default async function app() {
  return `
    ${header()}
    ${sideBar()}
    <main class='js-body'>
    </main>
    ${footer()}
  `;
}
